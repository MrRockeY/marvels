"use client";

import { RectangleHorizontal, RectangleVertical } from "lucide-react";
import { useWorksheetStore } from "@/store/worksheetStore";
import type { MarginSize } from "@/types/worksheet";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

const MARGIN_OPTIONS: { key: MarginSize; label: string }[] = [
  { key: "small", label: "Small" },
  { key: "medium", label: "Medium" },
  { key: "large", label: "Large" },
];

export function PageControls() {
  const worksheet = useWorksheetStore((s) => s.worksheet);
  const updateSettings = useWorksheetStore((s) => s.updateSettings);

  return (
    <div className="space-y-5">
      <div>
        <Label className="mb-2 block">Orientation</Label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => updateSettings({ orientation: "portrait" })}
            className={cn(
              "flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition-colors",
              worksheet.orientation === "portrait"
                ? "border-[#b5652f] bg-[#f0e4d3] text-[#733d1d]"
                : "border-[#e4d6c3] bg-white text-[#5c4d3c] hover:bg-[#faf5ec]",
            )}
          >
            <RectangleVertical className="h-4 w-4" /> Portrait
          </button>
          <button
            onClick={() => updateSettings({ orientation: "landscape" })}
            className={cn(
              "flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition-colors",
              worksheet.orientation === "landscape"
                ? "border-[#b5652f] bg-[#f0e4d3] text-[#733d1d]"
                : "border-[#e4d6c3] bg-white text-[#5c4d3c] hover:bg-[#faf5ec]",
            )}
          >
            <RectangleHorizontal className="h-4 w-4" /> Landscape
          </button>
        </div>
      </div>

      <div>
        <Label className="mb-2 block">Margins</Label>
        <div className="grid grid-cols-3 gap-1.5">
          {MARGIN_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              onClick={() => updateSettings({ margins: opt.key })}
              className={cn(
                "rounded-lg border px-2 py-1.5 text-xs font-medium transition-colors",
                worksheet.margins === opt.key
                  ? "border-[#b5652f] bg-[#f0e4d3] text-[#733d1d]"
                  : "border-[#e4d6c3] bg-white text-[#5c4d3c] hover:bg-[#faf5ec]",
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
      <p className="text-[11px] text-[#a3947c]">A4 page size · dimensions preserved when printing.</p>
    </div>
  );
}
