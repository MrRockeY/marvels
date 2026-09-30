"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const URDU_KEYBOARD_LAYOUT = [
  [
    { char: "ء", value: "ء" },
    { char: "ض", value: "ض" },
    { char: "ص", value: "ص" },
    { char: "ث", value: "ث" },
    { char: "ق", value: "ق" },
    { char: "ف", value: "ف" },
    { char: "غ", value: "غ" },
    { char: "ع", value: "ع" },
    { char: "ھ", value: "ھ" },
    { char: "خ", value: "خ" },
    { char: "ح", value: "ح" },
    { char: "ج", value: "ج" },
    { char: "چ", value: "چ" },
  ],
  [
    { char: "ش", value: "ش" },
    { char: "س", value: "س" },
    { char: "ی", value: "ی" },
    { char: "ے", value: "ے" },
    { char: "ب", value: "ب" },
    { char: "ل", value: "ل" },
    { char: "ا", value: "ا" },
    { char: "آ", value: "آ" },
    { char: "ت", value: "ت" },
    { char: "ن", value: "ن" },
    { char: "م", value: "م" },
    { char: "ک", value: "ک" },
    { char: "گ", value: "گ" },
  ],
  [
    { char: "ظ", value: "ظ" },
    { char: "ط", value: "ط" },
    { char: "ذ", value: "ذ" },
    { char: "ر", value: "ر" },
    { char: "ڑ", value: "ڑ" },
    { char: "و", value: "و" },
    { char: "ڈ", value: "ڈ" },
    { char: "د", value: "د" },
    { char: "پ", value: "پ" },
    { char: "ز", value: "ز" },
    { char: "ژ", value: "ژ" },
  ],
  [
    { char: "۔", value: "۔" },
    { char: "،", value: "،" },
    { char: "؟", value: "؟" },
    { char: "!", value: "!" },
    { char: "Space", value: " " },
    { char: "Enter", value: "\n" },
    { char: "⌫", value: "_delete_" },
  ],
];

interface DocumentUrduKeyboardProps {
  onInsert: (value: string) => void;
  onDelete: () => void;
}

export function DocumentUrduKeyboard({ onInsert, onDelete }: DocumentUrduKeyboardProps) {
  return (
    <div className="no-print rounded-xl border border-slate-200 bg-white/90 p-3 shadow-sm">
      <p className="mb-2 text-center text-xs font-medium text-slate-500" lang="ur" dir="rtl">
        اردو کی بورڈ
      </p>
      <div className="flex flex-col gap-1.5">
        {URDU_KEYBOARD_LAYOUT.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-1.5">
            {row.map((key) => (
              <Button
                key={`${rowIndex}-${key.char}-${key.value}`}
                type="button"
                variant="secondary"
                size="sm"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  if (key.value === "_delete_") onDelete();
                  else onInsert(key.value);
                }}
                className={cn(
                  "min-w-[36px]",
                  key.value === " " && "min-w-[120px] flex-grow",
                  key.value === "\n" && "min-w-[64px]",
                  key.value === "_delete_" && "min-w-[56px] text-red-600",
                )}
                style={{ fontFamily: "'Noto Nastaliq Urdu', serif" }}
              >
                {key.char}
              </Button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
