"use client";

import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Underline,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { DocumentAlign, DocumentLanguage } from "@/store/documentStore";

function LinedIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className={className}
      aria-hidden
    >
      <path d="M4 6h16M4 10h16M4 14h16M4 18h16" />
    </svg>
  );
}

interface DocumentToolbarProps {
  language: DocumentLanguage;
  fontSize: number;
  lineHeight: number;
  align: DocumentAlign;
  linedPages: boolean;
  onLanguageChange: (lang: DocumentLanguage) => void;
  onFontSizeChange: (size: number) => void;
  onLineHeightChange: (value: number) => void;
  onAlignChange: (align: DocumentAlign) => void;
  onLinedPagesChange: (lined: boolean) => void;
  onFormat: (command: string, value?: string) => void;
}

const ALIGN_BUTTONS: { align: DocumentAlign; icon: typeof AlignLeft; label: string }[] = [
  { align: "left", icon: AlignLeft, label: "Align left" },
  { align: "center", icon: AlignCenter, label: "Align center" },
  { align: "right", icon: AlignRight, label: "Align right" },
  { align: "justify", icon: AlignJustify, label: "Justify" },
];

const ALIGN_COMMAND: Record<DocumentAlign, string> = {
  left: "justifyLeft",
  center: "justifyCenter",
  right: "justifyRight",
  justify: "justifyFull",
};

export function DocumentToolbar({
  language,
  fontSize,
  lineHeight,
  align,
  linedPages,
  onLanguageChange,
  onFontSizeChange,
  onLineHeightChange,
  onAlignChange,
  onLinedPagesChange,
  onFormat,
}: DocumentToolbarProps) {
  return (
    <div className="no-print sticky top-16 z-30 mb-4 rounded-xl border border-blue-100 bg-white/95 p-3 shadow-sm backdrop-blur">
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex rounded-lg border border-slate-200 p-0.5">
          <button
            type="button"
            onClick={() => onLanguageChange("en")}
            className={cn(
              "rounded-md px-3 py-1.5 text-xs font-semibold transition-colors",
              language === "en"
                ? "bg-blue-600 text-white"
                : "text-slate-600 hover:bg-slate-50",
            )}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => onLanguageChange("ur")}
            className={cn(
              "rounded-md px-3 py-1.5 text-xs font-semibold transition-colors",
              language === "ur"
                ? "bg-blue-600 text-white"
                : "text-slate-600 hover:bg-slate-50",
            )}
            lang="ur"
          >
            اردو
          </button>
        </div>

        <div className="mx-1 hidden h-6 w-px bg-slate-200 sm:block" />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Bold"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => onFormat("bold")}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Italic"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => onFormat("italic")}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Underline"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => onFormat("underline")}
        >
          <Underline className="h-4 w-4" />
        </Button>

        <div className="mx-1 hidden h-6 w-px bg-slate-200 sm:block" />

        {ALIGN_BUTTONS.map(({ align: value, icon: Icon, label }) => (
          <Button
            key={value}
            type="button"
            variant={align === value ? "secondary" : "ghost"}
            size="icon"
            aria-label={label}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              onAlignChange(value);
              onFormat(ALIGN_COMMAND[value]);
            }}
          >
            <Icon className="h-4 w-4" />
          </Button>
        ))}

        <div className="mx-1 hidden h-6 w-px bg-slate-200 sm:block" />

        <label className="flex items-center gap-1.5 text-xs text-slate-600">
          Size
          <select
            value={fontSize}
            onChange={(e) => onFontSizeChange(Number(e.target.value))}
            className="h-8 rounded-md border border-slate-200 bg-white px-2 text-xs"
          >
            {[14, 16, 18, 20, 22, 24, 28, 32, 36].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-1.5 text-xs text-slate-600">
          Spacing
          <select
            value={lineHeight}
            onChange={(e) => onLineHeightChange(Number(e.target.value))}
            className="h-8 rounded-md border border-slate-200 bg-white px-2 text-xs"
          >
            {[1.2, 1.5, 1.8, 2, 2.4, 3].map((value) => (
              <option key={value} value={value}>
                {value.toFixed(1)}
              </option>
            ))}
          </select>
        </label>

        <div className="mx-1 hidden h-6 w-px bg-slate-200 sm:block" />

        <div className="flex items-center gap-2">
          <LinedIcon className="h-4 w-4 text-slate-500" />
          <Label htmlFor="lined-pages" className="text-xs text-slate-600">
            Lined pages
          </Label>
          <Switch
            id="lined-pages"
            checked={linedPages}
            onCheckedChange={onLinedPagesChange}
            className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-slate-200"
          />
        </div>
      </div>
    </div>
  );
}
