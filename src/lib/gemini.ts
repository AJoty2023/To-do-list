const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string

export interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface GeminiResponse {
  candidates?: {
    content?: {
      parts?: { text: string }[]
    }
  }[]
}

/**
 * Convert chat messages into Gemini format
 */
function buildGeminiMessages(messages: Message[]) {
  return messages.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }))
}

/**
 * ---- RATE LIMIT CONTROL ----
 */
let lastRequestTime = 0
let inFlightRequest: Promise<string> | null = null

const MIN_INTERVAL_MS = 60_000 // 1 request per minute

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Main API function
 */
export async function askGemini(
  systemPrompt: string,
  messages: Message[],
  maxTokens = 500,
): Promise<string> {
  const now = Date.now()

  // ❌ If request already running → return same promise
  if (inFlightRequest !== null) {
    return inFlightRequest
  }

  // ❌ Rate limit: enforce 1 request per minute
  const waitTime = MIN_INTERVAL_MS - (now - lastRequestTime)
  if (waitTime > 0) {
    await wait(waitTime)
  }

  const requestPromise = (async () => {
    lastRequestTime = Date.now()

    const url =
      `https://generativelanguage.googleapis.com/v1beta/models/` +
      `gemini-2.0-flash:generateContent?key=${API_KEY}`

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: systemPrompt }],
        },
        contents: buildGeminiMessages(messages),
        generationConfig: {
          maxOutputTokens: maxTokens,
          temperature: 0.7,
        },
      }),
    })

    if (!response.ok) {
      const errText = await response.text()

      // If rate limited → show clean message
      if (response.status === 429) {
        throw new Error(
          'Rate limit exceeded. Please wait a minute before trying again.',
        )
      }

      throw new Error(`Gemini API error ${response.status}: ${errText}`)
    }

    const data = (await response.json()) as GeminiResponse

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text

    if (!text) {
      throw new Error('Empty response from Gemini')
    }

    return text.trim()
  })()

  inFlightRequest = requestPromise

  try {
    const result = await requestPromise
    return result
  } finally {
    inFlightRequest = null
  }
}