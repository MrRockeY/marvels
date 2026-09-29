import type { DocumentLanguage, DocumentAlign } from "@/store/documentStore";

const DOCUMENT_STORAGE_KEY = "marvels-document-v1";

export interface SavedDocumentPayload {
  title: string;
  html: string;
  language: DocumentLanguage;
  fontSize: number;
  lineHeight: number;
  align: DocumentAlign;
  linedPages: boolean;
  updatedAt: string;
}

export function loadSavedDocument(): SavedDocumentPayload | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(DOCUMENT_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SavedDocumentPayload;
  } catch {
    return null;
  }
}

export function saveDocumentLocally(payload: Omit<SavedDocumentPayload, "updatedAt">) {
  const record: SavedDocumentPayload = {
    ...payload,
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(DOCUMENT_STORAGE_KEY, JSON.stringify(record));
  return record;
}
