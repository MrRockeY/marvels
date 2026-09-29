import type { SavedWorksheetRecord, UploadedImage, Worksheet } from "@/types/worksheet";
import { makeId } from "@/lib/utils";

const WORKSHEETS_KEY = "marvels.worksheets.v1";
const IMAGES_KEY = "marvels.images.v1";

function isBrowser() {
  return typeof window !== "undefined";
}

function readJson<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full or unavailable — fail silently, this is a local-only MVP feature.
  }
}

// ---------------------------------------------------------------------------
// Saved worksheets
// ---------------------------------------------------------------------------

export function listSavedWorksheets(): SavedWorksheetRecord[] {
  return readJson<SavedWorksheetRecord[]>(WORKSHEETS_KEY, []).sort(
    (a, b) => b.updatedAt - a.updatedAt,
  );
}

export function getSavedWorksheet(id: string): SavedWorksheetRecord | undefined {
  return listSavedWorksheets().find((r) => r.id === id);
}

export function upsertSavedWorksheet(worksheet: Worksheet, name: string): SavedWorksheetRecord {
  const all = readJson<SavedWorksheetRecord[]>(WORKSHEETS_KEY, []);
  const now = Date.now();
  const existingIndex = all.findIndex((r) => r.id === worksheet.id);
  const record: SavedWorksheetRecord = {
    id: worksheet.id,
    name,
    worksheet: { ...worksheet, name, updatedAt: now },
    createdAt: existingIndex >= 0 ? all[existingIndex].createdAt : now,
    updatedAt: now,
  };
  if (existingIndex >= 0) {
    all[existingIndex] = record;
  } else {
    all.push(record);
  }
  writeJson(WORKSHEETS_KEY, all);
  return record;
}

export function deleteSavedWorksheet(id: string) {
  const all = readJson<SavedWorksheetRecord[]>(WORKSHEETS_KEY, []);
  writeJson(
    WORKSHEETS_KEY,
    all.filter((r) => r.id !== id),
  );
}

export function renameSavedWorksheet(id: string, name: string) {
  const all = readJson<SavedWorksheetRecord[]>(WORKSHEETS_KEY, []);
  const next = all.map((r) =>
    r.id === id ? { ...r, name, worksheet: { ...r.worksheet, name }, updatedAt: Date.now() } : r,
  );
  writeJson(WORKSHEETS_KEY, next);
}

export function duplicateSavedWorksheet(id: string): SavedWorksheetRecord | undefined {
  const all = readJson<SavedWorksheetRecord[]>(WORKSHEETS_KEY, []);
  const source = all.find((r) => r.id === id);
  if (!source) return undefined;
  const now = Date.now();
  const newId = makeId("ws");
  const copy: SavedWorksheetRecord = {
    id: newId,
    name: `${source.name} (copy)`,
    worksheet: { ...source.worksheet, id: newId, name: `${source.name} (copy)`, createdAt: now, updatedAt: now },
    createdAt: now,
    updatedAt: now,
  };
  writeJson(WORKSHEETS_KEY, [...all, copy]);
  return copy;
}

// ---------------------------------------------------------------------------
// Uploaded images ("My Images" library)
// ---------------------------------------------------------------------------

export function listUploadedImages(): UploadedImage[] {
  return readJson<UploadedImage[]>(IMAGES_KEY, []).sort((a, b) => b.createdAt - a.createdAt);
}

export function addUploadedImage(name: string, dataUrl: string): UploadedImage {
  const all = readJson<UploadedImage[]>(IMAGES_KEY, []);
  const image: UploadedImage = { id: makeId("img"), name, dataUrl, createdAt: Date.now() };
  writeJson(IMAGES_KEY, [...all, image]);
  return image;
}

export function deleteUploadedImage(id: string) {
  const all = readJson<UploadedImage[]>(IMAGES_KEY, []);
  writeJson(
    IMAGES_KEY,
    all.filter((img) => img.id !== id),
  );
}
