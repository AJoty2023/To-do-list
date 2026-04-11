const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string

export interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface GeminiResponse {
  candidates: {
    content: {
      parts: { text: string }[]
    }
  }[]
}

function buildGeminiMessages(
  messages: Message[],
): { role: string; parts: { text: string }[] }[] {
  return messages.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }))
}

export async function askGemini(
  systemPrompt: string,
  messages: Message[],
  maxTokens = 500,
): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`

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
    const err = await response.text()
    throw new Error(`Gemini API error ${response.status}: ${err}`)
  }

  const data = await response.json() as GeminiResponse

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text
  if (!text) throw new Error('Empty response from Gemini')

  return text.trim()
}