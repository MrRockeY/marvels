import type { FruitKey } from "@/lib/data/fruits";
import type { IconPaint } from "@/components/icons/paint";

interface Props {
  fruitKey: FruitKey;
  paint: IconPaint;
}

function dots(n: number, cx: number, cy: number, spread: number, r: number, fill: string) {
  return Array.from({ length: n }, (_, i) => {
    const angle = (i / n) * Math.PI * 2;
    const rad = spread * (0.4 + 0.6 * ((i * 37) % 5) / 5);
    const x = cx + Math.cos(angle) * rad;
    const y = cy + Math.sin(angle) * rad;
    return <circle key={i} cx={x} cy={y} r={r} fill={fill} />;
  });
}

export function FruitIcon({ fruitKey, paint }: Props) {
  const body = {
    fill: paint.shapeFill,
    stroke: paint.shapeStroke,
    strokeWidth: paint.shapeStrokeWidth,
    strokeDasharray: paint.dash,
    strokeLinejoin: "round" as const,
    strokeLinecap: "round" as const,
  };
  const line = {
    fill: "none",
    stroke: paint.lineStroke,
    strokeWidth: paint.lineWidth,
    strokeDasharray: paint.dash,
    strokeLinecap: "round" as const,
  };
  const seedFill = paint.shapeFill === "none" ? paint.lineStroke : paint.lineStroke;

  switch (fruitKey) {
    case "apple":
      return (
        <g>
          <path
            d="M50,32 C36,14 12,20 12,44 C12,68 32,88 50,80 C68,88 88,68 88,44 C88,20 64,14 50,32 Z"
            {...body}
          />
          <path d="M50,32 C50,26 50,20 50,14" {...line} />
          <ellipse cx={62} cy={17} rx={11} ry={6} transform="rotate(-25 62 17)" {...line} />
        </g>
      );
    case "mango":
      return (
        <g>
          <ellipse cx={50} cy={56} rx={30} ry={38} transform="rotate(-18 50 56)" {...body} />
          <ellipse cx={64} cy={17} rx={10} ry={5} transform="rotate(20 64 17)" {...line} />
        </g>
      );
    case "banana":
      return (
        <g>
          <path
            d="M28,84 C12,66 14,34 42,14 C48,10 56,14 52,20 C32,34 26,58 38,76 C44,84 40,92 28,84 Z"
            {...body}
          />
          <path d="M46,17 C48,19 49,21 49,23" {...line} />
        </g>
      );
    case "orange":
      return (
        <g>
          <circle cx={50} cy={54} r={36} {...body} />
          <rect x={47} y={12} width={6} height={8} rx={2} fill={seedFill} />
          <path d="M50,30 C58,34 62,42 62,50" {...line} />
        </g>
      );
    case "grapes":
      return (
        <g>
          <path d="M50,14 C56,14 60,20 56,26" {...line} />
          <ellipse cx={62} cy={18} rx={9} ry={5} transform="rotate(20 62 18)" {...line} />
          {[
            [50, 30], [38, 42], [62, 42], [30, 56], [50, 56], [70, 56],
            [38, 70], [62, 70], [50, 82],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r={11} {...body} />
          ))}
        </g>
      );
    case "guava":
      return (
        <g>
          <circle cx={50} cy={56} r={34} {...body} />
          <path d="M46,20 C40,10 30,10 26,16 M54,20 C60,10 70,10 74,16" {...line} />
          {dots(6, 50, 58, 14, 2.1, seedFill)}
        </g>
      );
    case "pomegranate":
      return (
        <g>
          <circle cx={50} cy={58} r={34} {...body} />
          <polygon points="42,22 50,10 58,22 50,17" {...line} />
          {dots(9, 50, 60, 16, 2.2, seedFill)}
        </g>
      );
    case "strawberry":
      return (
        <g>
          <path
            d="M50,90 C22,70 12,46 22,30 C30,17 46,17 50,28 C54,17 70,17 78,30 C88,46 78,70 50,90 Z"
            {...body}
          />
          <polygon points="34,22 42,10 50,20 58,10 66,22" {...line} />
          {dots(10, 50, 55, 18, 1.6, seedFill)}
        </g>
      );
    case "watermelon":
      return (
        <g>
          <path d="M12,58 A38,38 0 0 1 88,58 Z" {...body} />
          <path d="M20,58 A30,30 0 0 1 80,58" {...line} />
          {dots(6, 50, 46, 16, 2, seedFill)}
        </g>
      );
    case "pineapple":
      return (
        <g>
          <polygon points="50,4 60,20 50,16 40,20" {...line} />
          <polygon points="50,2 62,22 38,22" {...line} />
          <ellipse cx={50} cy={60} rx={28} ry={34} {...body} />
          <path d="M28,36 L72,50 M28,50 L72,64 M28,64 L72,78 M32,26 L60,90 M50,24 L50,92 M68,26 L40,90" {...line} />
        </g>
      );
    default:
      return null;
  }
}
