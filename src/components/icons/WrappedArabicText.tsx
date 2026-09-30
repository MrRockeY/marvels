"use client";

import type { WorksheetStyle } from "@/types/worksheet";

const INK = "#1c1712";

interface WrappedArabicTextProps {
  value: string;
  style: WorksheetStyle;
  className?: string;
}

/**
 * Multi-line RTL Arabic/Urdu passage that wraps within its container
 * instead of overflowing as a single SVG glyph line.
 */
export function WrappedArabicText({ value, style, className }: WrappedArabicTextProps) {
  const isTracing = style === "tracing";
  const isOutline = style === "outline";

  return (
    <div
      dir="rtl"
      lang="ar"
      className={className}
      style={{
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
        padding: "1.5mm 2mm",
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-start",
      }}
    >
      <p
        style={{
          margin: 0,
          width: "100%",
          fontFamily: "'Noto Nastaliq Urdu', serif",
          fontSize: "4.2mm",
          lineHeight: 1.85,
          fontWeight: 500,
          textAlign: "right",
          whiteSpace: "normal",
          overflowWrap: "anywhere",
          wordBreak: "break-word",
          color: isOutline ? "#ffffff" : INK,
          WebkitTextStroke: isOutline
            ? `0.35mm ${INK}`
            : isTracing
              ? `0.25mm ${INK}`
              : undefined,
          paintOrder: isOutline ? "stroke fill" : undefined,
          backgroundImage: isTracing
            ? "repeating-linear-gradient(90deg, currentColor 0 1.2mm, transparent 1.2mm 2.8mm)"
            : undefined,
          WebkitBackgroundClip: isTracing ? "text" : undefined,
          backgroundClip: isTracing ? "text" : undefined,
          ...(isTracing
            ? {
                color: "transparent",
                WebkitTextStroke: `0.3mm ${INK}`,
              }
            : null),
        }}
      >
        {value}
      </p>
    </div>
  );
}
