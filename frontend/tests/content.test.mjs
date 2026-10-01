import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const content = JSON.parse(readFileSync(new URL("../../packages/content/portfolio.json", import.meta.url), "utf8"));

test("project routes are unique and evidence is linked to an explicit type", () => {
  const slugs = content.projects.map((project) => project.slug);
  assert.equal(new Set(slugs).size, slugs.length);
  for (const project of content.projects) {
    assert.match(project.slug, /^[a-z0-9-]+$/);
    assert.ok(["Public source", "Professional work", "Historical project"].includes(project.evidence_type));
    assert.ok(project.evidence.length > 0);
    for (const item of project.evidence) {
      assert.equal(new URL(item.url).protocol, "https:");
      assert.ok(item.type);
    }
  }
});

test("Blogina and Serione lead to public product pages, while commercial source stays private", () => {
  for (const slug of ["blogina", "serione"]) {
    const project = content.projects.find((item) => item.slug === slug);
    assert.ok(project);
    assert.equal(project.evidence_type, "Professional work");
    assert.equal(project.repository_url, null);
    assert.equal(new URL(project.live_url).hostname, "www.rtl-theme.com");
    assert.ok(project.image_url.startsWith("/work/"));
  }
});

test("the complete career timeline retains Dalga and distinct Panjere roles", () => {
  assert.equal(content.experiences.length, 9);
  assert.ok(content.experiences.some((role) => role.company === "Dalga"));
  assert.equal(content.experiences.filter((role) => role.company === "Panjere Studio").length, 2);
});

test("live products use verified public product domains", () => {
  assert.deepEqual(content.products.map((product) => new URL(product.url).hostname).sort(), ["listdom.net", "webilia.com"]);
  assert.ok(content.products.every((product) => product.evidence_type === "Live product"));
});

test("CV download is a real PDF", () => {
  const pdf = readFileSync(new URL("../public/Saman-Azizi-Siyan-CV.pdf", import.meta.url));
  assert.equal(pdf.subarray(0, 5).toString(), "%PDF-");
  assert.ok(pdf.length > 4000);
});
