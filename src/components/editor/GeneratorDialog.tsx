"use client";

import { useState } from "react";
import { Wand2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { useWorksheetStore } from "@/store/worksheetStore";
import { generateWorksheet } from "@/lib/generator";
import type { ActivityType, ItemCategory, WorksheetStyle } from "@/types/worksheet";

const CATEGORY_OPTIONS: { key: ItemCategory; label: string }[] = [
  { key: "number", label: "Numbers" },
  { key: "letter", label: "Letters" },
  { key: "urdu", label: "Alif Bay" },
  { key: "shape", label: "Shapes" },
];

const ACTIVITY_OPTIONS: { key: ActivityType; label: string; ready: boolean }[] = [
  { key: "tracing", label: "Tracing", ready: true },
  { key: "coloring", label: "Coloring", ready: true },
  { key: "counting", label: "Counting", ready: true },
  { key: "matching", label: "Matching", ready: false },
  { key: "missing-number", label: "Missing number", ready: false },
];

const STYLE_OPTIONS: { key: WorksheetStyle; label: string }[] = [
  { key: "solid", label: "Solid" },
  { key: "outline", label: "Outline" },
  { key: "tracing", label: "Tracing" },
];

export function GeneratorDialog() {
  const updateSettings = useWorksheetStore((s) => s.updateSettings);
  const clearItems = useWorksheetStore((s) => s.clearItems);
  const addItems = useWorksheetStore((s) => s.addItems);

  const [category, setCategory] = useState<ItemCategory>("number");
  const [activityType, setActivityType] = useState<ActivityType>("tracing");
  const [style, setStyle] = useState<WorksheetStyle>("tracing");
  const [count, setCount] = useState(10);
  const [open, setOpen] = useState(false);

  const handleGenerate = () => {
    const { items, title } = generateWorksheet({ category, activityType, style, count });
    clearItems();
    addItems(items.map(({ category: c, value }) => ({ category: c, value })));
    updateSettings({
      style,
      activityType,
      title,
      layoutMode: "auto",
      header: { showSchoolName: true, showTitle: true, showName: true, showDate: true },
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="primary" size="sm" className="w-full">
          <Wand2 className="h-4 w-4" />
          Generate Worksheet
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate a worksheet</DialogTitle>
          <DialogDescription>
            Pick a category and activity — we&apos;ll arrange everything automatically.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label className="mb-1.5 block">Category</Label>
            <div className="grid grid-cols-3 gap-1.5">
              {CATEGORY_OPTIONS.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setCategory(opt.key)}
                  className={cn(
                    "rounded-lg border px-2 py-1.5 text-xs font-medium transition-colors",
                    category === opt.key
                      ? "border-[#b5652f] bg-[#f0e4d3] text-[#733d1d]"
                      : "border-[#e4d6c3] bg-white text-[#5c4d3c] hover:bg-[#faf5ec]",
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label className="mb-1.5 block">Activity type</Label>
            <div className="grid grid-cols-3 gap-1.5">
              {ACTIVITY_OPTIONS.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => opt.ready && setActivityType(opt.key)}
                  disabled={!opt.ready}
                  title={opt.ready ? undefined : "Coming soon"}
                  className={cn(
                    "rounded-lg border px-2 py-1.5 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40",
                    activityType === opt.key
                      ? "border-[#b5652f] bg-[#f0e4d3] text-[#733d1d]"
                      : "border-[#e4d6c3] bg-white text-[#5c4d3c] hover:bg-[#faf5ec]",
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label className="mb-1.5 block">Style</Label>
            <div className="grid grid-cols-3 gap-1.5">
              {STYLE_OPTIONS.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setStyle(opt.key)}
                  className={cn(
                    "rounded-lg border px-2 py-1.5 text-xs font-medium transition-colors",
                    style === opt.key
                      ? "border-[#b5652f] bg-[#f0e4d3] text-[#733d1d]"
                      : "border-[#e4d6c3] bg-white text-[#5c4d3c] hover:bg-[#faf5ec]",
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <Label>Number of items</Label>
              <span className="text-xs tabular-nums text-[#a3947c]">{count}</span>
            </div>
            <Slider value={[count]} min={1} max={40} step={1} onValueChange={([v]) => setCount(v)} />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline" size="sm">
              Cancel
            </Button>
          </DialogClose>
          <Button variant="primary" size="sm" onClick={handleGenerate}>
            Generate Worksheet
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
