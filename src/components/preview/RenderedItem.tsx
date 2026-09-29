"use client";

import type { LayoutBox, WorksheetStyle } from "@/types/worksheet";
import { WorksheetItemIcon } from "@/components/icons/WorksheetItemIcon";
import { ItemToolbar } from "@/components/preview/ItemToolbar";
import { useWorksheetStore } from "@/store/worksheetStore";
import { cn } from "@/lib/utils";

interface RenderedItemProps {
  box: LayoutBox;
  style: WorksheetStyle;
  inkSaver: boolean;
  selected: boolean;
}

export function RenderedItem({ box, style, inkSaver, selected }: RenderedItemProps) {
  const setSelected = useWorksheetStore((s) => s.setSelected);
  const scale = box.item.scale ?? 1;

  return (
    <div
      className="absolute"
      style={{ left: `${box.x}mm`, top: `${box.y}mm`, width: `${box.size}mm`, height: `${box.size}mm` }}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setSelected(selected ? null : box.item.id);
        }}
        className={cn(
          "no-print-outline relative flex h-full w-full items-center justify-center rounded-md transition-shadow",
          selected && "no-print ring-2 ring-[#b5652f] ring-offset-2",
        )}
        style={{ transform: `scale(${scale})` }}
        aria-label={`${box.item.category} ${box.item.label ?? box.item.value}`}
      >
        <WorksheetItemIcon item={box.item} style={style} inkSaver={inkSaver} className="h-full w-full" />
        {selected && <ItemToolbar />}
      </button>
    </div>
  );
}
