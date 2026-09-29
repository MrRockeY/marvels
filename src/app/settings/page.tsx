"use client";

import { useEffect, useState } from "react";
import { Check, Trash2 } from "lucide-react";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { DEFAULT_SETTINGS, getSettings, saveSettings, type AppSettings } from "@/lib/settings";
import { listSavedWorksheets, listUploadedImages } from "@/lib/storage";

const ORIENTATIONS: { key: AppSettings["defaultOrientation"]; label: string }[] = [
  { key: "portrait", label: "Portrait" },
  { key: "landscape", label: "Landscape" },
];
const MARGINS: { key: AppSettings["defaultMargins"]; label: string }[] = [
  { key: "small", label: "Small" },
  { key: "medium", label: "Medium" },
  { key: "large", label: "Large" },
];
const STYLES: { key: AppSettings["defaultStyle"]; label: string }[] = [
  { key: "solid", label: "Solid" },
  { key: "outline", label: "Outline" },
  { key: "tracing", label: "Tracing" },
];

export default function SettingsPage() {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [saved, setSaved] = useState(false);
  const [counts, setCounts] = useState({ worksheets: 0, images: 0 });

  useEffect(() => {
    setSettings(getSettings());
    setCounts({ worksheets: listSavedWorksheets().length, images: listUploadedImages().length });
  }, []);

  const update = (patch: Partial<AppSettings>) => {
    const next = { ...settings, ...patch };
    setSettings(next);
    saveSettings(next);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1500);
  };

  const clearAll = () => {
    if (!window.confirm("This removes every saved worksheet and uploaded image from this device. Continue?")) return;
    window.localStorage.removeItem("marvels.worksheets.v1");
    window.localStorage.removeItem("marvels.images.v1");
    setCounts({ worksheets: 0, images: 0 });
  };

  return (
    <RequireAuth>
      <AppShell>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-[#2b2117]">Settings</h1>
            <p className="mt-1 text-sm text-[#7a6c58]">
              Defaults applied to new worksheets. Everything is stored locally — no account required.
            </p>
          </div>
          {saved && (
            <span className="flex items-center gap-1.5 rounded-full border border-[#cfe3cf] bg-[#f2f8f2] px-3 py-1 text-xs text-[#3f6b3f]">
              <Check className="h-3.5 w-3.5" /> Saved
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="space-y-5 rounded-2xl border border-[#e9ded0] bg-white p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-[#a3947c]">Worksheet defaults</h2>

            <div className="space-y-1.5">
              <Label htmlFor="school-name">School / brand name</Label>
              <input
                id="school-name"
                value={settings.defaultSchoolName}
                onChange={(e) => update({ defaultSchoolName: e.target.value })}
                className="w-full rounded-lg border border-[#e4d6c3] px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b5652f]"
              />
            </div>

            <div>
              <Label className="mb-1.5 block">Default orientation</Label>
              <div className="grid grid-cols-2 gap-1.5">
                {ORIENTATIONS.map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => update({ defaultOrientation: opt.key })}
                    className={cn(
                      "rounded-lg border px-3 py-1.5 text-xs font-medium",
                      settings.defaultOrientation === opt.key
                        ? "border-[#b5652f] bg-[#f0e4d3] text-[#733d1d]"
                        : "border-[#e4d6c3] bg-white text-[#5c4d3c]",
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label className="mb-1.5 block">Default margins</Label>
              <div className="grid grid-cols-3 gap-1.5">
                {MARGINS.map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => update({ defaultMargins: opt.key })}
                    className={cn(
                      "rounded-lg border px-3 py-1.5 text-xs font-medium",
                      settings.defaultMargins === opt.key
                        ? "border-[#b5652f] bg-[#f0e4d3] text-[#733d1d]"
                        : "border-[#e4d6c3] bg-white text-[#5c4d3c]",
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label className="mb-1.5 block">Default style</Label>
              <div className="grid grid-cols-3 gap-1.5">
                {STYLES.map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => update({ defaultStyle: opt.key })}
                    className={cn(
                      "rounded-lg border px-3 py-1.5 text-xs font-medium",
                      settings.defaultStyle === opt.key
                        ? "border-[#b5652f] bg-[#f0e4d3] text-[#733d1d]"
                        : "border-[#e4d6c3] bg-white text-[#5c4d3c]",
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-[#e4d6c3] px-3 py-2.5">
              <div>
                <Label htmlFor="default-ink">Ink saver by default</Label>
                <p className="text-[11px] text-[#a3947c]">New worksheets start with ink saver enabled</p>
              </div>
              <Switch
                id="default-ink"
                checked={settings.defaultInkSaver}
                onCheckedChange={(v) => update({ defaultInkSaver: v })}
              />
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-2xl border border-[#e9ded0] bg-white p-5">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-[#a3947c]">Local data</h2>
              <p className="mt-2 text-sm text-[#5c4d3c]">
                {counts.worksheets} saved worksheet{counts.worksheets === 1 ? "" : "s"} · {counts.images} uploaded
                image{counts.images === 1 ? "" : "s"}
              </p>
              <p className="mt-1 text-xs text-[#a3947c]">
                All data lives in this browser&apos;s local storage. Clearing it cannot be undone.
              </p>
              <Button variant="destructive" size="sm" className="mt-4" onClick={clearAll}>
                <Trash2 className="h-3.5 w-3.5" />
                Clear all local data
              </Button>
            </div>

            <div className="rounded-2xl border border-[#e9ded0] bg-white p-5">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-[#a3947c]">About</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#5c4d3c]">
                MARVELS Montessori Worksheet Studio runs entirely in your browser — no account or internet
                connection required after the page has loaded. The application is structured so an optional
                account system can be added later without changing how worksheets are built.
              </p>
            </div>
          </div>
        </div>
      </AppShell>
    </RequireAuth>
  );
}
