import type { Worksheet } from "@/types/worksheet";

interface WorksheetHeaderProps {
  worksheet: Worksheet;
  x: number;
  y: number;
  width: number;
  height: number;
}

export function WorksheetHeader({ worksheet, x, y, width, height }: WorksheetHeaderProps) {
  const { header, schoolName, title, titleAlign } = worksheet;
  if (!header.showSchoolName && !header.showTitle && !header.showName && !header.showDate) return null;

  return (
    <div
      className="absolute flex flex-col justify-between"
      style={{ left: `${x}mm`, top: `${y}mm`, width: `${width}mm`, height: `${height}mm` }}
    >
      <div className="space-y-1.5">
        {header.showSchoolName && (
          <p
            className="text-center font-semibold tracking-wide text-[#1c1712]"
            style={{ fontFamily: "'Quicksand', sans-serif", fontSize: "5.2mm" }}
          >
            {schoolName || "MARVELS Montessori"}
          </p>
        )}
        {header.showTitle && title && (
          <p
            className="font-semibold uppercase text-[#1c1712]"
            style={{
              fontSize: "4mm",
              letterSpacing: "0.06em",
              textAlign: titleAlign,
            }}
          >
            {title}
          </p>
        )}
        {(header.showName || header.showDate) && (
          <div className="flex items-baseline justify-between pt-1" style={{ fontSize: "3.6mm" }}>
            {header.showName && (
              <span className="text-[#1c1712]">
                Name: <span className="inline-block border-b border-[#1c1712]" style={{ width: "55mm" }} />
              </span>
            )}
            {header.showDate && (
              <span className="text-[#1c1712]">
                Date: <span className="inline-block border-b border-[#1c1712]" style={{ width: "30mm" }} />
              </span>
            )}
          </div>
        )}
      </div>
      <div className="border-b border-[#d8cbb5]" />
    </div>
  );
}
