"use client";

import { useMemo, useState } from "react";
import { useWorksheetStore } from "@/store/worksheetStore";
import { LETTER_CASE_OPTIONS, LOWERCASE_LETTERS, UPPERCASE_LETTERS, type LetterCase } from "@/lib/data/alphabet";
import { CopiesStepper } from "@/components/editor/CopiesStepper";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AlphabetPicker() {
  const addItems = useWorksheetStore((s) => s.addItems);
  const removeCategory = useWorksheetStore((s) => s.removeCategory);
  const [letterCase, setLetterCase] = useState<LetterCase>("upper");
  const [copies, setCopies] = useState(1);

  const letters = useMemo(() => {
    if (letterCase === "upper") return UPPERCASE_LETTERS;
    if (letterCase === "lower") return LOWERCASE_LETTERS;
    return UPPERCASE_LETTERS.flatMap((u, i) => [u, LOWERCASE_LETTERS[i]]);
  }, [letterCase]);

  const addValues = (values: string[]) => {
    const toAdd = values.flatMap((value) =>
      Array.from({ length: copies }, () => ({ category: "letter" as const, value })),
    );
    addItems(toAdd);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-1.5">
        {LETTER_CASE_OPTIONS.map((opt) => (
          <button
            key={opt.key}
            onClick={() => setLetterCase(opt.key)}
            className={cn(
              "rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors border",
              letterCase === opt.key
                ? "border-[#b5652f] bg-[#f0e4d3] text-[#733d1d]"
                : "border-[#e4d6c3] bg-white text-[#5c4d3c] hover:bg-[#faf5ec]",
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <CopiesStepper value={copies} onChange={setCopies} />
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => addValues(letters)}>
            Select all
          </Button>
          <Button variant="ghost" size="sm" onClick={() => removeCategory("letter")}>
            Clear
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-1.5 sm:grid-cols-8">
        {letters.map((letter, i) => (
          <button
            key={`${letter}-${i}`}
            onClick={() => addValues([letter])}
            className="flex h-9 items-center justify-center rounded-lg border border-[#e4d6c3] bg-white text-sm font-medium text-[#3d3226] transition-colors hover:border-[#c98a4f] hover:bg-[#fbf3e8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b5652f]"
            aria-label={`Add letter ${letter}`}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
}
