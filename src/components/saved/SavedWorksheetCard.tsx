"use client";

import { useState } from "react";
import { Check, Copy, Pencil, Trash2 } from "lucide-react";
import type { SavedWorksheetRecord } from "@/types/worksheet";
import { A4Preview } from "@/components/preview/A4Preview";
import { getPageSizeMm } from "@/lib/pageMetrics";
import { Button } from "@/components/ui/button";

interface SavedWorksheetCardProps {
  record: SavedWorksheetRecord;
  onOpen: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onRename: (name: string) => void;
}

export function SavedWorksheetCard({ record, onOpen, onDuplicate, onDelete, onRename }: SavedWorksheetCardProps) {
  const [renaming, setRenaming] = useState(false);
  const [name, setName] = useState(record.name);
  const page = getPageSizeMm(record.worksheet.orientation);

  const modified = new Date(record.updatedAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-[#e9ded0] bg-white shadow-[0_1px_2px_rgba(60,45,25,0.04)] transition-shadow hover:shadow-[0_8px_24px_rgba(60,45,25,0.08)]">
      <button
        onClick={onOpen}
        className="flex items-center justify-center overflow-hidden bg-[#f4ede4] p-4"
        style={{ aspectRatio: `${page.width + 20} / ${page.height + 20}` }}
        aria-label={`Open ${record.name}`}
      >
        <div className="pointer-events-none w-full origin-top scale-[0.98]">
          <A4Preview worksheet={record.worksheet} />
        </div>
      </button>

      <div className="flex flex-1 flex-col gap-2 p-4">
        {renaming ? (
          <div className="flex items-center gap-1.5">
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onRename(name.trim() || record.name);
                  setRenaming(false);
                }
              }}
              className="w-full rounded-md border border-[#e4d6c3] px-2 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b5652f]"
            />
            <button
              onClick={() => {
                onRename(name.trim() || record.name);
                setRenaming(false);
              }}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[#4c7a4c] hover:bg-[#eef4ee]"
              aria-label="Confirm rename"
            >
              <Check className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <h3 className="truncate text-sm font-semibold text-[#2b2117]">{record.name}</h3>
        )}
        <p className="text-xs text-[#a3947c]">
          Last modified {modified} · {record.worksheet.items.length} items
        </p>

        <div className="mt-auto flex items-center gap-1.5 pt-2">
          <Button variant="secondary" size="sm" onClick={onOpen} className="flex-1">
            Open
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={onDuplicate} aria-label="Duplicate">
            <Copy className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => setRenaming(true)}
            aria-label="Rename"
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 text-[#b03a2e] hover:bg-[#fbeceb]"
            onClick={onDelete}
            aria-label="Delete"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

