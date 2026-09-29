"use client";

import { PenLine, Palette, Sparkle, Droplet } from "lucide-react";
import { useWorksheetStore } from "@/store/worksheetStore";
import type { WorksheetStyle } from "@/types/worksheet";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const STYLE_OPTIONS: { key: WorksheetStyle; label: string; icon: typeof Palette; hint: string }[] = [
  { key: "solid", label: "Solid", icon: Sparkle, hint: "Normal filled characters" },
  { key: "outline", label: "Outline", icon: Palette, hint: "Thick outline, ready to color" },
  { key: "tracing", label: "Tracing", icon: PenLine, hint: "Dashed stroke for tracing" },
];

export function StyleControls() {
  const style = useWorksheetStore((s) => s.worksheet.style);
  const inkSaver = useWorksheetStore((s) => s.worksheet.inkSaver);
  const updateSettings = useWorksheetStore((s) => s.updateSettings);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        {STYLE_OPTIONS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => updateSettings({ style: key })}
            className={cn(
              "flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3 text-xs font-medium transition-colors",
              style === key
                ? "border-[#b5652f] bg-[#f0e4d3] text-[#733d1d]"
                : "border-[#e4d6c3] bg-white text-[#5c4d3c] hover:bg-[#faf5ec]",
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between rounded-xl border border-[#e4d6c3] bg-white px-3 py-2.5">
        <div className="flex items-center gap-2">
          <Droplet className="h-4 w-4 text-[#8a4a24]" />
          <div>
            <Label htmlFor="ink-saver">Ink saver</Label>
            <p className="text-[11px] text-[#a3947c]">Prefer outlines, reduce filled areas</p>
          </div>
        </div>
        <Switch id="ink-saver" checked={inkSaver} onCheckedChange={(checked) => updateSettings({ inkSaver: checked })} />
      </div>
    </div>
  );
}
