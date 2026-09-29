import type {
  HeaderSettings,
  LayoutBox,
  LayoutMode,
  LayoutResult,
  Orientation,
  TitleAlign,
  WorksheetItem,
} from "@/types/worksheet";
import { MARGIN_MM, getPageSizeMm } from "@/lib/pageMetrics";
import type { MarginSize } from "@/types/worksheet";

export interface LayoutEngineInput {
  items: WorksheetItem[];
  orientation: Orientation;
  margins: MarginSize;
  layoutMode: LayoutMode;
  itemSize: number; // 0-100
  spacing: number; // 0-100 (reserved for internal cell padding, kept for API completeness)
  rowGap: number; // 0-100
  colGap: number; // 0-100
  hasHeader: boolean;
  headerFields: HeaderSettings;
  hasTitle: boolean;
  titleAlign?: TitleAlign;
}

const MIN_CELL_MM = 10;
const MAX_CELL_MM = 62;

function sliderToMm(value: number, min: number, max: number) {
  const clamped = Math.max(0, Math.min(100, value));
  return min + (clamped / 100) * (max - min);
}

/** Computes the vertical space (mm) consumed by the optional worksheet header block. */
export function calculateHeaderHeight(
  hasHeader: boolean,
  fields: HeaderSettings,
  hasTitle: boolean,
): number {
  if (!hasHeader) return 0;
  let height = 4; // top breathing room
  if (fields.showSchoolName) height += 11;
  if (hasTitle) height += 9;
  if (fields.showName || fields.showDate) height += 12;
  height += 5; // divider + bottom margin before content
  return height;
}

/**
 * Deterministically arranges worksheet items on an A4 page.
 * Never lets content overflow the printable area: the cell size is
 * reduced automatically when the requested grid would not fit.
 */
export function calculateWorksheetLayout(input: LayoutEngineInput): LayoutResult {
  const page = getPageSizeMm(input.orientation);
  const margin = MARGIN_MM[input.margins];
  const headerHeight = calculateHeaderHeight(input.hasHeader, input.headerFields, input.hasTitle);

  const printableWidth = page.width - margin * 2;
  const printableHeight = page.height - margin * 2 - headerHeight;

  const items = input.items;
  const count = items.length;

  const requestedCell = sliderToMm(input.itemSize, MIN_CELL_MM, MAX_CELL_MM);
  const colGapMm = sliderToMm(input.colGap, 3, 20);
  const rowGapMm = sliderToMm(input.rowGap, 3, 20);

  if (count === 0) {
    return {
      boxes: [],
      columns: 0,
      rows: 0,
      cellSize: requestedCell,
      printableWidth,
      printableHeight,
      headerHeight,
    };
  }

  const maxColsThatFit = Math.max(
    1,
    Math.floor((printableWidth + colGapMm) / (requestedCell + colGapMm)),
  );

  let columns: number;
  if (input.layoutMode === "1") columns = 1;
  else if (input.layoutMode === "2") columns = Math.min(2, maxColsThatFit);
  else if (input.layoutMode === "3") columns = Math.min(3, maxColsThatFit);
  else if (input.layoutMode === "4") columns = Math.min(4, maxColsThatFit);
  else if (input.layoutMode === "fill") columns = maxColsThatFit;
  else columns = Math.min(count, maxColsThatFit); // auto

  columns = Math.max(1, columns);

  let rows: number;
  if (input.layoutMode === "fill") {
    const maxRowsThatFit = Math.max(
      1,
      Math.floor((printableHeight + rowGapMm) / (requestedCell + rowGapMm)),
    );
    rows = maxRowsThatFit;
  } else {
    rows = Math.ceil(count / columns);
  }

  // Shrink the cell size (never grow) until the grid fits the printable area.
  let cell = requestedCell;
  const fits = (c: number) => {
    const w = columns * c + (columns - 1) * colGapMm;
    const h = rows * c + (rows - 1) * rowGapMm;
    return { w, h, ok: w <= printableWidth + 0.01 && h <= printableHeight + 0.01 };
  };
  let probe = fits(cell);
  while (!probe.ok && cell > MIN_CELL_MM) {
    cell -= 0.5;
    probe = fits(cell);
  }

  let renderItems = items;
  if (input.layoutMode === "fill") {
    const totalCells = columns * rows;
    renderItems = Array.from({ length: totalCells }, (_, i) => items[i % items.length]);
  }

  const totalW = columns * cell + (columns - 1) * colGapMm;
  const totalH = rows * cell + (rows - 1) * rowGapMm;
  const offsetX = margin + (printableWidth - totalW) / 2;
  const offsetY = margin + headerHeight + (printableHeight - totalH) / 2;

  const boxes: LayoutBox[] = renderItems.map((item, i) => {
    const r = Math.floor(i / columns);
    const c = i % columns;
    const itemsInRow = Math.min(columns, renderItems.length - r * columns);
    const rowW = itemsInRow * cell + (itemsInRow - 1) * colGapMm;
    const rowOffsetX = offsetX + (totalW - rowW) / 2;
    const x = rowOffsetX + c * (cell + colGapMm);
    const y = offsetY + r * (cell + rowGapMm);
    return {
      id: `${item.id}-${i}`,
      item,
      x,
      y,
      size: cell,
    };
  });

  return {
    boxes,
    columns,
    rows,
    cellSize: cell,
    printableWidth,
    printableHeight,
    headerHeight,
  };
}
