const MAX_BODY_BYTES = 40_000;

async function readCappedBody(request: Request): Promise<string | null> {
  const declaredSize = Number(request.headers.get("content-length"));
  if (Number.isFinite(declaredSize) && declaredSize > MAX_BODY_BYTES) return null;
  if (!request.body) return "";

  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let bytes = 0;
  let body = "";
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > MAX_BODY_BYTES) {
        await reader.cancel();
        return null;
      }
      body += decoder.decode(value, { stream: true });
    }
    return body + decoder.decode();
  } finally {
    reader.releaseLock();
  }
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin) {
    try {
      if (!host || new URL(origin).host !== host) {
        return Response.json({ message: "This request is not allowed." }, { status: 403 });
      }
    } catch {
      return Response.json({ message: "This request is not allowed." }, { status: 403 });
    }
  }
  if (!request.headers.get("content-type")?.startsWith("application/json")) {
    return Response.json({ message: "Please send JSON." }, { status: 415 });
  }
  const backend = process.env.PORTFOLIO_API_URL;
  if (!backend) return Response.json({ message: "Contact is unavailable right now." }, { status: 503 });
  try {
    const body = await readCappedBody(request);
    if (body === null) return Response.json({ message: "Message is too long." }, { status: 413 });
    const response = await fetch(`${backend.replace(/\/$/, "")}/api/v1/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body,
      signal: AbortSignal.timeout(6000),
    });
    const result = await response.json().catch(() => null) as { message?: string } | null;
    const message = response.ok
      ? result?.message ?? "Message received. Thank you."
      : response.status === 429
        ? "Too many messages. Please try again later."
        : "Please check your details or try again later.";
    const retryAfter = response.headers.get("retry-after");
    return Response.json({ message }, {
      status: response.status,
      headers: retryAfter ? { "Retry-After": retryAfter } : undefined,
    });
  } catch {
    return Response.json({ message: "Contact is temporarily unavailable." }, { status: 503 });
  }
}
