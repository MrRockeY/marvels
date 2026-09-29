import type { WorksheetStyle } from "@/types/worksheet";

export interface IconPaint {
  shapeFill: string;
  shapeStroke: string;
  shapeStrokeWidth: number;
  lineStroke: string;
  lineWidth: number;
  dash?: string;
}

const INK = "#1c1712";

/** Resolves the visual paint (fill/stroke/dash) for a given worksheet style. */
export function getIconPaint(style: WorksheetStyle, inkSaver = false): IconPaint {
  if (style === "tracing") {
    return {
      shapeFill: "none",
      shapeStroke: INK,
      shapeStrokeWidth: 2.1,
      lineStroke: INK,
      lineWidth: 1.6,
      dash: "4.5 4",
    };
  }
  if (style === "solid" && !inkSaver) {
    return {
      shapeFill: INK,
      shapeStroke: "none",
      shapeStrokeWidth: 0,
      lineStroke: "#ffffff",
      lineWidth: 1.8,
    };
  }
  // outline / coloring mode (also used when ink-saver overrides solid)
  return {
    shapeFill: "none",
    shapeStroke: INK,
    shapeStrokeWidth: 3,
    lineStroke: INK,
    lineWidth: 1.8,
  };
}
