"use client";

import { useEffect } from "react";
import type { Orientation } from "@/types/worksheet";

/** Keeps the @page print rule in sync with the current worksheet orientation. */
export function PrintStyleInjector({ orientation }: { orientation: Orientation }) {
  useEffect(() => {
    const id = "dynamic-print-page-rule";
    let styleEl = document.getElementById(id) as HTMLStyleElement | null;
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = id;
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = `@page { size: A4 ${orientation}; margin: 0; }`;
  }, [orientation]);

  return null;
}
