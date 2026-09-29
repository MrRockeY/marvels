"use client";

import { useState } from "react";
import { useWorksheetStore } from "@/store/worksheetStore";
import { ALL_NUMBERS, NUMBER_RANGES } from "@/lib/data/numbers";
import { CopiesStepper } from "@/components/editor/CopiesStepper";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function NumberPicker() {
  const addItems = useWorksheetStore((s) => s.addItems);
  const removeCategory = useWorksheetStore((s) => s.removeCategory);
  const [copies, setCopies] = useState(1);

  const addValues = (values: string[]) => {
    const toAdd = values.flatMap((value) =>
      Array.from({ length: copies }, () => ({ category: "number" as const, value })),
    );
    addItems(toAdd);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {NUMBER_RANGES.map((range) => (
          <Button key={range.key} variant="secondary" size="sm" onClick={() => addValues([...range.values])}>
            {range.label}
          </Button>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <CopiesStepper value={copies} onChange={setCopies} />
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => addValues(ALL_NUMBERS)}>
            Select all
          </Button>
          <Button variant="ghost" size="sm" onClick={() => removeCategory("number")}>
            Clear
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-1.5 sm:grid-cols-8">
        {ALL_NUMBERS.map((n) => (
          <button
            key={n}
            onClick={() => addValues([n])}
            className={cn(
              "flex h-9 items-center justify-center rounded-lg border border-[#e4d6c3] bg-white text-sm font-medium text-[#3d3226] transition-colors",
              "hover:border-[#c98a4f] hover:bg-[#fbf3e8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b5652f]",
            )}
            aria-label={`Add number ${n}`}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}
