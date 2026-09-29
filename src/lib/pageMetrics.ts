import type { MarginSize, Orientation } from "@/types/worksheet";

export const A4_MM = { width: 210, height: 297 };

export function getPageSizeMm(orientation: Orientation) {
  return orientation === "portrait"
    ? { width: A4_MM.width, height: A4_MM.height }
    : { width: A4_MM.height, height: A4_MM.width };
}

export const MARGIN_MM: Record<MarginSize, number> = {
  small: 10,
  medium: 16,
  large: 24,
};
