"use client";

import { clampLogoSizeMm, LOGO_SIZE_DEFAULT_MM } from "@/lib/logoSize";

interface MarvelsLogoProps {
  sizeMm?: number;
  alt?: string;
  className?: string;
}

/** Centered Marvels school logo sized in millimetres for print-accurate headers. */
export function MarvelsLogo({
  sizeMm = LOGO_SIZE_DEFAULT_MM,
  alt = "MARVELS Montessori",
  className,
}: MarvelsLogoProps) {
  const height = clampLogoSizeMm(sizeMm);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/marvels-logo.png"
      alt={alt}
      className={className}
      style={{
        display: "block",
        height: `${height}mm`,
        width: "auto",
        maxWidth: `${Math.min(120, height * 3.2)}mm`,
        objectFit: "contain",
        marginInline: "auto",
      }}
    />
  );
}
