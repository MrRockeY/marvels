export const ALL_NUMBERS = Array.from({ length: 50 }, (_, i) => String(i + 1));

export const NUMBER_RANGES = [
  { key: "1-10", label: "1 – 10", values: ALL_NUMBERS.slice(0, 10) },
  { key: "1-20", label: "1 – 20", values: ALL_NUMBERS.slice(0, 20) },
  { key: "1-50", label: "1 – 50", values: ALL_NUMBERS.slice(0, 50) },
] as const;
