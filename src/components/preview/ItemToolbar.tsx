"use client";

import { Copy, Trash2, ZoomIn, ZoomOut } from "lucide-react";
import { useWorksheetStore } from "@/store/worksheetStore";

export function ItemToolbar() {
  const duplicateSelected = useWorksheetStore((s) => s.duplicateSelected);
  const deleteSelected = useWorksheetStore((s) => s.deleteSelected);
  const resizeSelected = useWorksheetStore((s) => s.resizeSelected);

  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div
      onClick={stop}
      className="no-print absolute left-1/2 top-0 z-20 flex -translate-x-1/2 -translate-y-[calc(100%+4px)] items-center gap-0.5 rounded-lg border border-[#e4d6c3] bg-white px-1 py-1 shadow-md"
    >
      <button
        onClick={() => resizeSelected(-0.1)}
        className="flex h-6 w-6 items-center justify-center rounded-md text-[#5c4d3c] hover:bg-[#f4ede4]"
        aria-label="Decrease size"
      >
        <ZoomOut className="h-3.5 w-3.5" />
      </button>
      <button
        onClick={() => resizeSelected(0.1)}
        className="flex h-6 w-6 items-center justify-center rounded-md text-[#5c4d3c] hover:bg-[#f4ede4]"
        aria-label="Increase size"
      >
        <ZoomIn className="h-3.5 w-3.5" />
      </button>
      <span className="mx-0.5 h-4 w-px bg-[#e4d6c3]" />
      <button
        onClick={() => duplicateSelected()}
        className="flex h-6 w-6 items-center justify-center rounded-md text-[#5c4d3c] hover:bg-[#f4ede4]"
        aria-label="Duplicate"
      >
        <Copy className="h-3.5 w-3.5" />
      </button>
      <button
        onClick={() => deleteSelected()}
        className="flex h-6 w-6 items-center justify-center rounded-md text-[#b03a2e] hover:bg-[#fbeceb]"
        aria-label="Delete"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
