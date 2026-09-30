import type { ReactElement } from "react";
import type { ItemCategory, WorksheetStyle } from "@/types/worksheet";

interface GlyphTextProps {
  value: string;
  style: WorksheetStyle;
  isUrdu?: boolean;
  category?: ItemCategory;
}

const INK = "#1c1712";

const CUSTOM_GLYPHS: Record<string, ReactElement> = {
  "1": (
    <path
      d="M50 20 L50 80"
      strokeLinecap="round"
    />
  ),
  "4": (
    <path
      d="M30 30 V50 H70 V30 M30 50 V70 M70 50 V70"
      strokeLinecap="round"
    />
  ),
};

/**
 * Renders a single character (number / letter / Urdu) as inline SVG text so
 * solid, outline (coloring) and dashed tracing presentations are pixel
 * accurate both on screen and when printed.
 */
export function GlyphText({ value, style, isUrdu, category }: GlyphTextProps) {
  const fontFamily = isUrdu
    ? "'Noto Nastaliq Urdu', serif"
    : "'Poppins', 'Segoe UI', sans-serif";
  const fontSize = isUrdu ? 62 : 68;

  const common = {
    x: 50,
    y: isUrdu ? 58 : 54,
    textAnchor: "middle" as const,
    dominantBaseline: "middle" as const,
    fontFamily,
    fontWeight: isUrdu ? 500 : 700,
    fontSize,
    ...(isUrdu
      ? {
          direction: "rtl" as const,
          unicodeBidi: "isolate" as const,
        }
      : null),
  };

  const pathProps = {
    fill: "none",
    stroke: INK,
    strokeWidth: style === "outline" ? 5 : style === "tracing" ? 3 : 0,
    strokeDasharray: style === "tracing" ? "8 6" : "",
    strokeLinejoin: "round" as const,
    paintOrder: style === "outline" ? "stroke" as const : undefined,
  };

  if (category === "number" && CUSTOM_GLYPHS[value]) {
    const customPath = CUSTOM_GLYPHS[value];
    if (style === "solid") {
      // For solid, we can just render the path with a fill, no stroke
      return (
        <g transform="translate(-2 -2) scale(1.04)">
          {/* A small shadow to make it feel more solid, like a bold font. */}
          <g fill="#333" stroke="none">
            {customPath}
          </g>
          <g fill={INK} stroke="none">
            {customPath}
          </g>
        </g>
      );
    }

    return (
      <g transform="translate(-2 -2) scale(1.04)">
        {/* A small shadow to make it feel more solid, like a bold font. */}
        {style === "outline" && (
          <g stroke="#fff" strokeWidth={pathProps.strokeWidth + 3}>
            {customPath}
          </g>
        )}
        <g {...pathProps}>
          {customPath}
        </g>
      </g>
    );
  }

  if (style === "solid") {
    return (
      <text {...common} fill={INK} stroke="none">
        {value}
      </text>
    );
  }
  if (style === "tracing") {
    return (
      <text
        {...common}
        fill="none"
        stroke={INK}
        strokeWidth={1.4}
        strokeDasharray="3.2 3"
        strokeLinejoin="round"
      >
        {value}
      </text>
    );
  }
  // outline / coloring
  return (
    <text {...common} fill="#ffffff" stroke={INK} strokeWidth={2.4} strokeLinejoin="round" paintOrder="stroke">
      {value}
    </text>
  );
}
