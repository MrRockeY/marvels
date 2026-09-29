import type { ActivityType, ItemCategory, WorksheetItem, WorksheetStyle } from "@/types/worksheet";
import { makeId } from "@/lib/utils";
import { ALL_NUMBERS } from "@/lib/data/numbers";
import { UPPERCASE_LETTERS } from "@/lib/data/alphabet";
import { URDU_LETTERS } from "@/lib/data/urdu";
import { SHAPES } from "@/lib/data/shapes";
import { FRUITS } from "@/lib/data/fruits";
import { ANIMALS } from "@/lib/data/animals";

export interface GeneratorOptions {
  category: ItemCategory;
  activityType: ActivityType;
  style: WorksheetStyle;
  count: number;
}

const CATEGORY_LABEL: Record<ItemCategory, string> = {
  number: "NUMBER",
  letter: "LETTER",
  urdu: "ALIF BAY",
  shape: "SHAPE",
  fruit: "FRUIT",
  animal: "ANIMAL",
  image: "PICTURE",
};

const ACTIVITY_LABEL: Record<ActivityType, string> = {
  tracing: "TRACING",
  coloring: "COLORING",
  counting: "COUNTING",
  matching: "MATCHING",
  "circle-correct": "CIRCLE THE CORRECT ONE",
  "find-letter": "FIND THE LETTER",
  "missing-number": "MISSING NUMBER",
  "missing-letter": "MISSING LETTER",
  "case-matching": "UPPERCASE & LOWERCASE",
  ordering: "ORDERING PRACTICE",
};

function poolFor(category: ItemCategory): string[] {
  switch (category) {
    case "number":
      return ALL_NUMBERS;
    case "letter":
      return UPPERCASE_LETTERS;
    case "urdu":
      return URDU_LETTERS;
    case "shape":
      return SHAPES.map((s) => s.key);
    case "fruit":
      return FRUITS.map((f) => f.key);
    case "animal":
      return ANIMALS.map((a) => a.key);
    default:
      return [];
  }
}

export function generateWorksheet(options: GeneratorOptions): {
  items: WorksheetItem[];
  title: string;
} {
  const pool = poolFor(options.category);
  const count = Math.max(1, Math.min(60, options.count));
  const values: string[] = [];
  for (let i = 0; i < count; i++) {
    values.push(pool[i % pool.length]);
  }

  const items: WorksheetItem[] = values.map((value) => ({
    id: makeId("item"),
    category: options.category,
    value,
  }));

  const title = `${CATEGORY_LABEL[options.category]} ${ACTIVITY_LABEL[options.activityType]}`;

  return { items, title };
}
