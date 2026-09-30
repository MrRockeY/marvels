import { create } from "zustand";
import type { Worksheet, WorksheetItem } from "@/types/worksheet";
import { makeId } from "@/lib/utils";
import { getSettings } from "@/lib/settings";
import { getPageSizeMm, MARGIN_MM } from "@/lib/pageMetrics";

export function createDefaultWorksheet(): Worksheet {
  const now = Date.now();
  return {
    id: makeId("ws"),
    name: "Untitled worksheet",
    schoolName: "MARVELS Montessori",
    title: "",
    titleAlign: "center",
    header: {
      showSchoolName: true,
      showTitle: false,
      showName: true,
      showDate: true,
    },
    orientation: "portrait",
    margins: "medium",
    style: "solid",
    layoutMode: "auto",
    itemSize: 55,
    spacing: 40,
    rowGap: 42,
    colGap: 42,
    inkSaver: false,
    items: [],
    selectedItemId: null,
    activityType: "tracing",
    showMarginLines: false,
    createdAt: now,
    updatedAt: now,
  };
}

const HISTORY_LIMIT = 60;

interface WorksheetStoreState {
  worksheet: Worksheet;
  past: Worksheet[];
  future: Worksheet[];
  isDirty: boolean;
  lastSavedAt: number | null;
  currentSavedId: string | null;
  eraserMode: boolean;

  addItems: (items: Omit<WorksheetItem, "id">[]) => void;
  removeItem: (id: string) => void;
  removeLast: () => void;
  removeCategory: (category: WorksheetItem["category"]) => void;
  clearItems: () => void;
  resetWorksheet: () => void;
  setSelected: (id: string | null) => void;
  duplicateSelected: () => void;
  deleteSelected: () => void;
  resizeSelected: (delta: number) => void;
  updateSettings: (patch: Partial<Worksheet>) => void;
  undo: () => void;
  redo: () => void;
  loadWorksheet: (worksheet: Worksheet) => void;
  markSaved: (savedId: string, name: string) => void;
  setEraserMode: (enabled: boolean) => void;
}

function commit(
  set: (partial: Partial<WorksheetStoreState>) => void,
  get: () => WorksheetStoreState,
  mutate: (w: Worksheet) => Worksheet,
) {
  const { worksheet, past } = get();
  const nextPast = [...past, worksheet].slice(-HISTORY_LIMIT);
  const next = mutate(worksheet);
  set({
    worksheet: { ...next, updatedAt: Date.now() },
    past: nextPast,
    future: [],
    isDirty: true,
  });
}

export const useWorksheetStore = create<WorksheetStoreState>((set, get) => ({
  worksheet: createDefaultWorksheet(),
  past: [],
  future: [],
  isDirty: false,
  lastSavedAt: null,
  currentSavedId: null,
  eraserMode: false,

  addItems: (items) =>
    commit(set, get, (w) => ({
      ...w,
      items: [...w.items, ...items.map((it) => ({ ...it, id: makeId("item") }))],
    })),

  removeItem: (id) =>
    commit(set, get, (w) => ({
      ...w,
      items: w.items.filter((it) => it.id !== id),
      selectedItemId: w.selectedItemId === id ? null : w.selectedItemId,
    })),

  removeLast: () =>
    commit(set, get, (w) => ({ ...w, items: w.items.slice(0, -1) })),

  removeCategory: (category) =>
    commit(set, get, (w) => ({ ...w, items: w.items.filter((it) => it.category !== category) })),

  clearItems: () =>
    commit(set, get, (w) => ({ ...w, items: [], selectedItemId: null })),

  resetWorksheet: () => {
    const settings = getSettings();
    const fresh: Worksheet = {
      ...createDefaultWorksheet(),
      schoolName: settings.defaultSchoolName,
      orientation: settings.defaultOrientation,
      margins: settings.defaultMargins,
      style: settings.defaultStyle,
      inkSaver: settings.defaultInkSaver,
    };
    set({ worksheet: fresh, past: [], future: [], isDirty: false, currentSavedId: null, lastSavedAt: null });
  },

  setSelected: (id) => set((s) => ({ worksheet: { ...s.worksheet, selectedItemId: id } })),

  duplicateSelected: () =>
    commit(set, get, (w) => {
      const target = w.items.find((it) => it.id === w.selectedItemId);
      if (!target) return w;
      const copy: WorksheetItem = { ...target, id: makeId("item") };
      return { ...w, items: [...w.items, copy], selectedItemId: copy.id };
    }),

  deleteSelected: () =>
    commit(set, get, (w) => ({
      ...w,
      items: w.items.filter((it) => it.id !== w.selectedItemId),
      selectedItemId: null,
    })),

  resizeSelected: (delta) =>
    commit(set, get, (w) => {
      const page = getPageSizeMm(w.orientation);
      const margin = MARGIN_MM[w.margins];
      const printableW = page.width - margin * 2;
      const printableH = page.height - margin * 2;
      // Approximate current cell from itemSize slider (10–62mm).
      const cellApprox = 10 + (Math.max(0, Math.min(100, w.itemSize)) / 100) * 52;

      return {
        ...w,
        items: w.items.map((it) => {
          if (it.id !== w.selectedItemId) return it;
          const current = it.scale ?? 1;
          // Images can grow up to full printable area; other items stay modest.
          const maxScale =
            it.category === "image"
              ? Math.max(2, Math.min(printableW, printableH) / Math.max(8, cellApprox))
              : 2.5;
          return {
            ...it,
            scale: Math.max(0.4, Math.min(maxScale, current + delta)),
          };
        }),
      };
    }),

  updateSettings: (patch) => commit(set, get, (w) => ({ ...w, ...patch })),

  undo: () => {
    const { past, worksheet, future } = get();
    if (past.length === 0) return;
    const previous = past[past.length - 1];
    set({
      worksheet: previous,
      past: past.slice(0, -1),
      future: [worksheet, ...future].slice(0, HISTORY_LIMIT),
      isDirty: true,
    });
  },

  redo: () => {
    const { future, worksheet, past } = get();
    if (future.length === 0) return;
    const next = future[0];
    set({
      worksheet: next,
      future: future.slice(1),
      past: [...past, worksheet].slice(-HISTORY_LIMIT),
      isDirty: true,
    });
  },

  loadWorksheet: (worksheet) =>
    set({
      worksheet: {
        ...worksheet,
        showMarginLines: worksheet.showMarginLines ?? false,
      },
      past: [],
      future: [],
      isDirty: false,
      currentSavedId: worksheet.id,
      lastSavedAt: worksheet.updatedAt,
    }),

  markSaved: (savedId, name) =>
    set((s) => ({
      worksheet: { ...s.worksheet, name },
      isDirty: false,
      lastSavedAt: Date.now(),
      currentSavedId: savedId,
    })),

  setEraserMode: (enabled) => set({ eraserMode: enabled }),
}));
