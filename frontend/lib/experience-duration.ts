import type { Locale } from "@/lib/language";

export function currentMonth(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

export function formatExperienceDuration(startDate: string, endDate: string | null, asOfMonth: string, locale: Locale): string {
  const [startYear, startMonth] = startDate.split("-").map(Number);
  const [endYear, endMonth] = (endDate ?? asOfMonth).split("-").map(Number);
  const totalMonths = Math.max(1, (endYear - startYear) * 12 + endMonth - startMonth + 1);
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  if (locale === "fa") {
    const number = new Intl.NumberFormat("fa-IR");
    return [years && `${number.format(years)} سال`, months && `${number.format(months)} ماه`].filter(Boolean).join(" و ");
  }

  return [years && `${years} ${years === 1 ? "year" : "years"}`, months && `${months} ${months === 1 ? "month" : "months"}`].filter(Boolean).join(" ");
}
