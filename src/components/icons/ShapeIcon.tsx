import type { ShapeKey } from "@/lib/data/shapes";
import type { IconPaint } from "@/components/icons/paint";

function regularPolygonPoints(sides: number, cx: number, cy: number, r: number, rotateDeg = -90) {
  const pts: string[] = [];
  for (let i = 0; i < sides; i++) {
    const angle = ((rotateDeg + (360 / sides) * i) * Math.PI) / 180;
    pts.push(`${(cx + r * Math.cos(angle)).toFixed(2)},${(cy + r * Math.sin(angle)).toFixed(2)}`);
  }
  return pts.join(" ");
}

function starPoints(cx: number, cy: number, outerR: number, innerR: number) {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const angle = ((-90 + i * 36) * Math.PI) / 180;
    pts.push(`${(cx + r * Math.cos(angle)).toFixed(2)},${(cy + r * Math.sin(angle)).toFixed(2)}`);
  }
  return pts.join(" ");
}

interface ShapeIconProps {
  shapeKey: ShapeKey;
  paint: IconPaint;
}

export function ShapeIcon({ shapeKey, paint }: ShapeIconProps) {
  const p = {
    fill: paint.shapeFill,
    stroke: paint.shapeStroke,
    strokeWidth: paint.shapeStrokeWidth,
    strokeDasharray: paint.dash,
    strokeLinejoin: "round" as const,
  };

  switch (shapeKey) {
    case "circle":
      return <circle cx={50} cy={50} r={40} {...p} />;
    case "square":
      return <rect x={12} y={12} width={76} height={76} rx={6} {...p} />;
    case "triangle":
      return <polygon points="50,10 90,88 10,88" {...p} />;
    case "rectangle":
      return <rect x={6} y={24} width={88} height={52} rx={6} {...p} />;
    case "star":
      return <polygon points={starPoints(50, 50, 42, 18)} {...p} />;
    case "heart":
      return (
        <path
          d="M50,88 C20,65 5,40 5,25 C5,10 20,2 32,10 C40,15 46,22 50,30 C54,22 60,15 68,10 C80,2 95,10 95,25 C95,40 80,65 50,88 Z"
          {...p}
        />
      );
    case "oval":
      return <ellipse cx={50} cy={50} rx={44} ry={30} {...p} />;
    case "diamond":
      return <polygon points="50,6 94,50 50,94 6,50" {...p} />;
    case "pentagon":
      return <polygon points={regularPolygonPoints(5, 50, 52, 42)} {...p} />;
    case "hexagon":
      return <polygon points={regularPolygonPoints(6, 50, 50, 42, -90)} {...p} />;
    default:
      return null;
  }
}
