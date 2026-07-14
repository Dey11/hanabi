const dateFmt = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const monthFmt = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
});

export function formatDate(date: Date | string): string {
  return dateFmt.format(new Date(date));
}

export function formatMonthYear(date: Date | string): string {
  return monthFmt.format(new Date(date));
}

export function formatBytes(bytes?: number | null): string {
  if (!bytes || bytes <= 0) return "";
  const units = ["B", "KB", "MB", "GB"];
  let i = 0;
  let n = bytes;
  while (n >= 1024 && i < units.length - 1) {
    n /= 1024;
    i++;
  }
  return `${n.toFixed(n < 10 && i > 0 ? 1 : 0)} ${units[i]}`;
}
