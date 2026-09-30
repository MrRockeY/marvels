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
const TEXT_FONT_MM = 4.2;
const TEXT_LINE_HEIGHT = 1.85;

function sliderToMm(value: number, min: number, max: number) {
  const clamped = Math.max(0, Math.min(100, value));
  return min + (clamped / 100) * (max - min);
}

/** True for multi-character Arabic/Urdu passages that must wrap. */
export function isWrappingTextItem(item: WorksheetItem): boolean {
  if (item.category === "islamic-text") return true;
  if (item.category === "urdu" && Array.from(item.value).length > 2) return true;
  return false;
}

function estimateWrappedHeightMm(text: string, widthMm: number): number {
  const chars = Array.from(text.trim());
  // Nastaliq is wide; account for spaces as soft wrap points.
  const avgCharMm = TEXT_FONT_MM * 0.62;
  const charsPerLine = Math.max(8, Math.floor(widthMm / avgCharMm));
  const lines = Math.max(1, Math.ceil(chars.length / charsPerLine));
  // Extra room for Nastaliq descenders / diacritics.
  return Math.min(240, lines * TEXT_FONT_MM * TEXT_LINE_HEIGHT + 10);
}

/** Computes the vertical space (mm) consumed by the optional worksheet header block. */
export function calculateHeaderHeight(
  hasHeader: boolean,
  fields: HeaderSettings,
  hasTitle: boolean,
): number {
  if (!hasHeader) return 0;
  let height = 4; // top breathing room
  if (fields.showSchoolName) height += 14; // logo block
  if (hasTitle) height += 9;
  if (fields.showName || fields.showDate) height += 12;
  height += 5; // divider + bottom margin before content
  return height;
}

/**
 * Deterministically arranges worksheet items on an A4 page.
 * Long Arabic/Urdu passages get full-width wrapping blocks; other items use a square grid.
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

  const blockItems = items.filter(isWrappingTextItem);
  const cellItems = items.filter((it) => !isWrappingTextItem(it));

  const boxes: LayoutBox[] = [];
  let cursorY = margin + headerHeight;
  const contentBottom = margin + headerHeight + printableHeight;

  // 1) Full-width wrapping text blocks (Ayat-ul-Kursi, Kalmas, etc.)
  for (const item of blockItems) {
    const height = estimateWrappedHeightMm(item.value, printableWidth);
    const y = cursorY;
    if (y + height > contentBottom + 0.5) {
      // Still place it — print may clip; prefer visible over dropping.
    }
    boxes.push({
      id: `${item.id}-block`,
      item,
      x: margin,
      y,
      size: Math.min(printableWidth, height),
      width: printableWidth,
      height,
    });
    cursorY += height + rowGapMm;
  }

  // 2) Square grid for letters / shapes / images below the text blocks
  if (cellItems.length === 0) {
    return {
      boxes,
      columns: 1,
      rows: blockItems.length,
      cellSize: requestedCell,
      printableWidth,
      printableHeight,
      headerHeight,
    };
  }

  const remainingHeight = Math.max(MIN_CELL_MM, contentBottom - cursorY);
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
  else columns = Math.min(cellItems.length, maxColsThatFit);

  columns = Math.max(1, columns);

  let rows: number;
  if (input.layoutMode === "fill") {
    const maxRowsThatFit = Math.max(
      1,
      Math.floor((remainingHeight + rowGapMm) / (requestedCell + rowGapMm)),
    );
    rows = maxRowsThatFit;
  } else {
    rows = Math.ceil(cellItems.length / columns);
  }

  let cell = requestedCell;
  const fits = (c: number) => {
    const w = columns * c + (columns - 1) * colGapMm;
    const h = rows * c + (rows - 1) * rowGapMm;
    return { w, h, ok: w <= printableWidth + 0.01 && h <= remainingHeight + 0.01 };
  };
  let probe = fits(cell);
  while (!probe.ok && cell > MIN_CELL_MM) {
    cell -= 0.5;
    probe = fits(cell);
  }

  let renderItems = cellItems;
  if (input.layoutMode === "fill") {
    const totalCells = columns * rows;
    renderItems = Array.from({ length: totalCells }, (_, i) => cellItems[i % cellItems.length]);
  }

  const rtlGrid = renderItems.every(
    (it) => it.category === "urdu" || it.category === "islamic-text",
  );

  const totalW = columns * cell + (columns - 1) * colGapMm;
  const totalH = rows * cell + (rows - 1) * rowGapMm;
  const offsetX = margin + (printableWidth - totalW) / 2;
  const offsetY = cursorY + Math.max(0, (remainingHeight - totalH) / 2);

  renderItems.forEach((item, i) => {
    const r = Math.floor(i / columns);
    const c = i % columns;
    const itemsInRow = Math.min(columns, renderItems.length - r * columns);
    const rowW = itemsInRow * cell + (itemsInRow - 1) * colGapMm;
    const rowOffsetX = offsetX + (totalW - rowW) / 2;
    const visualCol = rtlGrid ? itemsInRow - 1 - c : c;
    const x = rowOffsetX + visualCol * (cell + colGapMm);
    const y = offsetY + r * (cell + rowGapMm);
    boxes.push({
      id: `${item.id}-${i}`,
      item,
      x,
      y,
      size: cell,
      width: cell,
      height: cell,
    });
  });

  return {
    boxes,
    columns,
    rows: rows + blockItems.length,
    cellSize: cell,
    printableWidth,
    printableHeight,
    headerHeight,
  };
}
