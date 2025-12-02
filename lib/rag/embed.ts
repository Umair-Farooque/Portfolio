// lib/rag/embed.ts
import fetch from "node-fetch"

type EmbeddingResult = {
  id: string
  vector: number[]
  text: string
  source: string
  meta?: Record<string, any>
}

const OPENAI_KEY = process.env.OPENAI_API_KEY
const MODEL = process.env.OPENAI_EMBEDDING_MODEL || "text-embedding-3-small"

if (!OPENAI_KEY) {
  throw new Error("OPENAI_API_KEY not set in environment")
}

export async function embedTexts(items: { id: string; text: string; source: string; meta?: any }[]) {
  if (items.length === 0) return []

  // The OpenAI embeddings API supports batching; we'll send texts in small batches
  const batchSize = 16
  const out: EmbeddingResult[] = []

  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize)
    const body = {
      model: MODEL,
      input: batch.map((b) => b.text),
    }

    const res = await fetch("https://api.openai.com/v1/embeddings", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      const text = await res.text()
      throw new Error(`Embedding request failed: ${res.status} ${text}`)
    }

    const data = await res.json()
    // response.data is array of embeddings, one per input
    data.data.forEach((d: any, idx: number) => {
      out.push({
        id: batch[idx].id,
        vector: d.embedding,
        text: batch[idx].text,
        source: batch[idx].source,
        meta: batch[idx].meta || {},
      })
    })
  }

  return out
}
