import type { WorksheetItem, WorksheetTemplate } from "@/types/worksheet";
import { makeId } from "@/lib/utils";
import { ALL_NUMBERS } from "@/lib/data/numbers";
import { UPPERCASE_LETTERS, LOWERCASE_LETTERS } from "@/lib/data/alphabet";
import { URDU_LETTERS } from "@/lib/data/urdu";
import { SHAPES } from "@/lib/data/shapes";
import { FRUITS } from "@/lib/data/fruits";
import { ANIMALS } from "@/lib/data/animals";

function items(category: WorksheetItem["category"], values: string[]): WorksheetItem[] {
  return values.map((value) => ({ id: makeId("item"), category, value }));
}

export const TEMPLATES: WorksheetTemplate[] = [
  {
    id: "abc-tracing",
    name: "ABC Tracing",
    description: "Full uppercase alphabet in dashed tracing style, four letters per row.",
    category: "letter",
    activityType: "tracing",
    build: () => ({
      title: "LETTER TRACING",
      style: "tracing",
      layoutMode: "4",
      header: { showSchoolName: true, showTitle: true, showName: true, showDate: true },
      items: items("letter", UPPERCASE_LETTERS),
    }),
  },
  {
    id: "123-tracing",
    name: "123 Tracing",
    description: "Numbers 1–10 in tracing style for early number formation.",
    category: "number",
    activityType: "tracing",
    build: () => ({
      title: "NUMBER TRACING",
      style: "tracing",
      layoutMode: "auto",
      header: { showSchoolName: true, showTitle: true, showName: true, showDate: true },
      items: items("number", ALL_NUMBERS.slice(0, 10)),
    }),
  },
  {
    id: "number-recognition",
    name: "Number Recognition",
    description: "Numbers 1–20 rendered solid for recognition and reading practice.",
    category: "number",
    activityType: "counting",
    build: () => ({
      title: "NUMBER RECOGNITION",
      style: "solid",
      layoutMode: "auto",
      header: { showSchoolName: true, showTitle: true, showName: true, showDate: true },
      items: items("number", ALL_NUMBERS.slice(0, 20)),
    }),
  },
  {
    id: "fruit-coloring",
    name: "Fruit Coloring",
    description: "A friendly line-art fruit basket ready for coloring.",
    category: "fruit",
    activityType: "coloring",
    build: () => ({
      title: "COLOR THE FRUITS",
      style: "outline",
      layoutMode: "auto",
      header: { showSchoolName: true, showTitle: true, showName: false, showDate: false },
      items: items(
        "fruit",
        FRUITS.map((f) => f.key),
      ),
    }),
  },
  {
    id: "animal-coloring",
    name: "Animal Coloring",
    description: "A gentle zoo of simple outlined animals for coloring practice.",
    category: "animal",
    activityType: "coloring",
    build: () => ({
      title: "COLOR THE ANIMALS",
      style: "outline",
      layoutMode: "4",
      header: { showSchoolName: true, showTitle: true, showName: false, showDate: false },
      items: items(
        "animal",
        ANIMALS.slice(0, 12).map((a) => a.key),
      ),
    }),
  },
  {
    id: "shapes-coloring",
    name: "Shapes Coloring",
    description: "The ten core Montessori shapes in bold outline form.",
    category: "shape",
    activityType: "coloring",
    build: () => ({
      title: "SHAPES",
      style: "outline",
      layoutMode: "auto",
      header: { showSchoolName: true, showTitle: true, showName: true, showDate: false },
      items: items(
        "shape",
        SHAPES.map((s) => s.key),
      ),
    }),
  },
  {
    id: "alif-bay-practice",
    name: "Alif Bay Practice",
    description: "The complete Urdu alphabet arranged right-to-left for tracing.",
    category: "urdu",
    activityType: "tracing",
    build: () => ({
      title: "الف بے مشق",
      style: "tracing",
      layoutMode: "4",
      header: { showSchoolName: true, showTitle: true, showName: true, showDate: true },
      items: items("urdu", URDU_LETTERS),
    }),
  },
  {
    id: "uppercase-lowercase",
    name: "Uppercase / Lowercase",
    description: "Paired uppercase and lowercase letters for case matching.",
    category: "letter",
    activityType: "case-matching",
    build: () => {
      const pairs = UPPERCASE_LETTERS.flatMap((letter, i) => [letter, LOWERCASE_LETTERS[i]]);
      return {
        title: "UPPERCASE & LOWERCASE",
        style: "solid",
        layoutMode: "4",
        header: { showSchoolName: true, showTitle: true, showName: true, showDate: true },
        items: items("letter", pairs.slice(0, 20)),
      };
    },
  },
  {
    id: "counting-practice",
    name: "Counting Practice",
    description: "Repeated fruit icons grouped for hands-on counting practice.",
    category: "fruit",
    activityType: "counting",
    build: () => ({
      title: "COUNT & WRITE",
      style: "outline",
      layoutMode: "auto",
      header: { showSchoolName: true, showTitle: true, showName: true, showDate: false },
      items: items("fruit", Array(8).fill("apple")),
    }),
  },
];

export function applyTemplate(template: WorksheetTemplate) {
  return template.build();
}
