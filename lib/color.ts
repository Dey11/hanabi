/**
 * Small color helpers for the Brand page — derive RGB/CMYK from a hex value
 * so clients can copy any format. Non-hex values (oklch, named) return null
 * for the derived formats and are shown/copied verbatim.
 */

export function parseHex(
  input: string,
): { r: number; g: number; b: number } | null {
  const m = input.trim().match(/^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/);
  if (!m) return null;
  let hex = m[1];
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const n = parseInt(hex, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

export function toHex(input: string): string | null {
  const rgb = parseHex(input);
  if (!rgb) return null;
  const h = (v: number) => v.toString(16).padStart(2, "0");
  return `#${h(rgb.r)}${h(rgb.g)}${h(rgb.b)}`.toUpperCase();
}

export function toRgbString(input: string): string | null {
  const rgb = parseHex(input);
  return rgb ? `${rgb.r}, ${rgb.g}, ${rgb.b}` : null;
}

export function toCmykString(input: string): string | null {
  const rgb = parseHex(input);
  if (!rgb) return null;
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  const k = 1 - Math.max(r, g, b);
  if (k === 1) return "0, 0, 0, 100";
  const c = Math.round(((1 - r - k) / (1 - k)) * 100);
  const m = Math.round(((1 - g - k) / (1 - k)) * 100);
  const y = Math.round(((1 - b - k) / (1 - k)) * 100);
  return `${c}, ${m}, ${y}, ${Math.round(k * 100)}`;
}

/** Pick readable foreground (near-black or near-white) for a hex background. */
export function readableOn(input: string): "light" | "dark" {
  const rgb = parseHex(input);
  if (!rgb) return "dark";
  // relative luminance
  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum > 0.5 ? "dark" : "light";
}
