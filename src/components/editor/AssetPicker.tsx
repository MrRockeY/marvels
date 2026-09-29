"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useWorksheetStore } from "@/store/worksheetStore";
import { FruitIcon } from "@/components/icons/FruitIcon";
import { AnimalIcon } from "@/components/icons/AnimalIcon";
import { getIconPaint } from "@/components/icons/paint";
import { CopiesStepper } from "@/components/editor/CopiesStepper";
import { Button } from "@/components/ui/button";
import type { ItemCategory } from "@/types/worksheet";

interface AssetPickerProps {
  category: Extract<ItemCategory, "fruit" | "animal">;
  assets: { key: string; label: string }[];
}

export function AssetPicker({ category, assets }: AssetPickerProps) {
  const addItems = useWorksheetStore((s) => s.addItems);
  const removeCategory = useWorksheetStore((s) => s.removeCategory);
  const [copies, setCopies] = useState(1);
  const [query, setQuery] = useState("");
  const paint = getIconPaint("outline");

  const filtered = useMemo(
    () => assets.filter((a) => a.label.toLowerCase().includes(query.trim().toLowerCase())),
    [assets, query],
  );

  const addValues = (values: string[]) => {
    const toAdd = values.flatMap((value) =>
      Array.from({ length: copies }, () => ({ category, value })),
    );
    addItems(toAdd);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#a3947c]" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${category === "fruit" ? "fruits" : "animals"}…`}
          className="w-full rounded-lg border border-[#e4d6c3] bg-white py-1.5 pl-8 pr-3 text-sm text-[#3d3226] placeholder:text-[#a3947c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b5652f]"
        />
      </div>

      <div className="flex items-center justify-between">
        <CopiesStepper value={copies} onChange={setCopies} />
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => addValues(assets.map((a) => a.key))}>
            Select all
          </Button>
          <Button variant="ghost" size="sm" onClick={() => removeCategory(category)}>
            Clear
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {filtered.map((asset) => (
          <button
            key={asset.key}
            onClick={() => addValues([asset.key])}
            className="flex flex-col items-center gap-1.5 rounded-xl border border-[#e4d6c3] bg-white p-2.5 transition-colors hover:border-[#c98a4f] hover:bg-[#fbf3e8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b5652f]"
            aria-label={`Add ${asset.label}`}
          >
            <svg viewBox="0 0 100 100" className="h-10 w-10 text-[#3d3226]">
              {category === "fruit" ? (
                <FruitIcon fruitKey={asset.key as never} paint={paint} />
              ) : (
                <AnimalIcon animalKey={asset.key as never} paint={paint} />
              )}
            </svg>
            <span className="text-[11px] font-medium text-[#5c4d3c]">{asset.label}</span>
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full py-4 text-center text-xs text-[#a3947c]">No matches found.</p>
        )}
      </div>
    </div>
  );
}
