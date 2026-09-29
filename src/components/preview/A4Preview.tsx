"use client";

import { useEffect, useRef, useState } from "react";
import type { Worksheet } from "@/types/worksheet";
import { getPageSizeMm } from "@/lib/pageMetrics";
import { WorksheetCanvas } from "@/components/preview/WorksheetCanvas";

const PX_PER_MM = 96 / 25.4;

interface A4PreviewProps {
  worksheet: Worksheet;
}

export function A4Preview({ worksheet }: A4PreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const page = getPageSizeMm(worksheet.orientation);
  const pageWidthPx = page.width * PX_PER_MM;
  const pageHeightPx = page.height * PX_PER_MM;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const width = el.clientWidth;
      const nextScale = Math.min(1, (width - 4) / pageWidthPx);
      setScale(Math.max(0.15, nextScale));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [pageWidthPx]);

  return (
    <div ref={containerRef} className="flex w-full justify-center">
      <div
        className="preview-wrapper relative"
        style={{ width: pageWidthPx * scale, height: pageHeightPx * scale }}
      >
        <div
          className="preview-scale absolute left-0 top-0 origin-top-left shadow-[0_2px_10px_rgba(60,45,25,0.08),0_18px_45px_rgba(60,45,25,0.14)]"
          style={{ transform: `scale(${scale})` }}
        >
          <WorksheetCanvas worksheet={worksheet} />
        </div>
      </div>
    </div>
  );
}
