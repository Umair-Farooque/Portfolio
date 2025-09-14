import { NextResponse } from "next/server";
import { cvData } from "@/lib/cv-data";

// Utility: get embeddings from OpenAI
async function getEmbedding(text: string): Promise<number[]> {
  const res = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "text-embedding-3-small", // cheap + good enough
      input: text,
    }),
  });
  const data = await res.json();
  return data.data[0].embedding;
}

// Utility: cosine similarity
function cosineSim(a: number[], b: number[]): number {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dot / (magA * magB);
}

// Preprocess CV into chunks
const cvChunks: { text: string; embedding: number[] | null }[] = Object.values(cvData).flatMap(
  (section: any) => {
    if (typeof section === "string") return [{ text: section, embedding: null }];
    if (Array.isArray(section)) return section.map((item) => ({ text: JSON.stringify(item), embedding: null }));
    if (typeof section === "object")
      return Object.entries(section).map(([k, v]) => ({
        text: `${k}: ${JSON.stringify(v)}`,
        embedding: null,
      }));
    return [];
  }
);

// Lazy embedding: generate embeddings for CV chunks once
let initialized = false;
async function ensureEmbeddings() {
  if (initialized) return;
  for (let chunk of cvChunks) {
    chunk.embedding = await getEmbedding(chunk.text);
  }
  initialized = true;
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const userMessage = messages[messages.length - 1]?.content || "";

    await ensureEmbeddings();

    // Embed user query
    const queryEmbedding = await getEmbedding(userMessage);

    // Rank chunks by similarity
    const ranked = cvChunks
      .map((chunk) => ({
        text: chunk.text,
        score: cosineSim(queryEmbedding, chunk.embedding!),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5); // take top 5 most relevant chunks

    const context = ranked.map((r) => r.text).join("\n---\n");

    // Send context + query to GPT
    const apiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are an AI assistant that answers ONLY using Umair Farooq’s CV. 
If something isn’t in the CV, reply: "I don’t know, that information is not in Umair's CV."

Relevant CV info:
${context}`,
          },
          ...messages,
        ],
        temperature: 0.2,
      }),
    });

    const data = await apiRes.json();
    const reply =
      data.choices?.[0]?.message?.content ||
      "I couldn’t find an answer in the CV.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
