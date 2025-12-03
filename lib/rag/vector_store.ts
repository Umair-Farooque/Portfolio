// lib/rag/vector-store.ts
import fs from "fs"
import path from "path"

export type EmbeddingItem = {
  id: string
  vector: number[]
  text: string
  source: string
  meta?: Record<string, any>
}

let CACHE: EmbeddingItem[] | null = null

export function loadEmbeddings(): EmbeddingItem[] {
  if (CACHE) return CACHE
  const rel = process.env.EMBEDDINGS_DIR || "embeddings";
  const p = path.resolve(process.cwd(), rel, "cv_embeddings.json");
  if (!fs.existsSync(p)) {
    throw new Error(`Embeddings file not found. Run build script. Expected: ${p}`)
  }
  const raw = JSON.parse(fs.readFileSync(p, "utf-8"))
  CACHE = raw.items as EmbeddingItem[]
  return CACHE
}

function dot(a: number[], b: number[]) {
  let s = 0
  for (let i = 0; i < a.length; i++) s += a[i] * b[i]
  return s
}
function norm(a: number[]) {
  let s = 0
  for (let i = 0; i < a.length; i++) s += a[i] * a[i]
  return Math.sqrt(s)
}

function cosineSimilarity(a: number[], b: number[]) {
  return dot(a, b) / (norm(a) * norm(b) + 1e-10)
}

export function semanticSearch(queryEmbedding: number[], topK = 4) {
  const items = loadEmbeddings()
  const scored = items.map((it) => ({ item: it, score: cosineSimilarity(queryEmbedding, it.vector) }))
  scored.sort((a, b) => b.score - a.score)
  return scored.slice(0, topK).map((s) => ({ ...s.item, score: s.score }))
}
