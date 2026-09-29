export type FruitKey =
  | "apple"
  | "mango"
  | "banana"
  | "orange"
  | "grapes"
  | "guava"
  | "pomegranate"
  | "strawberry"
  | "watermelon"
  | "pineapple";

export const FRUITS: { key: FruitKey; label: string }[] = [
  { key: "apple", label: "Apple" },
  { key: "mango", label: "Mango" },
  { key: "banana", label: "Banana" },
  { key: "orange", label: "Orange" },
  { key: "grapes", label: "Grapes" },
  { key: "guava", label: "Guava" },
  { key: "pomegranate", label: "Pomegranate" },
  { key: "strawberry", label: "Strawberry" },
  { key: "watermelon", label: "Watermelon" },
  { key: "pineapple", label: "Pineapple" },
];
