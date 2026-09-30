"use client";

import { useState } from "react";
import { useWorksheetStore } from "@/store/worksheetStore";
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
    { char: "+", value: "+" },
    { char: "=", value: "=" },
    { char: "-", value: "-" },
    { char: "", value: " " }, // Spacebar
    { char: "", value: "\n" }, // New line
    { char: "Backspace", value: "_delete_" },
  ],
];

export function UrduKeyboard() {
  const addItems = useWorksheetStore((s) => s.addItems);
  const removeItem = useWorksheetStore((s) => s.removeItem);
  const worksheetItems = useWorksheetStore((s) => s.worksheet.items);
  const selectedItemId = useWorksheetStore((s) => s.worksheet.selectedItemId);
  const setSelected = useWorksheetStore((s) => s.setSelected);

  const handleKeyPress = (value: string) => {
    if (value === "_delete_") {
      // This is a simplified delete. In a real scenario, you'd want to delete the last typed char or selected item.
      // For now, it will remove the last added item if no specific item is selected
      if (selectedItemId) {
        removeItem(selectedItemId);
        setSelected(null);
      } else if (worksheetItems.length > 0) {
        const lastItem = worksheetItems[worksheetItems.length - 1];
        removeItem(lastItem.id);
      }
    } else if (value === "\n") {
      // For newline, we can add a special item or simply ignore for now, depends on layout engine.
      // For now, let's treat it as a space for simplicity if no specific text item concept is available.
      addItems([{ category: "urdu" as const, value: " " }]);
    } else {
      addItems([{ category: "urdu" as const, value }]);
    }
  };

  return (
    <div className="flex flex-col gap-1.5 p-3 rounded-xl border border-slate-200 bg-white/70">
      {URDU_KEYBOARD_LAYOUT.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1.5 justify-center">
          {row.map((key) => (
            <Button
              key={key.char}
              variant="secondary"
              size={key.value === " " ? "lg" : "sm"}
              onClick={() => handleKeyPress(key.value)}
              className={cn(
                "min-w-[36px]",
                key.value === " " && "flex-grow-[3]",
                key.value === "\n" && "flex-grow-[2]",
                key.value === "_delete_" && "flex-grow-[2] text-red-600",
              )}
            >
              {key.char === "" ? (key.value === " " ? "Space" : "Enter") : key.char}
            </Button>
          ))}
        </div>
      ))}
    </div>
  );
}
