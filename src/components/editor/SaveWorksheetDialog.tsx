"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface SaveWorksheetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultName: string;
  onConfirm: (name: string) => void;
}

export function SaveWorksheetDialog({ open, onOpenChange, defaultName, onConfirm }: SaveWorksheetDialogProps) {
  const [name, setName] = useState(defaultName);

  useEffect(() => {
    if (open) setName(defaultName);
  }, [open, defaultName]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save worksheet</DialogTitle>
          <DialogDescription>Saved worksheets are stored locally on this device.</DialogDescription>
        </DialogHeader>
        <div className="space-y-1.5">
          <Label htmlFor="worksheet-name">Worksheet name</Label>
          <input
            id="worksheet-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-[#e4d6c3] bg-white px-3 py-2 text-sm text-[#3d3226] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b5652f]"
            autoFocus
          />
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline" size="sm">
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              onConfirm(name.trim() || "Untitled worksheet");
              onOpenChange(false);
            }}
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
