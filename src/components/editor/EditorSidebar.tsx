"use client";

import { Eraser, ListRestart, RotateCcw, Trash2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CategoryPanel, type CategoryKey } from "@/components/editor/CategoryPanel";
import { GeneratorDialog } from "@/components/editor/GeneratorDialog";
import { StyleControls } from "@/components/editor/StyleControls";
import { LayoutControls } from "@/components/editor/LayoutControls";
import { PageControls } from "@/components/editor/PageControls";
import { HeaderControls } from "@/components/editor/HeaderControls";
import { useWorksheetStore } from "@/store/worksheetStore";

interface EditorSidebarProps {
  activeCategory: CategoryKey | null;
  onCategoryToggle: (key: CategoryKey) => void;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#a3947c]">
      {children}
    </p>
  );
}

export function EditorSidebar({ activeCategory, onCategoryToggle }: EditorSidebarProps) {
  const removeLast = useWorksheetStore((s) => s.removeLast);
  const clearItems = useWorksheetStore((s) => s.clearItems);
  const resetWorksheet = useWorksheetStore((s) => s.resetWorksheet);
  const itemCount = useWorksheetStore((s) => s.worksheet.items.length);
  const eraserMode = useWorksheetStore((s) => s.eraserMode);
  const setEraserMode = useWorksheetStore((s) => s.setEraserMode);

  return (
    <aside className="no-print flex w-full flex-col gap-4 lg:w-[340px] lg:shrink-0">
      <GeneratorDialog />

      <Tabs defaultValue="content">
        <TabsList className="w-full">
          <TabsTrigger value="content" className="flex-1">
            Add content
          </TabsTrigger>
          <TabsTrigger value="design" className="flex-1">
            Design &amp; layout
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content">
          <CategoryPanel active={activeCategory} onToggle={onCategoryToggle} />
        </TabsContent>

        <TabsContent value="design" className="space-y-6">
          <div>
            <SectionLabel>Style</SectionLabel>
            <StyleControls />
          </div>
          <div className="border-t border-[#f0e6d8] pt-5">
            <SectionLabel>Layout &amp; spacing</SectionLabel>
            <LayoutControls />
          </div>
          <div className="border-t border-[#f0e6d8] pt-5">
            <SectionLabel>Page</SectionLabel>
            <PageControls />
          </div>
          <div className="border-t border-[#f0e6d8] pt-5">
            <SectionLabel>Header</SectionLabel>
            <HeaderControls />
          </div>
        </TabsContent>
      </Tabs>

      <div className="rounded-xl border border-[#e9ded0] bg-white/70 p-3">
        <SectionLabel>Editing</SectionLabel>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={removeLast} disabled={itemCount === 0}>
            <RotateCcw className="h-3.5 w-3.5" />
            Remove last
          </Button>
          <Button
            variant={eraserMode ? "primary" : "outline"}
            size="sm"
            onClick={() => setEraserMode(!eraserMode)}
          >
            <Eraser className="h-3.5 w-3.5" />
            Eraser mode
          </Button>
          <Button variant="outline" size="sm" onClick={clearItems} disabled={itemCount === 0}>
            <Trash2 className="h-3.5 w-3.5" />
            Clear worksheet
          </Button>
          <Button variant="ghost" size="sm" onClick={resetWorksheet}>
            <ListRestart className="h-3.5 w-3.5" />
            Reset
          </Button>
        </div>
      </div>
    </aside>
  );
}
