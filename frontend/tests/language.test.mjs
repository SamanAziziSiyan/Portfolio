import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const content = JSON.parse(readFileSync(new URL("../../packages/content/portfolio.json", import.meta.url), "utf8"));
const translations = readFileSync(new URL("../lib/portfolio-fa.ts", import.meta.url), "utf8");

test("every published project and career role has Persian copy", () => {
  for (const project of content.projects) {
    assert.ok(translations.includes(`${JSON.stringify(project.slug)}:`) || translations.includes(`${project.slug}:`), `Missing Persian project: ${project.slug}`);
  }
  for (const role of content.experiences) {
    const key = `${role.company}|${role.role}`;
    assert.ok(translations.includes(`${JSON.stringify(key)}:`), `Missing Persian role: ${key}`);
  }
});
