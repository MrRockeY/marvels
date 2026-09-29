"use client";

import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";
import { useWorksheetStore } from "@/store/worksheetStore";
import type { TitleAlign } from "@/types/worksheet";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const ALIGN_OPTIONS: { key: TitleAlign; icon: typeof AlignLeft }[] = [
  { key: "left", icon: AlignLeft },
  { key: "center", icon: AlignCenter },
  { key: "right", icon: AlignRight },
];

export function HeaderControls() {
  const worksheet = useWorksheetStore((s) => s.worksheet);
  const updateSettings = useWorksheetStore((s) => s.updateSettings);

  const setHeaderField = (field: keyof typeof worksheet.header, value: boolean) => {
    updateSettings({ header: { ...worksheet.header, [field]: value } });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between rounded-xl border border-[#e4d6c3] bg-white px-3 py-2.5">
        <Label htmlFor="show-school">School name</Label>
        <Switch
          id="show-school"
          checked={worksheet.header.showSchoolName}
          onCheckedChange={(v) => setHeaderField("showSchoolName", v)}
        />
      </div>

      <div className="space-y-2 rounded-xl border border-[#e4d6c3] bg-white px-3 py-2.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="show-title">Worksheet title</Label>
          <Switch id="show-title" checked={worksheet.header.showTitle} onCheckedChange={(v) => setHeaderField("showTitle", v)} />
        </div>
        {worksheet.header.showTitle && (
          <>
            <input
              value={worksheet.title}
              onChange={(e) => updateSettings({ title: e.target.value })}
              placeholder="e.g. NUMBER TRACING"
              className="w-full rounded-lg border border-[#e4d6c3] bg-[#fbf7f1] px-2.5 py-1.5 text-sm text-[#3d3226] placeholder:text-[#a3947c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b5652f]"
            />
            <div className="flex gap-1.5">
              {ALIGN_OPTIONS.map(({ key, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => updateSettings({ titleAlign: key })}
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-md border",
                    worksheet.titleAlign === key
                      ? "border-[#b5652f] bg-[#f0e4d3] text-[#733d1d]"
                      : "border-[#e4d6c3] bg-white text-[#5c4d3c]",
                  )}
                  aria-label={`Align title ${key}`}
                >
                  <Icon className="h-3.5 w-3.5" />
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="flex items-center justify-between rounded-xl border border-[#e4d6c3] bg-white px-3 py-2.5">
        <Label htmlFor="show-name">Name line</Label>
        <Switch id="show-name" checked={worksheet.header.showName} onCheckedChange={(v) => setHeaderField("showName", v)} />
      </div>

      <div className="flex items-center justify-between rounded-xl border border-[#e4d6c3] bg-white px-3 py-2.5">
        <Label htmlFor="show-date">Date line</Label>
        <Switch id="show-date" checked={worksheet.header.showDate} onCheckedChange={(v) => setHeaderField("showDate", v)} />
      </div>
    </div>
  );
}
