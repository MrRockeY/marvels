"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Wand2 } from "lucide-react";
import { TEMPLATES } from "@/lib/data/templates";
import { createDefaultWorksheet, useWorksheetStore } from "@/store/worksheetStore";
import { A4Preview } from "@/components/preview/A4Preview";
import { Button } from "@/components/ui/button";
import type { Worksheet } from "@/types/worksheet";

export function TemplateGallery() {
  const loadWorksheet = useWorksheetStore((s) => s.loadWorksheet);
  const router = useRouter();

  const previews = useMemo<Worksheet[]>(
    () => TEMPLATES.map((t) => ({ ...createDefaultWorksheet(), ...t.build() })),
    [],
  );

  const handleUse = (index: number) => {
    const worksheet = { ...createDefaultWorksheet(), ...TEMPLATES[index].build() };
    loadWorksheet(worksheet);
    router.push("/");
  };

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {TEMPLATES.map((template, i) => (
        <div
          key={template.id}
          className="flex flex-col overflow-hidden rounded-2xl border border-[#e9ded0] bg-white shadow-[0_1px_2px_rgba(60,45,25,0.04)] transition-shadow hover:shadow-[0_8px_24px_rgba(60,45,25,0.08)]"
        >
          <div className="flex items-center justify-center bg-[#f4ede4] p-4" style={{ aspectRatio: "230/300" }}>
            <div className="pointer-events-none w-full origin-top scale-[0.98]">
              <A4Preview worksheet={previews[i]} />
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-1.5 p-4">
            <h3 className="text-sm font-semibold text-[#2b2117]">{template.name}</h3>
            <p className="text-xs leading-relaxed text-[#8a7a63]">{template.description}</p>
            <Button variant="primary" size="sm" className="mt-3" onClick={() => handleUse(i)}>
              <Wand2 className="h-3.5 w-3.5" />
              Use template
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
