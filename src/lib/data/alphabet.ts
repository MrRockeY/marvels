export const UPPERCASE_LETTERS = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(65 + i),
);
export const LOWERCASE_LETTERS = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(97 + i),
);

export type LetterCase = "upper" | "lower" | "both";

export const LETTER_CASE_OPTIONS: { key: LetterCase; label: string }[] = [
  { key: "upper", label: "Uppercase" },
  { key: "lower", label: "Lowercase" },
  { key: "both", label: "Upper + lower" },
];
