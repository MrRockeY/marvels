"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FolderOpen } from "lucide-react";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { AppShell } from "@/components/layout/AppShell";
import { SavedWorksheetCard } from "@/components/saved/SavedWorksheetCard";
import { Button } from "@/components/ui/button";
import type { SavedWorksheetRecord } from "@/types/worksheet";
import {
  deleteSavedWorksheet,
  duplicateSavedWorksheet,
  listSavedWorksheets,
  renameSavedWorksheet,
} from "@/lib/storage";
import { useWorksheetStore } from "@/store/worksheetStore";

export default function SavedPage() {
  const [records, setRecords] = useState<SavedWorksheetRecord[] | null>(null);
  const loadWorksheet = useWorksheetStore((s) => s.loadWorksheet);
  const router = useRouter();

  useEffect(() => {
    setRecords(listSavedWorksheets());
  }, []);

  const refresh = () => setRecords(listSavedWorksheets());

  return (
    <RequireAuth>
      <AppShell>
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-[#2b2117]">Saved worksheets</h1>
          <p className="mt-1 text-sm text-[#7a6c58]">
            Everything is stored locally on this device — no account required.
          </p>
        </div>

        {records === null ? null : records.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#e4d6c3] bg-white/60 py-20 text-center">
            <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0e4d3] text-[#8a4a24]">
              <FolderOpen className="h-5 w-5" />
            </span>
            <p className="text-sm font-medium text-[#3d3226]">No saved worksheets yet</p>
            <p className="mt-1 max-w-xs text-xs text-[#a3947c]">
              Create a worksheet in the Studio and click Save to keep it here.
            </p>
            <Button className="mt-5" variant="primary" size="sm" onClick={() => router.push("/app")}>
              Go to Studio
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {records.map((record) => (
              <SavedWorksheetCard
                key={record.id}
                record={record}
                onOpen={() => {
                  loadWorksheet(record.worksheet);
                  router.push("/app");
                }}
                onDuplicate={() => {
                  duplicateSavedWorksheet(record.id);
                  refresh();
                }}
                onDelete={() => {
                  deleteSavedWorksheet(record.id);
                  refresh();
                }}
                onRename={(name) => {
                  renameSavedWorksheet(record.id, name);
                  refresh();
                }}
              />
            ))}
          </div>
        )}
      </AppShell>
    </RequireAuth>
  );
}
