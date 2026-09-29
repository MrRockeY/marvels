import type { AnimalKey } from "@/lib/data/animals";
import type { IconPaint } from "@/components/icons/paint";

interface Props {
  animalKey: AnimalKey;
  paint: IconPaint;
}

export function AnimalIcon({ animalKey, paint }: Props) {
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
  const dotFill = paint.lineStroke;

  const rays = (cx: number, cy: number, rIn: number, rOut: number, count: number) =>
    Array.from({ length: count }, (_, i) => {
      const a = (i / count) * Math.PI * 2;
      const x1 = cx + Math.cos(a) * rIn;
      const y1 = cy + Math.sin(a) * rIn;
      const x2 = cx + Math.cos(a) * rOut;
      const y2 = cy + Math.sin(a) * rOut;
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} {...line} />;
    });

  const cluster = (points: [number, number, number][]) =>
    points.map(([cx, cy, r], i) => <circle key={i} cx={cx} cy={cy} r={r} {...body} />);

  switch (animalKey) {
    case "elephant":
      return (
        <g>
          <ellipse cx={68} cy={26} rx={16} ry={14} {...body} />
          <ellipse cx={45} cy={58} rx={38} ry={30} {...body} />
          <path d="M56,30 C48,40 46,54 54,62" {...line} />
          <circle cx={72} cy={22} r={2.4} fill={dotFill} />
          <rect x={26} y={82} width={8} height={14} rx={3} {...body} />
          <rect x={44} y={84} width={8} height={14} rx={3} {...body} />
          <rect x={62} y={84} width={8} height={14} rx={3} {...body} />
        </g>
      );
    case "cat":
      return (
        <g>
          <ellipse cx={50} cy={70} rx={30} ry={22} {...body} />
          <circle cx={50} cy={38} r={24} {...body} />
          <polygon points="30,24 38,4 44,26" {...body} />
          <polygon points="70,24 62,4 56,26" {...body} />
          <circle cx={42} cy={36} r={2.2} fill={dotFill} />
          <circle cx={58} cy={36} r={2.2} fill={dotFill} />
          <path d="M20,48 C30,44 34,50 30,54 M80,48 C70,44 66,50 70,54" {...line} />
          <path d="M74,74 C86,70 88,56 80,50" {...line} />
        </g>
      );
    case "rabbit":
      return (
        <g>
          <ellipse cx={22} cy={20} rx={9} ry={26} transform="rotate(-12 22 20)" {...body} />
          <ellipse cx={48} cy={16} rx={9} ry={26} transform="rotate(6 48 16)" {...body} />
          <circle cx={50} cy={58} r={24} {...body} />
          <ellipse cx={50} cy={90} rx={26} ry={18} {...body} />
          <circle cx={42} cy={54} r={2.2} fill={dotFill} />
          <circle cx={58} cy={54} r={2.2} fill={dotFill} />
        </g>
      );
    case "giraffe":
      return (
        <g>
          <path d="M46,20 L58,20 L54,66 L48,66 Z" {...body} />
          <ellipse cx={51} cy={16} rx={13} ry={11} {...body} />
          <line x1={46} y1={8} x2={45} y2={2} {...line} />
          <line x1={56} y1={8} x2={57} y2={2} {...line} />
          <ellipse cx={50} cy={78} rx={26} ry={16} {...body} />
          <rect x={32} y={90} width={6} height={8} {...body} />
          <rect x={62} y={90} width={6} height={8} {...body} />
          <circle cx={40} cy={40} r={2.3} fill={dotFill} />
          <circle cx={60} cy={54} r={2.3} fill={dotFill} />
          <circle cx={44} cy={76} r={2.3} fill={dotFill} />
        </g>
      );
    case "penguin":
      return (
        <g>
          <ellipse cx={50} cy={58} rx={28} ry={36} {...body} />
          <ellipse cx={50} cy={62} rx={15} ry={24} {...line} />
          <circle cx={50} cy={26} r={17} {...body} />
          <polygon points="44,28 56,28 50,36" fill={dotFill} />
          <path d="M22,50 C14,54 14,70 24,72" {...line} />
          <path d="M78,50 C86,54 86,70 76,72" {...line} />
          <circle cx={44} cy={22} r={2} fill={dotFill} />
          <circle cx={56} cy={22} r={2} fill={dotFill} />
        </g>
      );
    case "lion":
      return (
        <g>
          {rays(50, 50, 26, 42, 16)}
          <circle cx={50} cy={50} r={24} {...body} />
          <circle cx={43} cy={48} r={2.2} fill={dotFill} />
          <circle cx={57} cy={48} r={2.2} fill={dotFill} />
          <polygon points="47,58 53,58 50,63" fill={dotFill} />
        </g>
      );
    case "pig":
      return (
        <g>
          <ellipse cx={50} cy={58} rx={32} ry={26} {...body} />
          <polygon points="26,38 20,24 34,32" {...body} />
          <polygon points="74,38 80,24 66,32" {...body} />
          <ellipse cx={50} cy={62} rx={12} ry={9} {...body} />
          <circle cx={46} cy={62} r={1.8} fill={dotFill} />
          <circle cx={54} cy={62} r={1.8} fill={dotFill} />
          <path d="M80,66 C90,66 90,76 82,74" {...line} />
        </g>
      );
    case "fox":
      return (
        <g>
          <polygon points="50,20 24,30 40,52 60,52 76,30" {...body} />
          <polygon points="30,10 22,30 38,28" {...body} />
          <polygon points="70,10 78,30 62,28" {...body} />
          <ellipse cx={50} cy={72} rx={28} ry={22} {...body} />
          <circle cx={42} cy={42} r={2} fill={dotFill} />
          <circle cx={58} cy={42} r={2} fill={dotFill} />
          <circle cx={50} cy={50} r={2.2} fill={dotFill} />
        </g>
      );
    case "zebra":
      return (
        <g>
          <ellipse cx={50} cy={62} rx={32} ry={24} {...body} />
          <ellipse cx={78} cy={40} rx={14} ry={11} {...body} />
          <rect x={30} y={86} width={7} height={12} {...body} />
          <rect x={63} y={86} width={7} height={12} {...body} />
          <path d="M36,46 L44,58 M46,44 L54,60 M56,42 L64,62 M66,44 L72,58" {...line} />
          <circle cx={82} cy={37} r={1.8} fill={dotFill} />
        </g>
      );
    case "dog":
      return (
        <g>
          <ellipse cx={50} cy={68} rx={28} ry={22} {...body} />
          <circle cx={50} cy={38} r={22} {...body} />
          <ellipse cx={30} cy={34} rx={8} ry={16} transform="rotate(-20 30 34)" {...body} />
          <ellipse cx={70} cy={34} rx={8} ry={16} transform="rotate(20 70 34)" {...body} />
          <circle cx={43} cy={36} r={2.1} fill={dotFill} />
          <circle cx={57} cy={36} r={2.1} fill={dotFill} />
          <ellipse cx={50} cy={46} rx={4} ry={3} fill={dotFill} />
          <path d="M44,88 C46,94 54,94 56,88" {...line} />
        </g>
      );
    case "monkey":
      return (
        <g>
          <circle cx={26} cy={52} r={11} {...body} />
          <circle cx={74} cy={52} r={11} {...body} />
          <circle cx={50} cy={50} r={26} {...body} />
          <ellipse cx={50} cy={56} rx={14} ry={12} {...line} />
          <circle cx={43} cy={46} r={2} fill={dotFill} />
          <circle cx={57} cy={46} r={2} fill={dotFill} />
          <ellipse cx={50} cy={86} rx={22} ry={14} {...body} />
        </g>
      );
    case "turtle":
      return (
        <g>
          <path d="M50,20 A34,34 0 0 1 84,54 A34,34 0 0 1 16,54 A34,34 0 0 1 50,20 Z" {...body} />
          <path d="M50,24 L50,54 M26,40 L74,40 M34,58 L50,40 L66,58" {...line} />
          <ellipse cx={50} cy={82} rx={10} ry={8} {...body} />
          <circle cx={47} cy={80} r={1.6} fill={dotFill} />
        </g>
      );
    case "bear":
      return (
        <g>
          <circle cx={30} cy={26} r={10} {...body} />
          <circle cx={70} cy={26} r={10} {...body} />
          <circle cx={50} cy={50} r={28} {...body} />
          <ellipse cx={50} cy={58} rx={13} ry={10} {...line} />
          <circle cx={50} cy={58} r={2.2} fill={dotFill} />
          <circle cx={41} cy={44} r={2} fill={dotFill} />
          <circle cx={59} cy={44} r={2} fill={dotFill} />
        </g>
      );
    case "frog":
      return (
        <g>
          <ellipse cx={50} cy={64} rx={34} ry={24} {...body} />
          <circle cx={32} cy={32} r={11} {...body} />
          <circle cx={68} cy={32} r={11} {...body} />
          <circle cx={32} cy={30} r={3} fill={dotFill} />
          <circle cx={68} cy={30} r={3} fill={dotFill} />
          <path d="M30,72 C42,80 58,80 70,72" {...line} />
        </g>
      );
    case "deer":
      return (
        <g>
          <path d="M38,14 C30,8 26,14 30,20 M38,14 C34,18 38,22 42,18" {...line} />
          <path d="M62,14 C70,8 74,14 70,20 M62,14 C66,18 62,22 58,18" {...line} />
          <ellipse cx={50} cy={30} rx={14} ry={13} {...body} />
          <ellipse cx={50} cy={68} rx={24} ry={20} {...body} />
          <rect x={36} y={84} width={6} height={12} {...body} />
          <rect x={58} y={84} width={6} height={12} {...body} />
          <circle cx={45} cy={28} r={1.8} fill={dotFill} />
          <circle cx={55} cy={28} r={1.8} fill={dotFill} />
        </g>
      );
    case "duck":
      return (
        <g>
          <ellipse cx={48} cy={66} rx={30} ry={22} {...body} />
          <circle cx={62} cy={34} r={17} {...body} />
          <polygon points="74,34 92,30 92,40" fill={dotFill} />
          <circle cx={66} cy={30} r={2} fill={dotFill} />
          <path d="M20,68 C10,66 10,76 20,76" {...line} />
        </g>
      );
    case "owl":
      return (
        <g>
          <polygon points="34,14 40,26 28,26" {...body} />
          <polygon points="66,14 72,26 60,26" {...body} />
          <ellipse cx={50} cy={58} rx={32} ry={34} {...body} />
          <circle cx={38} cy={50} r={13} {...body} />
          <circle cx={62} cy={50} r={13} {...body} />
          <circle cx={38} cy={50} r={4} fill={dotFill} />
          <circle cx={62} cy={50} r={4} fill={dotFill} />
          <polygon points="46,64 54,64 50,72" fill={dotFill} />
        </g>
      );
    case "sheep":
      return (
        <g>
          {cluster([
            [30, 46, 14], [50, 40, 16], [70, 46, 14], [24, 62, 13],
            [50, 66, 17], [76, 62, 13], [40, 60, 13], [60, 60, 13],
          ])}
          <ellipse cx={22} cy={70} rx={11} ry={9} {...body} />
          <rect x={34} y={88} width={6} height={10} {...body} />
          <rect x={60} y={88} width={6} height={10} {...body} />
          <circle cx={19} cy={68} r={1.8} fill={dotFill} />
        </g>
      );
    case "hedgehog":
      return (
        <g>
          <path d="M14,72 A38,34 0 0 1 86,72 Z" {...body} />
          {Array.from({ length: 9 }, (_, i) => {
            const x = 20 + i * 7.5;
            return <polygon key={i} points={`${x},46 ${x + 6},14 ${x + 12},46`} {...line} />;
          })}
          <circle cx={26} cy={68} r={7} {...body} />
          <circle cx={20} cy={66} r={1.6} fill={dotFill} />
        </g>
      );
    default:
      return null;
  }
}
