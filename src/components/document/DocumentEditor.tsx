"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { A4_MM } from "@/lib/pageMetrics";
import { useDocumentStore } from "@/store/documentStore";
import { DocumentToolbar } from "@/components/document/DocumentToolbar";
import { DocumentUrduKeyboard } from "@/components/document/DocumentUrduKeyboard";
import { cn } from "@/lib/utils";

const PX_PER_MM = 96 / 25.4;
const PAGE_WIDTH_PX = A4_MM.width * PX_PER_MM;
const PAGE_HEIGHT_PX = A4_MM.height * PX_PER_MM;
const PAGE_PADDING_MM = 20;
const PAGE_PADDING_PX = PAGE_PADDING_MM * PX_PER_MM;

export function DocumentEditor() {
  const language = useDocumentStore((s) => s.language);
  const title = useDocumentStore((s) => s.title);
  const html = useDocumentStore((s) => s.html);
  const fontSize = useDocumentStore((s) => s.fontSize);
  const lineHeight = useDocumentStore((s) => s.lineHeight);
  const align = useDocumentStore((s) => s.align);
  const linedPages = useDocumentStore((s) => s.linedPages);

  const setLanguage = useDocumentStore((s) => s.setLanguage);
  const setTitle = useDocumentStore((s) => s.setTitle);
  const setHtml = useDocumentStore((s) => s.setHtml);
  const setFontSize = useDocumentStore((s) => s.setFontSize);
  const setLineHeight = useDocumentStore((s) => s.setLineHeight);
  const setAlign = useDocumentStore((s) => s.setAlign);
  const setLinedPages = useDocumentStore((s) => s.setLinedPages);
  const hydrateFromStorage = useDocumentStore((s) => s.hydrateFromStorage);

  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const skipSyncRef = useRef(false);

  const isUrdu = language === "ur";
  const fontFamily = isUrdu
    ? "'Noto Nastaliq Urdu', serif"
    : "'Georgia', 'Times New Roman', Times, serif";

  useEffect(() => {
    hydrateFromStorage();
  }, [hydrateFromStorage]);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const width = el.clientWidth;
      setScale(Math.max(0.2, Math.min(1, (width - 8) / PAGE_WIDTH_PX)));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;
    if (skipSyncRef.current) {
      skipSyncRef.current = false;
      return;
    }
    if (editor.innerHTML !== html) {
      editor.innerHTML = html;
    }
  }, [html]);

  const updatePageCount = useCallback(() => {
    const editor = editorRef.current;
    if (!editor) return;
    const contentHeight = editor.scrollHeight;
    const usable = PAGE_HEIGHT_PX - PAGE_PADDING_PX * 2;
    setPageCount(Math.max(1, Math.ceil(contentHeight / usable)));
  }, []);

  useEffect(() => {
    updatePageCount();
  }, [html, fontSize, lineHeight, language, updatePageCount]);

  const handleInput = () => {
    const editor = editorRef.current;
    if (!editor) return;
    skipSyncRef.current = true;
    setHtml(editor.innerHTML, true);
    updatePageCount();
  };

  const runFormat = (command: string, value?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
    handleInput();
  };

  const insertText = (value: string) => {
    const editor = editorRef.current;
    if (!editor) return;
    editor.focus();
    if (value === "\n") {
      document.execCommand("insertParagraph");
    } else {
      document.execCommand("insertText", false, value);
    }
    handleInput();
  };

  const deleteBackward = () => {
    editorRef.current?.focus();
    document.execCommand("delete");
    handleInput();
  };

  const lineStepPx = fontSize * lineHeight;

  return (
    <div className="w-full">
      <DocumentToolbar
        language={language}
        fontSize={fontSize}
        lineHeight={lineHeight}
        align={align}
        linedPages={linedPages}
        onLanguageChange={setLanguage}
        onFontSizeChange={setFontSize}
        onLineHeightChange={setLineHeight}
        onAlignChange={setAlign}
        onLinedPagesChange={setLinedPages}
        onFormat={runFormat}
      />

      <div className="no-print mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={isUrdu ? "دستاویز کا عنوان" : "Document title"}
          dir={isUrdu ? "rtl" : "ltr"}
          lang={isUrdu ? "ur" : "en"}
          className="w-full rounded-lg border border-blue-100 bg-white px-4 py-2.5 text-base font-semibold text-slate-800 outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
          style={{ fontFamily: isUrdu ? "'Noto Nastaliq Urdu', serif" : undefined }}
        />
      </div>

      <div ref={containerRef} className="flex w-full flex-col items-center gap-6">
        <div
          className="preview-wrapper relative"
          style={{
            width: PAGE_WIDTH_PX * scale,
            height: PAGE_HEIGHT_PX * pageCount * scale + (pageCount - 1) * 16 * scale,
          }}
        >
          <div
            className="preview-scale absolute left-0 top-0 origin-top-left"
            style={{ transform: `scale(${scale})` }}
          >
            <div
              id="print-area"
              className="document-print-area relative bg-white"
              style={{
                width: PAGE_WIDTH_PX,
                minHeight: PAGE_HEIGHT_PX * pageCount,
              }}
            >
              {/* Page backgrounds + lined overlays */}
              {Array.from({ length: pageCount }).map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "pointer-events-none absolute left-0 bg-white shadow-[0_2px_10px_rgba(60,45,25,0.08),0_18px_45px_rgba(60,45,25,0.14)]",
                    index > 0 && "border-t border-dashed border-slate-200",
                  )}
                  style={{
                    top: index * PAGE_HEIGHT_PX,
                    width: PAGE_WIDTH_PX,
                    height: PAGE_HEIGHT_PX,
                  }}
                  aria-hidden
                >
                  {linedPages && (
                    <div
                      className="absolute inset-0"
                      style={{
                        padding: PAGE_PADDING_PX,
                        backgroundImage: `repeating-linear-gradient(
                          to bottom,
                          transparent 0,
                          transparent calc(${lineStepPx}px - 1px),
                          rgba(148, 163, 184, 0.35) calc(${lineStepPx}px - 1px),
                          rgba(148, 163, 184, 0.35) ${lineStepPx}px
                        )`,
                        backgroundClip: "content-box",
                      }}
                    />
                  )}
                  <span className="no-print absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] text-slate-400">
                    Page {index + 1}
                  </span>
                </div>
              ))}

              <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                role="textbox"
                aria-multiline="true"
                aria-label={isUrdu ? "Urdu document editor" : "English document editor"}
                data-placeholder={
                  isUrdu
                    ? "یہاں لکھنا شروع کریں…"
                    : "Start writing your document here…"
                }
                dir={isUrdu ? "rtl" : "ltr"}
                lang={isUrdu ? "ur" : "en"}
                spellCheck
                onInput={handleInput}
                onBlur={handleInput}
                className="document-editor relative z-10 outline-none"
                style={{
                  minHeight: PAGE_HEIGHT_PX - PAGE_PADDING_PX * 2,
                  padding: PAGE_PADDING_PX,
                  fontSize,
                  lineHeight,
                  textAlign: align,
                  fontFamily,
                  color: "#1e293b",
                  wordBreak: "break-word",
                }}
              />
            </div>
          </div>
        </div>

        {isUrdu && (
          <div className="w-full max-w-3xl">
            <DocumentUrduKeyboard onInsert={insertText} onDelete={deleteBackward} />
          </div>
        )}
      </div>
    </div>
  );
}
