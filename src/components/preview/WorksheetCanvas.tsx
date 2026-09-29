"use client";

import { forwardRef, useMemo } from "react";
import type { Worksheet } from "@/types/worksheet";
import { calculateWorksheetLayout, calculateHeaderHeight } from "@/lib/layoutEngine";
import { getPageSizeMm, MARGIN_MM } from "@/lib/pageMetrics";
import { WorksheetHeader } from "@/components/preview/WorksheetHeader";
import { RenderedItem } from "@/components/preview/RenderedItem";
import { useWorksheetStore } from "@/store/worksheetStore";
import { cn } from "@/lib/utils";

interface WorksheetCanvasProps {
  worksheet: Worksheet;
}

export const WorksheetCanvas = forwardRef<HTMLDivElement, WorksheetCanvasProps>(
  function WorksheetCanvas({ worksheet }, ref) {
    const setSelected = useWorksheetStore((s) => s.setSelected);
    const eraserMode = useWorksheetStore((s) => s.eraserMode);
    const page = getPageSizeMm(worksheet.orientation);
    const margin = MARGIN_MM[worksheet.margins];
    const hasHeader = worksheet.header.showSchoolName || worksheet.header.showTitle || worksheet.header.showName || worksheet.header.showDate;
    const headerHeight = calculateHeaderHeight(hasHeader, worksheet.header, worksheet.header.showTitle && !!worksheet.title);

    const layout = useMemo(
      () =>
        calculateWorksheetLayout({
          items: worksheet.items,
          orientation: worksheet.orientation,
          margins: worksheet.margins,
          layoutMode: worksheet.layoutMode,
          itemSize: worksheet.itemSize,
          spacing: worksheet.spacing,
          rowGap: worksheet.rowGap,
          colGap: worksheet.colGap,
          hasHeader,
          headerFields: worksheet.header,
          hasTitle: worksheet.header.showTitle && !!worksheet.title,
        }),
      [
        worksheet.items,
        worksheet.orientation,
        worksheet.margins,
        worksheet.layoutMode,
        worksheet.itemSize,
        worksheet.spacing,
        worksheet.rowGap,
        worksheet.colGap,
        worksheet.header,
        worksheet.title,
        hasHeader,
      ],
    );

    return (
      <div
        ref={ref}
        id="print-area"
        onClick={() => {
          if (!eraserMode) {
            setSelected(null);
          }
        }}
        className={cn(
          "preview-paper relative bg-white text-[#1c1712]",
          eraserMode && "cursor-crosshair",
        )}
        style={{
          width: `${page.width}mm`,
          height: `${page.height}mm`,
        }}
      >
        {hasHeader && (
          <WorksheetHeader
            worksheet={worksheet}
            x={margin}
            y={margin}
            width={page.width - margin * 2}
            height={headerHeight}
          />
        )}
        {layout.boxes.map((box) => (
          <RenderedItem
            key={box.id}
            box={box}
            style={worksheet.style}
            inkSaver={worksheet.inkSaver}
            selected={worksheet.selectedItemId === box.item.id}
          />
        ))}
        {worksheet.items.length === 0 && (
          <p className="no-print absolute inset-0 flex items-center justify-center text-sm text-[#c9bda8]">
            Your worksheet content will appear here
          </p>
        )}
      </div>
    );
  },
);
