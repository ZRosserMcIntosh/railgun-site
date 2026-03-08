import { NextRequest, NextResponse } from 'next/server';

const API_BASE = 'https://railgun-api.fly.dev/api/v1';

/**
 * Server-side health check proxy.
 * The status page calls this route instead of hitting the API directly,
 * bypassing CORS restrictions (server-to-server requests have no CORS).
 *
 * Query params:
 *   endpoint – the API path, e.g. "/health"
 *   method   – "GET" or "POST"
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const endpoint = searchParams.get('endpoint');
  const method = (searchParams.get('method') || 'GET').toUpperCase();

  if (!endpoint) {
    return NextResponse.json({ error: 'Missing endpoint param' }, { status: 400 });
  }

  // Only allow probing our own API
  const url = `${API_BASE}${endpoint}`;

  const start = Date.now();
  let statusCode: number | null = null;
  let ok = false;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000);

    const resp = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: method === 'POST' ? '{}' : undefined,
      signal: controller.signal,
    });

    clearTimeout(timeout);
    statusCode = resp.status;
    ok = true;
  } catch {
    // Network error / timeout
    ok = false;
  }

  const latencyMs = Date.now() - start;

  return NextResponse.json({ statusCode, latencyMs, ok }, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  });
}
