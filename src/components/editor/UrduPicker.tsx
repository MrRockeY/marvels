"use client";

import { useState } from "react";
import { useWorksheetStore } from "@/store/worksheetStore";
import { URDU_LETTERS } from "@/lib/data/urdu";
import { CopiesStepper } from "@/components/editor/CopiesStepper";
import { Button } from "@/components/ui/button";
import { UrduKeyboard } from "@/components/editor/UrduKeyboard";

export function UrduPicker() {
  const addItems = useWorksheetStore((s) => s.addItems);
  const removeCategory = useWorksheetStore((s) => s.removeCategory);
  const [copies, setCopies] = useState(1);

  const addValues = (values: string[]) => {
    const toAdd = values.flatMap((value) =>
      Array.from({ length: copies }, () => ({ category: "urdu" as const, value })),
    );
    addItems(toAdd);
  };

  return (
    <div className="space-y-4">
      <UrduKeyboard />

      <div className="flex items-center justify-between">
        <CopiesStepper value={copies} onChange={setCopies} />
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => addValues(URDU_LETTERS)}>
            Select all
          </Button>
          <Button variant="ghost" size="sm" onClick={() => removeCategory("urdu")}>
            Clear
          </Button>
        </div>
      </div>

      <div dir="rtl" className="grid grid-cols-6 gap-1.5 sm:grid-cols-7" lang="ur">
        {URDU_LETTERS.map((letter) => (
          <button
            key={letter}
            onClick={() => addValues([letter])}
            className="flex h-10 items-center justify-center rounded-lg border border-[#e4d6c3] bg-white text-lg text-[#3d3226] transition-colors hover:border-[#c98a4f] hover:bg-[#fbf3e8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b5652f]"
            style={{ fontFamily: "'Noto Nastaliq Urdu', serif" }}
            aria-label={`Add letter ${letter}`}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
}
