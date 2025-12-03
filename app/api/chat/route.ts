import { NextResponse } from "next/server";
import { RAGService } from "@/lib/rag-service";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const userMessage = messages[messages.length - 1]?.content || "";
    const result = await RAGService.answer(userMessage);

    return NextResponse.json({
      reply: result.answer,
      sources: result.retrieved, // Optionally use on frontend
    });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
