import os
import json
import asyncio
from dotenv import load_dotenv
from openai import OpenAI
from cv_data import cvData  # Make sure cv_data.py is pure Python

# Load environment variables
load_dotenv(dotenv_path="D:/Portfolio/.env.local")
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError("OPENAI_API_KEY not found")

client = OpenAI(api_key=api_key)

# Parameters
CHUNK_SIZE = 350
CHUNK_OVERLAP = 50
OUTPUT_FILE = "cv_embeddings.json"

def chunk_text(text, size=CHUNK_SIZE, overlap=CHUNK_OVERLAP):
    chunks = []
    start = 0
    while start < len(text):
        end = min(start + size, len(text))
        chunks.append(text[start:end])
        start += size - overlap
    return chunks

def flatten_cv(cv_data):
    flat_chunks = []
    for section, value in cv_data.items():
        if isinstance(value, str):
            flat_chunks.extend(chunk_text(value))
        elif isinstance(value, dict):
            for k, v in value.items():
                if isinstance(v, str):
                    flat_chunks.extend(chunk_text(v))
                elif isinstance(v, list):
                    for item in v:
                        flat_chunks.extend(chunk_text(str(item)))
        elif isinstance(value, list):
            for item in value:
                flat_chunks.extend(chunk_text(str(item)))
    return flat_chunks

async def get_embedding(text):
    response = client.embeddings.create(
        model="text-embedding-3-small",
        input=text
    )
    return response.data[0].embedding

async def main():
    all_chunks = flatten_cv(cvData)
    embeddings = []

    for i, chunk in enumerate(all_chunks):
        print(f"Embedding chunk {i+1}/{len(all_chunks)}")
        emb = await get_embedding(chunk)
        embeddings.append({"text": chunk, "embedding": emb})

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(embeddings, f, ensure_ascii=False, indent=2)

    print(f"✅ Embeddings saved to {OUTPUT_FILE}")

if __name__ == "__main__":
    asyncio.run(main())
