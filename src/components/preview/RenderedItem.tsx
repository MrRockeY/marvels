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
  const removeItem = useWorksheetStore((s) => s.removeItem);
  const eraserMode = useWorksheetStore((s) => s.eraserMode);
  const scale = box.item.scale ?? 1;
  const width = box.width ?? box.size;
  const height = box.height ?? box.size;
  const isRtl =
    box.item.category === "urdu" || box.item.category === "islamic-text";

  const handleSelect = () => {
    if (eraserMode) {
      removeItem(box.item.id);
      return;
    }
    setSelected(selected ? null : box.item.id);
  };

  return (
    <div
      className="absolute"
      dir={isRtl ? "rtl" : undefined}
      lang={isRtl ? "ur" : undefined}
      style={{
        left: `${box.x}mm`,
        top: `${box.y}mm`,
        width: `${width}mm`,
        height: `${height}mm`,
      }}
    >
      <div
        role="button"
        tabIndex={0}
        onClick={(e) => {
          e.stopPropagation();
          handleSelect();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            e.stopPropagation();
            handleSelect();
          }
        }}
        className={cn(
          "no-print-outline relative flex h-full w-full cursor-pointer items-center justify-center rounded-md transition-shadow",
          selected && !eraserMode && "no-print ring-2 ring-[#b5652f] ring-offset-2",
        )}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
        aria-label={`${box.item.category} ${box.item.label ?? box.item.value}`}
      >
        <WorksheetItemIcon item={box.item} style={style} inkSaver={inkSaver} className="h-full w-full" />
      </div>
      {selected && !eraserMode && <ItemToolbar />}
    </div>
  );
}
