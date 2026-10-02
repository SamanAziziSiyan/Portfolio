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
    const body = await request.text();
    if (body.length > 7000) return Response.json({ message: "Message is too long." }, { status: 413 });
    const response = await fetch(`${backend.replace(/\/$/, "")}/api/v1/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body,
      signal: AbortSignal.timeout(6000),
    });
    const result = (await response.json()) as { message?: string };
    return Response.json({ message: response.ok ? result.message : "Please check your details or try again later." }, { status: response.status });
  } catch {
    return Response.json({ message: "Contact is temporarily unavailable." }, { status: 503 });
  }
}
