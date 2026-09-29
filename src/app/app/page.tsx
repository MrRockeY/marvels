"use client";

import { useState } from "react";
import { Download, Printer } from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { EditorSidebar } from "@/components/editor/EditorSidebar";
import type { CategoryKey } from "@/components/editor/CategoryPanel";
import { A4Preview } from "@/components/preview/A4Preview";
import { DocumentEditor } from "@/components/document/DocumentEditor";
import { EmptyState } from "@/components/EmptyState";
import { SaveWorksheetDialog } from "@/components/editor/SaveWorksheetDialog";
import { PrintStyleInjector } from "@/components/preview/PrintStyleInjector";
import { Button } from "@/components/ui/button";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { useWorksheetStore } from "@/store/worksheetStore";
import { useDocumentStore } from "@/store/documentStore";
import { upsertSavedWorksheet } from "@/lib/storage";
import { saveDocumentLocally } from "@/lib/documentStorage";

export default function StudioPage() {
  const worksheet = useWorksheetStore((s) => s.worksheet);
  const isDirty = useWorksheetStore((s) => s.isDirty);
  const canUndo = useWorksheetStore((s) => s.past.length > 0);
  const canRedo = useWorksheetStore((s) => s.future.length > 0);
  const undo = useWorksheetStore((s) => s.undo);
  const redo = useWorksheetStore((s) => s.redo);
  const markSaved = useWorksheetStore((s) => s.markSaved);

  const studioMode = useDocumentStore((s) => s.studioMode);
  const documentDirty = useDocumentStore((s) => s.isDirty);
  const documentCanUndo = useDocumentStore((s) => s.past.length > 0);
  const documentCanRedo = useDocumentStore((s) => s.future.length > 0);
  const documentUndo = useDocumentStore((s) => s.undo);
  const documentRedo = useDocumentStore((s) => s.redo);
  const documentMarkSaved = useDocumentStore((s) => s.markSaved);
  const documentTitle = useDocumentStore((s) => s.title);
  const documentLanguage = useDocumentStore((s) => s.language);
  const documentHtml = useDocumentStore((s) => s.html);
  const documentFontSize = useDocumentStore((s) => s.fontSize);
  const documentLineHeight = useDocumentStore((s) => s.lineHeight);
  const documentAlign = useDocumentStore((s) => s.align);
  const documentLinedPages = useDocumentStore((s) => s.linedPages);

  const [activeCategory, setActiveCategory] = useState<CategoryKey | null>(null);
  const [saveOpen, setSaveOpen] = useState(false);
  const [started, setStarted] = useState(false);

  const isDocumentMode = studioMode === "document";
  const handlePrint = () => window.print();

  const handleSaveConfirm = (name: string) => {
    if (isDocumentMode) {
      saveDocumentLocally({
        title: name || documentTitle,
        html: documentHtml,
        language: documentLanguage,
        fontSize: documentFontSize,
        lineHeight: documentLineHeight,
        align: documentAlign,
        linedPages: documentLinedPages,
      });
      useDocumentStore.getState().setTitle(name || documentTitle);
      documentMarkSaved();
      return;
    }
    const record = upsertSavedWorksheet(worksheet, name);
    markSaved(record.id, name);
  };

  const showEmptyState = worksheet.items.length === 0 && !started;

  return (
    <RequireAuth>
      <div className="min-h-screen bg-[#f8fbff]">
        <PrintStyleInjector orientation="portrait" />
        <TopBar
          showWordToggle
          editorActions={{
            canUndo: isDocumentMode ? documentCanUndo : canUndo,
            canRedo: isDocumentMode ? documentCanRedo : canRedo,
            onUndo: isDocumentMode ? documentUndo : undo,
            onRedo: isDocumentMode ? documentRedo : redo,
            onSave: () => setSaveOpen(true),
            onPrint: handlePrint,
            isDirty: isDocumentMode ? documentDirty : isDirty,
          }}
        />

        <main className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6">
          {isDocumentMode ? (
            <section className="preview-column min-w-0">
              <div className="no-print mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h1 className="text-lg font-semibold text-[#1e293b]">Word Document</h1>
                  <p className="text-xs text-[#64748b]">
                    {documentLanguage === "ur" ? "Urdu (RTL)" : "English (LTR)"} · lined A4 pages ·
                    type freely like Microsoft Word
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handlePrint}>
                    <Download className="h-4 w-4" />
                    Download PDF
                  </Button>
                  <Button variant="primary" size="sm" onClick={handlePrint}>
                    <Printer className="h-4 w-4" />
                    Print Document
                  </Button>
                </div>
              </div>
              <DocumentEditor />
            </section>
          ) : (
            <div className="studio-grid flex flex-col gap-6 lg:flex-row lg:items-start">
              <EditorSidebar
                activeCategory={activeCategory}
                onCategoryToggle={(key) => {
                  setActiveCategory((prev) => (prev === key ? null : key));
                  setStarted(true);
                }}
              />

              <section className="preview-column min-w-0 flex-1">
                <div className="no-print mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h1 className="text-lg font-semibold text-[#1e293b]">A4 Live Preview</h1>
                    <p className="text-xs text-[#64748b]">
                      {worksheet.orientation === "portrait" ? "Portrait" : "Landscape"} ·{" "}
                      {worksheet.items.length} item{worksheet.items.length === 1 ? "" : "s"} · layout:{" "}
                      {worksheet.layoutMode}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handlePrint}>
                      <Download className="h-4 w-4" />
                      Download PDF
                    </Button>
                    <Button variant="primary" size="sm" onClick={handlePrint}>
                      <Printer className="h-4 w-4" />
                      Print Worksheet
                    </Button>
                  </div>
                </div>

                {showEmptyState ? (
                  <EmptyState
                    onStart={() => {
                      setStarted(true);
                      setActiveCategory("letter");
                    }}
                    onQuickCategory={(category) => {
                      setStarted(true);
                      setActiveCategory(category as CategoryKey);
                    }}
                  />
                ) : (
                  <A4Preview worksheet={worksheet} />
                )}
              </section>
            </div>
          )}
        </main>

        <SaveWorksheetDialog
          open={saveOpen}
          onOpenChange={setSaveOpen}
          defaultName={isDocumentMode ? documentTitle : worksheet.name}
          onConfirm={handleSaveConfirm}
        />
      </div>
    </RequireAuth>
  );
}
