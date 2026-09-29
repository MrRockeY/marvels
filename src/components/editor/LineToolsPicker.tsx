"use client";

import { useState } from "react";
import { useWorksheetStore } from "@/store/worksheetStore";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input"; // Assuming you have an Input component
import { Slider } from "@/components/ui/slider";

export function LineToolsPicker() {
  const addItems = useWorksheetStore((s) => s.addItems);
  const removeCategory = useWorksheetStore((s) => s.removeCategory);
  const [lineLength, setLineLength] = useState(50); // Default line length in mm

  const addLine = (category: "underline" | "horizontal-line" | "vertical-line") => {
    addItems([{ category, value: "", length: lineLength }]);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="line-length" className="text-sm font-medium text-slate-700">Line Length ({lineLength}mm)</Label>
        <Slider
          id="line-length"
          min={10}
          max={200}
          step={5}
          value={[lineLength]}
          onValueChange={(val) => setLineLength(val[0])}
          className="w-[60%]"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" size="sm" onClick={() => addLine("horizontal-line")}>
          Add Horizontal Line
        </Button>
        <Button variant="secondary" size="sm" onClick={() => addLine("vertical-line")}>
          Add Vertical Line
        </Button>
        {/* Underline functionality might be applied to existing text items, so it's different. 
            For now, we'll keep it as a separate item that can be placed. */}
        <Button variant="secondary" size="sm" onClick={() => addLine("underline")}>
          Add Underline
        </Button>
      </div>

      <div className="flex justify-end">
        <Button variant="ghost" size="sm" onClick={() => removeCategory("horizontal-line") && removeCategory("vertical-line") && removeCategory("underline")}>
          Clear All Lines
        </Button>
      </div>
    </div>
  );
}
