// lib/rag-service.ts
import { loadEmbeddings, semanticSearch, EmbeddingItem } from "./rag/vector-store"

const OPENAI_KEY = process.env.OPENAI_API_KEY
const COMPLETION_MODEL = process.env.OPENAI_COMPLETION_MODEL || "gpt-4o-mini"
const EMBEDDING_MODEL = process.env.OPENAI_EMBEDDING_MODEL || "text-embedding-3-small"
const TOP_K = Number(process.env.TOP_K || 4)

if (!OPENAI_KEY) throw new Error("OPENAI_API_KEY missing")

async function getEmbedding(text: string) {
  const res = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: { Authorization: `Bearer ${OPENAI_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: EMBEDDING_MODEL, input: text }),
  })
  if (!res.ok) throw new Error("Failed to generate embedding")
  const data = await res.json()
  return data.data[0].embedding as number[]
}

function buildContextSnippets(results: (EmbeddingItem & { score?: number })[]) {
  return results
    .map((r, i) => `SOURCE [${r.source} | ${r.id} | score:${(r as any).score?.toFixed(3) || "N/A"}]\n${r.text}`)
    .join("\n\n---\n\n")
}

function buildPrompt(userQuery: string, snippets: string) {
  return `You are an assistant with access to Muhammad Umair Farooq's CV and project data. Use only the provided context snippets to answer the user's question. If the answer is not contained in the context, say you don't know and offer to provide a short summary of the CV or list topics the user can ask about.

Context:
${snippets}

User question: ${userQuery}

Answer concisely, reference which SOURCE id you used (like SOURCE [skills-programmingLanguages-3]) when relevant.`
}

export class RAGService {
  static async answer(question: string) {
    // 1) embed query
    const qEmb = await getEmbedding(question)

    // 2) semantic search
    const retrieved = semanticSearch(qEmb, TOP_K)

    // 3) build context
    const snippets = buildContextSnippets(retrieved)

    // 4) build prompt
    const prompt = buildPrompt(question, snippets)

    // 5) call LLM
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${OPENAI_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: COMPLETION_MODEL,
        messages: [{ role: "system", content: "You are a helpful assistant." }, { role: "user", content: prompt }],
        max_tokens: 700,
        temperature: 0.1,
      }),
    })

    if (!res.ok) {
      const text = await res.text()
      throw new Error("LLM request failed: " + text)
    }
    const data = await res.json()
    const answer = data.choices?.[0]?.message?.content ?? "Sorry, no answer."
    return {
      answer,
      retrieved: retrieved.map((r) => ({ id: r.id, source: r.source, score: (r as any).score })),
    }
  }
}
