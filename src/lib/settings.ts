export interface AppSettings {
  defaultSchoolName: string;
  defaultOrientation: "portrait" | "landscape";
  defaultMargins: "small" | "medium" | "large";
  defaultStyle: "solid" | "outline" | "tracing";
  defaultInkSaver: boolean;
}

export const DEFAULT_SETTINGS: AppSettings = {
  defaultSchoolName: "MARVELS Montessori",
  defaultOrientation: "portrait",
  defaultMargins: "medium",
  defaultStyle: "solid",
  defaultInkSaver: false,
};

const SETTINGS_KEY = "marvels.settings.v1";

export function getSettings(): AppSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = window.localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: AppSettings) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}
