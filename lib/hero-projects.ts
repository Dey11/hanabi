import fs from "fs";
import path from "path";

export function getHeroProjects(): string[] {
  const dir = path.join(process.cwd(), "public", "hero-projects");
  const files = fs.readdirSync(dir);
  return files
    .filter((f) =>
      [".png", ".jpg", ".jpeg", ".webp"].some((ext) =>
        f.toLowerCase().endsWith(ext),
      ),
    )
    .map((f) => path.parse(f).name);
}
