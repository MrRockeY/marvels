"use client";

import { ChevronDown, Hash, Type, Languages, Shapes as ShapesIcon, Apple, PawPrint, ImageIcon, BookText, Minus, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { NumberPicker } from "@/components/editor/NumberPicker";
import { AlphabetPicker } from "@/components/editor/AlphabetPicker";
import { UrduPicker } from "@/components/editor/UrduPicker";
import { ShapePicker } from "@/components/editor/ShapePicker";
import { AssetPicker } from "@/components/editor/AssetPicker";
import { MyImagesPicker } from "@/components/editor/MyImagesPicker";
import { IslamicContentPicker } from "@/components/editor/IslamicContentPicker";
import { LineToolsPicker } from "@/components/editor/LineToolsPicker";
import { FRUITS } from "@/lib/data/fruits";
import { ANIMALS } from "@/lib/data/animals";

export const CATEGORIES = [
  { key: "number", label: "123 Numbers", icon: Hash },
  { key: "letter", label: "ABC English", icon: Type },
  { key: "urdu", label: "Alif Bay / Urdu", icon: Languages },
  { key: "islamic-text", label: "Islamic & Urdu Text", icon: BookText },
  { key: "shape", label: "Shapes", icon: ShapesIcon },
  { key: "line-tools", label: "Lines & Formatting", icon: Minus },
  { key: "fruit", label: "Fruits", icon: Apple },
  { key: "animal", label: "Animals", icon: PawPrint },
  { key: "image", label: "My Images", icon: ImageIcon },
] as const;

export type CategoryKey = (typeof CATEGORIES)[number]["key"];

interface CategoryPanelProps {
  active: CategoryKey | null;
  onToggle: (key: CategoryKey) => void;
}

export function CategoryPanel({ active, onToggle }: CategoryPanelProps) {
  return (
    <div className="space-y-2">
      {CATEGORIES.map(({ key, label, icon: Icon }) => {
        const isOpen = active === key;
        return (
          <div
            key={key}
            className={cn(
              "overflow-hidden rounded-xl border transition-colors",
              isOpen ? "border-[#d9b98d] bg-white" : "border-[#e9ded0] bg-white/70",
            )}
          >
            <button
              onClick={() => onToggle(key)}
              className="flex w-full items-center gap-2.5 px-3 py-2.5 text-left"
              aria-expanded={isOpen}
            >
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                  isOpen ? "bg-[#f0e4d3] text-[#8a4a24]" : "bg-[#f4ede4] text-[#8a7a63]",
                )}
              >
                <Icon className="h-4 w-4" />
              </span>
              <span className="flex-1 text-sm font-medium text-[#3d3226]">{label}</span>
              <ChevronDown
                className={cn("h-4 w-4 text-[#a3947c] transition-transform", isOpen && "rotate-180")}
              />
            </button>
            {isOpen && (
              <div className="border-t border-[#f0e6d8] px-3 pb-4 pt-3">
                {key === "number" && <NumberPicker />}
                {key === "letter" && <AlphabetPicker />}
                {key === "urdu" && <UrduPicker />}
                {key === "islamic-text" && <IslamicContentPicker />}
                {key === "line-tools" && <LineToolsPicker />}
                {key === "shape" && <ShapePicker />}
                {key === "fruit" && <AssetPicker category="fruit" assets={FRUITS} />}
                {key === "animal" && <AssetPicker category="animal" assets={ANIMALS} />}
                {key === "image" && <MyImagesPicker />}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
