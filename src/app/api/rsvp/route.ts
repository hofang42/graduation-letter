const REQUEST_TIMEOUT_MS = 15_000

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function jsonError(message: string, status: number) {
  return Response.json({ result: 'error', error: message }, { status })
}

export async function POST(request: Request) {
  const scriptUrl =
    process.env.GOOGLE_SCRIPT_URL || process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL

  if (!scriptUrl) {
    return jsonError('RSVP endpoint is not configured.', 500)
  }

  let formData: FormData
  try {
    formData = await request.formData()
  } catch {
    return jsonError('Invalid RSVP form data.', 400)
  }

  const name = String(formData.get('name') || '').trim()
  const email = String(formData.get('email') || '').trim()
  const guests = String(formData.get('guests') || '0').trim()
  const attendance = String(formData.get('attendance') || '').trim()
  const message = String(formData.get('message') || '').trim()

  if (!name || !email || !attendance) {
    return jsonError('Name, email, and attendance are required.', 400)
  }

  const formBody = new URLSearchParams({
    name,
    email,
    guests,
    attendance,
    message,
  })
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    const upstreamResponse = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        Accept: 'application/json',
      },
      body: formBody.toString(),
      redirect: 'follow',
      cache: 'no-store',
      signal: controller.signal,
    })

    const rawBody = await upstreamResponse.text()
    let payload: { result?: string; error?: string }

    try {
      payload = JSON.parse(rawBody) as { result?: string; error?: string }
    } catch {
      console.error('[RSVP] Apps Script returned non-JSON:', rawBody.slice(0, 500))
      return jsonError('The RSVP service returned an invalid response.', 502)
    }

    if (!upstreamResponse.ok || payload.result !== 'success') {
      console.error('[RSVP] Apps Script rejected RSVP:', payload)
      return jsonError(payload.error || 'The RSVP service rejected the submission.', 502)
    }

    return Response.json({ result: 'success' }, { status: 200 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown request error'
    console.error('[RSVP] Proxy request failed:', message)

    if (error instanceof Error && error.name === 'AbortError') {
      return jsonError('The RSVP service timed out. Please try again.', 504)
    }

    return jsonError('Could not reach the RSVP service. Please try again.', 502)
  } finally {
    clearTimeout(timeout)
  }
}
