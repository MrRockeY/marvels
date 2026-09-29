"use client";

import { Hash, Type, Languages, Shapes as ShapesIcon, Apple, PawPrint, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const QUICK_ACTIONS = [
  { key: "letter", label: "ABC", icon: Type },
  { key: "number", label: "123", icon: Hash },
  { key: "urdu", label: "Alif Bay", icon: Languages },
  { key: "shape", label: "Shapes", icon: ShapesIcon },
  { key: "fruit", label: "Fruits", icon: Apple },
  { key: "animal", label: "Animals", icon: PawPrint },
] as const;

interface EmptyStateProps {
  onStart: () => void;
  onQuickCategory: (category: string) => void;
}

export function EmptyState({ onStart, onQuickCategory }: EmptyStateProps) {
  return (
    <div className="flex h-full min-h-[520px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#e4d6c3] bg-white/60 px-8 py-16 text-center">
      <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#f0e4d3] text-[#8a4a24]">
        <Sparkles className="h-6 w-6" />
      </span>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#b5652f]">
        MARVELS Montessori
      </p>
      <h2 className="mt-3 max-w-md text-2xl font-semibold text-[#2b2117] sm:text-3xl">
        Create a worksheet in seconds.
      </h2>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-[#7a6c58]">
        Choose letters, numbers, shapes, fruits or animals and we&apos;ll arrange everything
        automatically on a print-ready A4 page.
      </p>
      <Button size="lg" variant="primary" className="mt-7" onClick={onStart}>
        Start Creating
      </Button>

      <div className="mt-10 grid grid-cols-3 gap-3 sm:grid-cols-6">
        {QUICK_ACTIONS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => onQuickCategory(key)}
            className="flex flex-col items-center gap-2 rounded-xl border border-[#e9ded0] bg-white px-4 py-4 text-xs font-medium text-[#5c4d3c] transition-colors hover:border-[#c98a4f] hover:bg-[#fbf3e8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b5652f]"
          >
            <Icon className="h-5 w-5 text-[#8a4a24]" />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
