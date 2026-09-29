"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, LayoutGrid, Redo2, Undo2, Printer, Save, Check, CircleDot } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useDocumentStore } from "@/store/documentStore";

const NAV_LINKS = [
  { href: "/app", label: "Studio" },
  { href: "/saved", label: "Saved" },
  { href: "/templates", label: "Templates" },
  { href: "/settings", label: "Settings" },
];

interface TopBarProps {
  editorActions?: {
    canUndo: boolean;
    canRedo: boolean;
    onUndo: () => void;
    onRedo: () => void;
    onSave: () => void;
    onPrint: () => void;
    isDirty: boolean;
  };
  showWordToggle?: boolean;
}

export function TopBar({ editorActions, showWordToggle = false }: TopBarProps) {
  const pathname = usePathname();
  const studioMode = useDocumentStore((s) => s.studioMode);
  const toggleStudioMode = useDocumentStore((s) => s.toggleStudioMode);
  const isDocumentMode = studioMode === "document";

  return (
    <header className="no-print sticky top-0 z-40 border-b border-blue-100 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center gap-4 px-4 sm:px-6">
        <Link href="/app" className="flex shrink-0 items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-semibold text-white shadow-md shadow-blue-200">
            M
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="text-[13px] font-semibold tracking-wide text-slate-900">
              MARVELS School
            </span>
            <span className="text-[11px] text-slate-500">
              {isDocumentMode ? "Word Document" : "Worksheet Studio"}
            </span>
          </span>
        </Link>

        <nav className="ml-2 hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-blue-100 text-blue-700"
                    : "text-slate-600 hover:bg-blue-50 hover:text-blue-700",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {editorActions && (
            <>
              <span className="mr-1 hidden items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs text-blue-700 sm:flex">
                {editorActions.isDirty ? (
                  <>
                    <CircleDot className="h-3 w-3 text-blue-600" />
                    Unsaved changes
                  </>
                ) : (
                  <>
                    <Check className="h-3 w-3 text-emerald-600" />
                    Saved locally
                  </>
                )}
              </span>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={editorActions.onUndo}
                    disabled={!editorActions.canUndo}
                    aria-label="Undo"
                  >
                    <Undo2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Undo</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={editorActions.onRedo}
                    disabled={!editorActions.canRedo}
                    aria-label="Redo"
                  >
                    <Redo2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Redo</TooltipContent>
              </Tooltip>

              <Button variant="secondary" size="sm" onClick={editorActions.onSave}>
                <Save className="h-4 w-4" />
                <span className="hidden sm:inline">Save</span>
              </Button>

              <Button variant="primary" size="sm" onClick={editorActions.onPrint}>
                <Printer className="h-4 w-4" />
                <span>Print</span>
              </Button>
            </>
          )}

          {showWordToggle && (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={toggleStudioMode}
                  aria-pressed={isDocumentMode}
                  aria-label={isDocumentMode ? "Switch to worksheet mode" : "Switch to Word document mode"}
                  className={cn(
                    "ml-1 flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all",
                    isDocumentMode
                      ? "border-indigo-300 bg-indigo-600 text-white shadow-sm shadow-indigo-200"
                      : "border-blue-200 bg-white text-blue-700 hover:border-blue-300 hover:bg-blue-50",
                  )}
                >
                  {isDocumentMode ? (
                    <>
                      <LayoutGrid className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">Worksheet</span>
                    </>
                  ) : (
                    <>
                      <FileText className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">Word</span>
                    </>
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                {isDocumentMode ? "Back to worksheet studio" : "Open Word-like document editor"}
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>
    </header>
  );
}
