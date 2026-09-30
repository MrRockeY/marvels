"use client";

import { useState } from "react";
import { useWorksheetStore } from "@/store/worksheetStore";
import { CopiesStepper } from "@/components/editor/CopiesStepper";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; // Assuming you have a Textarea component
import {
  AYAT_UL_KURSI,
  COMPLETE_URDU_SENTENCES,
  COMPLETE_WORDS,
  DUAS,
  KALMAS,
  SHORT_SURAHS,
  TA_AWWUZ,
  TASMIYAH,
  URDU_HAROOF_NO_DOTS,
  URDU_HAROOF_SMALL_FORMS,
} from "@/lib/data/islamicContent";

export function IslamicContentPicker() {
  const addItems = useWorksheetStore((s) => s.addItems);
  const removeCategory = useWorksheetStore((s) => s.removeCategory);
  const [copies, setCopies] = useState(1);
  const [customText, setCustomText] = useState("");

  const addContent = (value: string) => {
    const toAdd = Array.from({ length: copies }, () => ({
      category: "islamic-text" as const,
      value,
    }));
    addItems(toAdd);
  };

  const addCustomText = () => {
    if (customText.trim()) {
      addContent(customText);
      setCustomText("");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <CopiesStepper value={copies} onChange={setCopies} />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            removeCategory("islamic-text");
            removeCategory("urdu");
          }}
        >
          Clear Urdu/Arabic
        </Button>
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-medium text-slate-700">Common Phrases</Label>
        <div className="flex flex-wrap gap-2" dir="rtl" lang="ar">
          <Button variant="secondary" size="sm" onClick={() => addContent(TA_AWWUZ)}>
            {TA_AWWUZ}
          </Button>
          <Button variant="secondary" size="sm" onClick={() => addContent(TASMIYAH)}>
            {TASMIYAH}
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-medium text-slate-700">6 Kalmas</Label>
        <div className="flex flex-wrap gap-2" dir="rtl" lang="ar">
          {KALMAS.map((kalma) => (
            <Button key={kalma.name} variant="secondary" size="sm" onClick={() => addContent(kalma.arabic)}>
              {kalma.name}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-medium text-slate-700">Ayat-ul-Kursi</Label>
        <div className="flex flex-wrap gap-2" dir="rtl" lang="ar">
          <Button variant="secondary" size="sm" onClick={() => addContent(AYAT_UL_KURSI.arabic)}>
            Ayat-ul-Kursi
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-medium text-slate-700">Short Surahs</Label>
        <div className="flex flex-wrap gap-2" dir="rtl" lang="ar">
          {SHORT_SURAHS.map((surah) => (
            <Button key={surah.name} variant="secondary" size="sm" onClick={() => addContent(surah.arabic)}>
              {surah.name}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-medium text-slate-700">Duas</Label>
        <div className="flex flex-wrap gap-2" dir="rtl" lang="ar">
          {DUAS.map((dua) => (
            <Button key={dua.name} variant="secondary" size="sm" onClick={() => addContent(dua.arabic)}>
              {dua.name}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-medium text-slate-700">Complete Arabic Words</Label>
        <div className="flex flex-wrap gap-2" dir="rtl" lang="ar">
          {COMPLETE_WORDS.map((word) => (
            <Button key={word.arabic} variant="secondary" size="sm" onClick={() => addContent(word.arabic)}>
              {word.arabic}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-medium text-slate-700">Urdu Small Forms (Haroof-e-Tahajji)</Label>
        <div className="flex flex-wrap gap-2" dir="rtl" lang="ur">
          {URDU_HAROOF_SMALL_FORMS.map((harf) => (
            <Button key={harf.char} variant="secondary" size="sm" onClick={() => addContent(harf.small)}>
              {harf.small}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-medium text-slate-700">Urdu Haroof-e-Tahajji (No Dots)</Label>
        <div className="flex flex-wrap gap-2" dir="rtl" lang="ur">
          {URDU_HAROOF_NO_DOTS.map((harf) => (
            <Button key={harf.char} variant="secondary" size="sm" onClick={() => addContent(harf.noDot)}>
              {harf.char} ({harf.noDot})
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-medium text-slate-700">Complete Urdu Sentences</Label>
        <div className="flex flex-wrap gap-2" dir="rtl" lang="ur">
          {COMPLETE_URDU_SENTENCES.map((sentence) => (
            <Button key={sentence.sentence} variant="secondary" size="sm" onClick={() => addContent(sentence.sentence)}>
              {sentence.sentence}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Label htmlFor="custom-urdu-text" className="text-sm font-medium text-slate-700">Custom Urdu/Arabic Text</Label>
        <Textarea
          id="custom-urdu-text"
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
          placeholder="Type your custom Urdu or Arabic text here..."
          className="min-h-[80px]"
          dir="rtl"
          lang="ar"
        />
        <Button variant="primary" size="sm" onClick={addCustomText} disabled={!customText.trim()}>
          Add Custom Text
        </Button>
      </div>
    </div>
  );
}
