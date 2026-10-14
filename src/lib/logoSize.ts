/** Marvels school logo sizing helpers (mm on the A4 page). */
export const LOGO_SIZE_MIN_MM = 12;
export const LOGO_SIZE_MAX_MM = 40;
export const LOGO_SIZE_DEFAULT_MM = 22;

export function clampLogoSizeMm(value: number) {
  return Math.max(LOGO_SIZE_MIN_MM, Math.min(LOGO_SIZE_MAX_MM, value));
}

/** Extra vertical room around the logo inside the header block. */
export function logoBlockHeightMm(logoSizeMm: number) {
  return clampLogoSizeMm(logoSizeMm) + 4;
}
