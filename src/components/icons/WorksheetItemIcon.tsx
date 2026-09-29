import type { WorksheetItem, WorksheetStyle } from "@/types/worksheet";
import type { ShapeKey } from "@/lib/data/shapes";
import type { FruitKey } from "@/lib/data/fruits";
import type { AnimalKey } from "@/lib/data/animals";
import { getIconPaint } from "@/components/icons/paint";
import { ShapeIcon } from "@/components/icons/ShapeIcon";
import { FruitIcon } from "@/components/icons/FruitIcon";
import { AnimalIcon } from "@/components/icons/AnimalIcon";
import { GlyphText } from "@/components/icons/GlyphText";

interface WorksheetItemIconProps {
  item: WorksheetItem;
  style: WorksheetStyle;
  inkSaver?: boolean;
  className?: string;
}

/** Renders any worksheet item (glyph, shape, fruit, animal or uploaded image) uniformly. */
export function WorksheetItemIcon({ item, style, inkSaver, className }: WorksheetItemIconProps) {
  if (item.category === "image" && item.imageSrc) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={item.imageSrc}
        alt={item.label ?? "Uploaded image"}
        className={className}
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
        draggable={false}
      />
    );
  }

  const paint = getIconPaint(style, inkSaver);
  const strokeWidth = style === "tracing" ? 1.4 : style === "outline" ? 2.4 : 1.8;
  const strokeDasharray = style === "tracing" ? "3.2 3" : paint.dash;
  const strokeLinecap = "round" as const;

  return (
    <svg viewBox="0 0 100 100" className={className} style={{ width: "100%", height: "100%", overflow: "visible" }}>
      {item.category === "shape" && <ShapeIcon shapeKey={item.value as ShapeKey} paint={paint} />}
      {item.category === "fruit" && <FruitIcon fruitKey={item.value as FruitKey} paint={paint} />}
      {item.category === "animal" && <AnimalIcon animalKey={item.value as AnimalKey} paint={paint} />}
      {(item.category === "number" || item.category === "letter") && (
        <GlyphText value={item.value} style={style} category={item.category} />
      )}
      {item.category === "urdu" && <GlyphText value={item.value} style={style} isUrdu />}

      {item.category === "horizontal-line" && (
        <line
          x1="10"
          y1="50"
          x2="90"
          y2="50"
          stroke={paint.lineStroke}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          strokeLinecap={strokeLinecap}
        />
      )}
      {item.category === "vertical-line" && (
        <line
          x1="50"
          y1="10"
          x2="50"
          y2="90"
          stroke={paint.lineStroke}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          strokeLinecap={strokeLinecap}
        />
      )}
      {item.category === "underline" && (
        <line
          x1="10"
          y1="80"
          x2="90"
          y2="80"
          stroke={paint.lineStroke}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          strokeLinecap={strokeLinecap}
        />
      )}
    </svg>
  );
}
