"use client";

import { create } from "zustand";
import { loadSavedDocument } from "@/lib/documentStorage";

export type StudioMode = "worksheet" | "document";
export type DocumentLanguage = "en" | "ur";
export type DocumentAlign = "left" | "center" | "right" | "justify";

export interface DocumentState {
  studioMode: StudioMode;
  language: DocumentLanguage;
  title: string;
  html: string;
  fontSize: number;
  lineHeight: number;
  align: DocumentAlign;
  linedPages: boolean;
  isDirty: boolean;
  hydrated: boolean;
  past: string[];
  future: string[];

  hydrateFromStorage: () => void;
  setStudioMode: (mode: StudioMode) => void;
  toggleStudioMode: () => void;
  setLanguage: (language: DocumentLanguage) => void;
  setTitle: (title: string) => void;
  setHtml: (html: string, pushHistory?: boolean) => void;
  setFontSize: (size: number) => void;
  setLineHeight: (value: number) => void;
  setAlign: (align: DocumentAlign) => void;
  setLinedPages: (lined: boolean) => void;
  markSaved: () => void;
  undo: () => void;
  redo: () => void;
}

const EMPTY_HTML = "<p><br></p>";
const MAX_HISTORY = 40;

export const useDocumentStore = create<DocumentState>((set, get) => ({
  studioMode: "worksheet",
  language: "en",
  title: "Untitled Document",
  html: EMPTY_HTML,
  fontSize: 18,
  lineHeight: 1.8,
  align: "left",
  linedPages: true,
  isDirty: false,
  hydrated: false,
  past: [],
  future: [],

  hydrateFromStorage: () => {
    if (get().hydrated) return;
    const saved = loadSavedDocument();
    if (!saved) {
      set({ hydrated: true });
      return;
    }
    set({
      title: saved.title,
      html: saved.html || EMPTY_HTML,
      language: saved.language,
      fontSize: saved.fontSize,
      lineHeight: saved.lineHeight,
      align: saved.align,
      linedPages: saved.linedPages,
      isDirty: false,
      hydrated: true,
    });
  },

  setStudioMode: (mode) => set({ studioMode: mode }),

  toggleStudioMode: () =>
    set((s) => ({
      studioMode: s.studioMode === "worksheet" ? "document" : "worksheet",
    })),

  setLanguage: (language) =>
    set((s) => ({
      language,
      align: language === "ur" ? "right" : s.align === "right" ? "left" : s.align,
      isDirty: true,
    })),

  setTitle: (title) => set({ title, isDirty: true }),

  setHtml: (html, pushHistory = true) => {
    const current = get().html;
    if (html === current) return;
    if (pushHistory) {
      const past = [...get().past, current].slice(-MAX_HISTORY);
      set({ html, past, future: [], isDirty: true });
    } else {
      set({ html, isDirty: true });
    }
  },

  setFontSize: (fontSize) => set({ fontSize, isDirty: true }),
  setLineHeight: (lineHeight) => set({ lineHeight, isDirty: true }),
  setAlign: (align) => set({ align, isDirty: true }),
  setLinedPages: (linedPages) => set({ linedPages }),
  markSaved: () => set({ isDirty: false }),

  undo: () => {
    const { past, html, future } = get();
    if (past.length === 0) return;
    const previous = past[past.length - 1];
    set({
      html: previous,
      past: past.slice(0, -1),
      future: [html, ...future].slice(0, MAX_HISTORY),
      isDirty: true,
    });
  },

  redo: () => {
    const { past, html, future } = get();
    if (future.length === 0) return;
    const next = future[0];
    set({
      html: next,
      past: [...past, html].slice(-MAX_HISTORY),
      future: future.slice(1),
      isDirty: true,
    });
  },
}));
