"use client";

import { useWorksheetStore } from "@/store/worksheetStore";
import type { LayoutMode } from "@/types/worksheet";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

const LAYOUT_OPTIONS: { key: LayoutMode; label: string }[] = [
  { key: "auto", label: "Auto" },
  { key: "1", label: "1 / row" },
  { key: "2", label: "2 / row" },
  { key: "3", label: "3 / row" },
  { key: "4", label: "4 / row" },
  { key: "fill", label: "Fill page" },
];

function SliderRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <span className="text-[11px] tabular-nums text-[#a3947c]">{value}</span>
      </div>
      <Slider value={[value]} min={0} max={100} step={1} onValueChange={([v]) => onChange(v)} />
    </div>
  );
}

export function LayoutControls() {
  const worksheet = useWorksheetStore((s) => s.worksheet);
  const updateSettings = useWorksheetStore((s) => s.updateSettings);

  return (
    <div className="space-y-5">
      <div>
        <Label className="mb-2 block">Layout mode</Label>
        <div className="grid grid-cols-3 gap-1.5">
          {LAYOUT_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              onClick={() => updateSettings({ layoutMode: opt.key })}
              className={cn(
                "rounded-lg border px-2 py-1.5 text-xs font-medium transition-colors",
                worksheet.layoutMode === opt.key
                  ? "border-[#b5652f] bg-[#f0e4d3] text-[#733d1d]"
                  : "border-[#e4d6c3] bg-white text-[#5c4d3c] hover:bg-[#faf5ec]",
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <SliderRow label="Item size" value={worksheet.itemSize} onChange={(v) => updateSettings({ itemSize: v })} />
      <SliderRow label="Spacing" value={worksheet.spacing} onChange={(v) => updateSettings({ spacing: v })} />
      <SliderRow label="Row gap" value={worksheet.rowGap} onChange={(v) => updateSettings({ rowGap: v })} />
      <SliderRow label="Column gap" value={worksheet.colGap} onChange={(v) => updateSettings({ colGap: v })} />
    </div>
  );
}
