import { cookies } from "next/headers";
import { LANGUAGE_COOKIE, type Locale } from "@/lib/language";

export type { Locale } from "@/lib/language";

export async function getLocale(): Promise<Locale> {
  return (await cookies()).get(LANGUAGE_COOKIE)?.value === "fa" ? "fa" : "en";
}
