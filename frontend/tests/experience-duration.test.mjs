import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import ts from "typescript";

const source = readFileSync(new URL("../lib/experience-duration.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText;
const { formatExperienceDuration } = await import(`data:text/javascript,${encodeURIComponent(compiled)}`);

test("counts start and end calendar months, including short and multi-year roles", () => {
  assert.equal(formatExperienceDuration("2023-10-01", "2023-11-30", "2026-10", "en"), "2 months");
  assert.equal(formatExperienceDuration("2024-03-01", "2025-01-31", "2026-10", "en"), "11 months");
  assert.equal(formatExperienceDuration("2016-02-01", "2021-06-30", "2026-10", "en"), "5 years 5 months");
});

test("ongoing roles use the current month and display naturally in both languages", () => {
  assert.equal(formatExperienceDuration("2024-08-01", null, "2026-10", "en"), "2 years 3 months");
  assert.equal(formatExperienceDuration("2024-08-01", null, "2026-11", "en"), "2 years 4 months");
  assert.equal(formatExperienceDuration("2026-10-01", null, "2026-10", "en"), "1 month");
  assert.equal(formatExperienceDuration("2024-08-01", null, "2026-10", "fa"), "۲ سال و ۳ ماه");
});
