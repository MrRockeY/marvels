"use client";

import { useState } from "react";
import { useWorksheetStore } from "@/store/worksheetStore";
import { SHAPES } from "@/lib/data/shapes";
import { ShapeIcon } from "@/components/icons/ShapeIcon";
import { getIconPaint } from "@/components/icons/paint";
import { CopiesStepper } from "@/components/editor/CopiesStepper";
import { Button } from "@/components/ui/button";

export function ShapePicker() {
  const addItems = useWorksheetStore((s) => s.addItems);
  const removeCategory = useWorksheetStore((s) => s.removeCategory);
  const [copies, setCopies] = useState(1);
  const paint = getIconPaint("outline");

  const addValues = (values: string[]) => {
    const toAdd = values.flatMap((value) =>
      Array.from({ length: copies }, () => ({ category: "shape" as const, value })),
    );
    addItems(toAdd);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <CopiesStepper value={copies} onChange={setCopies} />
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => addValues(SHAPES.map((s) => s.key))}>
            Select all
          </Button>
          <Button variant="ghost" size="sm" onClick={() => removeCategory("shape")}>
            Clear
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {SHAPES.map((shape) => (
          <button
            key={shape.key}
            onClick={() => addValues([shape.key])}
            className="flex flex-col items-center gap-1.5 rounded-xl border border-[#e4d6c3] bg-white p-2.5 transition-colors hover:border-[#c98a4f] hover:bg-[#fbf3e8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b5652f]"
            aria-label={`Add ${shape.label}`}
          >
            <svg viewBox="0 0 100 100" className="h-9 w-9 text-[#3d3226]">
              <ShapeIcon shapeKey={shape.key} paint={paint} />
            </svg>
            <span className="text-[11px] font-medium text-[#5c4d3c]">{shape.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
