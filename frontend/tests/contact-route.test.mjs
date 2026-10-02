import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import ts from "typescript";

const source = readFileSync(new URL("../app/api/contact/route.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText;
const { POST } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`);

function contactRequest(body, headers = {}) {
  return new Request("http://portfolio.test/api/contact", {
    method: "POST",
    headers: { host: "portfolio.test", "content-type": "application/json", ...headers },
    body,
    ...(body instanceof ReadableStream ? { duplex: "half" } : {}),
  });
}

test("malformed contact origins are rejected without a server error", async () => {
  const response = await POST(contactRequest("{}", { origin: "not-a-url" }));
  assert.equal(response.status, 403);
});

test("chunked contact bodies are rejected before exceeding the byte limit", async () => {
  const previousBackend = process.env.PORTFOLIO_API_URL;
  const previousFetch = globalThis.fetch;
  process.env.PORTFOLIO_API_URL = "http://backend.invalid";
  globalThis.fetch = async () => { throw new Error("Oversized body reached the backend"); };
  try {
    const body = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode("x".repeat(40_001)));
        controller.close();
      },
    });
    const response = await POST(contactRequest(body));
    assert.equal(response.status, 413);
  } finally {
    globalThis.fetch = previousFetch;
    if (previousBackend === undefined) delete process.env.PORTFOLIO_API_URL;
    else process.env.PORTFOLIO_API_URL = previousBackend;
  }
});

test("valid multibyte form content fits within the proxy body limit", async () => {
  const previousBackend = process.env.PORTFOLIO_API_URL;
  const previousFetch = globalThis.fetch;
  process.env.PORTFOLIO_API_URL = "http://backend.invalid";
  let forwarded = false;
  globalThis.fetch = async () => {
    forwarded = true;
    return Response.json({ message: "Message received. Thank you." }, { status: 201 });
  };
  try {
    const body = JSON.stringify({ name: "Jane Engineer", email: "jane@example.com", message: "سلام".repeat(1250), website: "" });
    assert.ok(Buffer.byteLength(body) > 7000);
    const response = await POST(contactRequest(body));
    assert.equal(response.status, 201);
    assert.equal(forwarded, true);
  } finally {
    globalThis.fetch = previousFetch;
    if (previousBackend === undefined) delete process.env.PORTFOLIO_API_URL;
    else process.env.PORTFOLIO_API_URL = previousBackend;
  }
});

test("successful backend submission stays successful if its reply is not JSON", async () => {
  const previousBackend = process.env.PORTFOLIO_API_URL;
  const previousFetch = globalThis.fetch;
  process.env.PORTFOLIO_API_URL = "http://backend.invalid";
  globalThis.fetch = async () => new Response("received", { status: 201 });
  try {
    const response = await POST(contactRequest("{}"));
    assert.equal(response.status, 201);
    assert.equal((await response.json()).message, "Message received. Thank you.");
  } finally {
    globalThis.fetch = previousFetch;
    if (previousBackend === undefined) delete process.env.PORTFOLIO_API_URL;
    else process.env.PORTFOLIO_API_URL = previousBackend;
  }
});

test("contact throttling gives a useful error and preserves retry timing", async () => {
  const previousBackend = process.env.PORTFOLIO_API_URL;
  const previousFetch = globalThis.fetch;
  process.env.PORTFOLIO_API_URL = "http://backend.invalid";
  globalThis.fetch = async () => new Response("rate limited", { status: 429, headers: { "Retry-After": "60" } });
  try {
    const response = await POST(contactRequest("{}"));
    assert.equal(response.status, 429);
    assert.equal(response.headers.get("retry-after"), "60");
    assert.match((await response.json()).message, /too many messages/i);
  } finally {
    globalThis.fetch = previousFetch;
    if (previousBackend === undefined) delete process.env.PORTFOLIO_API_URL;
    else process.env.PORTFOLIO_API_URL = previousBackend;
  }
});
