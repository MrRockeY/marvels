// Core domain types for MARVELS Montessori Worksheet Studio.
// Kept framework-agnostic so a future backend (e.g. Supabase) can persist
// these same shapes without any rewrite of the editor or layout engine.

export type ItemCategory =
  | "number"
  | "letter"
  | "urdu"
  | "islamic-text"
  | "shape"
  | "fruit"
  | "animal"
  | "image"
  | "underline"
  | "horizontal-line"
  | "vertical-line";

export type WorksheetStyle = "solid" | "outline" | "tracing";

export type Orientation = "portrait" | "landscape";

export type MarginSize = "small" | "medium" | "large";

export type LayoutMode = "auto" | "1" | "2" | "3" | "4" | "fill";

export type TitleAlign = "left" | "center" | "right";

export type ActivityType =
  | "tracing"
  | "coloring"
  | "counting"
  | "matching"
  | "circle-correct"
  | "find-letter"
  | "missing-number"
  | "missing-letter"
  | "case-matching"
  | "ordering";

export interface WorksheetItem {
  /** Unique id for this placed instance (stable across re-renders / undo). */
  id: string;
  category: ItemCategory;
  /** Character to render (numbers/letters/urdu) or asset key (shape/fruit/animal). */
  value: string;
  /** Human friendly label, used for a11y and "My Images" library entries. */
  label?: string;
  /** Data URL for uploaded images. */
  imageSrc?: string;
  /** Optional per-item size multiplier (1 = default cell size). */
  scale?: number;
  /** Optional length for line items (in mm). */
  length?: number;
}

export interface HeaderSettings {
  showSchoolName: boolean;
  showTitle: boolean;
  showName: boolean;
  showDate: boolean;
}

export interface Worksheet {
  id: string;
  /** Name used when saved to the local worksheet library. */
  name: string;
  schoolName: string;
  title: string;
  titleAlign: TitleAlign;
  header: HeaderSettings;
  orientation: Orientation;
  margins: MarginSize;
  style: WorksheetStyle;
  layoutMode: LayoutMode;
  /** 0-100 slider values driving the deterministic layout engine. */
  itemSize: number;
  spacing: number;
  rowGap: number;
  colGap: number;
  inkSaver: boolean;
  items: WorksheetItem[];
  selectedItemId: string | null;
  activityType: ActivityType;
  createdAt: number;
  updatedAt: number;
}

export interface SavedWorksheetRecord {
  id: string;
  name: string;
  worksheet: Worksheet;
  createdAt: number;
  updatedAt: number;
}

export interface UploadedImage {
  id: string;
  name: string;
  dataUrl: string;
  createdAt: number;
}

export interface WorksheetTemplate {
  id: string;
  name: string;
  description: string;
  category: ItemCategory | "mixed";
  activityType: ActivityType;
  build: () => Partial<Worksheet>;
}

export interface LayoutBox {
  id: string;
  item: WorksheetItem;
  x: number; // mm from page top-left
  y: number; // mm from page top-left
  size: number; // mm square cell size
}

export interface LayoutResult {
  boxes: LayoutBox[];
  columns: number;
  rows: number;
  cellSize: number;
  printableWidth: number;
  printableHeight: number;
  headerHeight: number;
}
