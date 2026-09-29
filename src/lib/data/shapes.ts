export type ShapeKey =
  | "circle"
  | "square"
  | "triangle"
  | "rectangle"
  | "star"
  | "heart"
  | "oval"
  | "diamond"
  | "pentagon"
  | "hexagon";

export const SHAPES: { key: ShapeKey; label: string }[] = [
  { key: "circle", label: "Circle" },
  { key: "square", label: "Square" },
  { key: "triangle", label: "Triangle" },
  { key: "rectangle", label: "Rectangle" },
  { key: "star", label: "Star" },
  { key: "heart", label: "Heart" },
  { key: "oval", label: "Oval" },
  { key: "diamond", label: "Diamond" },
  { key: "pentagon", label: "Pentagon" },
  { key: "hexagon", label: "Hexagon" },
];
