// Best-effort serverless proxy for filmindonesia.or.id box-office data.
//
// filmindonesia.or.id publishes weekly admission rankings as HTML tables.
// They have no public API, no CORS headers, and no commitment to URL stability,
// so this proxy is INTENTIONALLY best-effort:
//   - It tries to fetch the public HTML
//   - It returns raw HTML to the client; parsing is done client-side
//   - On any failure, the client falls back to the bundled dataset
//
// Deployed automatically by Netlify when the project is built. Endpoint:
//   /.netlify/functions/filmindonesia-proxy?path=/box-office-mingguan
//
// During `vite dev` this function is NOT served — install netlify-cli and run
// `netlify dev` instead to exercise the proxy locally.

interface NetlifyEvent {
  queryStringParameters?: Record<string, string | undefined>
}

interface NetlifyResponse {
  statusCode: number
  headers?: Record<string, string>
  body: string
}

const ALLOWED_HOSTS = ['filmindonesia.or.id', 'www.filmindonesia.or.id']
const DEFAULT_PATH = '/box-office-mingguan'

export async function handler(event: NetlifyEvent): Promise<NetlifyResponse> {
  const requestedPath = event.queryStringParameters?.path ?? DEFAULT_PATH
  const targetUrl = `https://filmindonesia.or.id${requestedPath.startsWith('/') ? requestedPath : `/${requestedPath}`}`

  try {
    const url = new URL(targetUrl)
    if (!ALLOWED_HOSTS.includes(url.hostname)) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Host not allowed' }) }
    }
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid path' }) }
  }

  try {
    const res = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'KalaOS/1.0 (BoxPredict)',
        Accept: 'text/html',
      },
    })
    const text = await res.text()
    return {
      statusCode: res.status,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
        'Access-Control-Allow-Origin': '*',
      },
      body: text,
    }
  } catch (err) {
    return {
      statusCode: 502,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: 'Upstream fetch failed',
        message: (err as Error).message,
      }),
    }
  }
}
