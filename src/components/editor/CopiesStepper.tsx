"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CopiesStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

/** Small "Copies" stepper used by every picker to control repeat count on add. */
export function CopiesStepper({ value, onChange, min = 1, max = 20 }: CopiesStepperProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium text-[#7a6c58]">Copies</span>
      <div className="flex items-center rounded-lg border border-[#e4d6c3] bg-white">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-7 w-7 rounded-r-none"
          onClick={() => onChange(Math.max(min, value - 1))}
          aria-label="Decrease copies"
        >
          <Minus className="h-3 w-3" />
        </Button>
        <span className="w-7 text-center text-sm font-medium text-[#3d3226] tabular-nums">
          {value}
        </span>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-7 w-7 rounded-l-none"
          onClick={() => onChange(Math.min(max, value + 1))}
          aria-label="Increase copies"
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}
