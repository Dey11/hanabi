import { toCmykString, toHex, toRgbString } from "@/lib/color";

type ColorLike = {
  name: string;
  value: string;
  role: string | null;
  group: string;
};
type FontLike = {
  name: string;
  category: string | null;
  weights: string | null;
  url: string | null;
};

/** Renders a client's design tokens as a portable Markdown document. */
export function tokensToMarkdown(
  clientName: string,
  colors: ColorLike[],
  fonts: FontLike[],
): string {
  const lines: string[] = [`# ${clientName} — Design Tokens`, ""];

  // Colors, grouped by palette.
  lines.push("## Colors", "");
  if (colors.length === 0) {
    lines.push("_No colors defined._", "");
  } else {
    const groups: { name: string; colors: ColorLike[] }[] = [];
    for (const c of colors) {
      const key = c.group || "Core";
      const g = groups.find((x) => x.name === key);
      if (g) g.colors.push(c);
      else groups.push({ name: key, colors: [c] });
    }
    for (const g of groups) {
      lines.push(`### ${g.name}`, "");
      lines.push("| Name | HEX | RGB | CMYK | Role |");
      lines.push("| --- | --- | --- | --- | --- |");
      for (const c of g.colors) {
        const hex = toHex(c.value) ?? c.value;
        const rgb = toRgbString(c.value) ?? "—";
        const cmyk = toCmykString(c.value) ?? "—";
        lines.push(
          `| ${c.name} | ${hex} | ${rgb} | ${cmyk} | ${c.role ?? ""} |`,
        );
      }
      lines.push("");
    }
  }

  // Typography.
  lines.push("## Typography", "");
  if (fonts.length === 0) {
    lines.push("_No typefaces defined._", "");
  } else {
    for (const f of fonts) {
      lines.push(`### ${f.name}`);
      if (f.category) lines.push(`- **Category:** ${f.category}`);
      if (f.weights) lines.push(`- **Weights:** ${f.weights}`);
      if (f.url) lines.push(`- **Source:** ${f.url}`);
      lines.push("");
    }
  }

  return lines.join("\n");
}
