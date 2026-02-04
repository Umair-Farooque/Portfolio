from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import openai

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QueryRequest(BaseModel):
    query: str

class QueryResponse(BaseModel):
    answer: str

# CV Data embedded directly
CV_DATA = """
Muhammad Umair Farooq
Machine Learning Engineer
+923084624629 ◇ farooq.intellecta@gmail.com ◇ LinkedIn ◇GitHub

SUMMARY
Engineer with hands-on experience in building and deploying intelligent systems using LLMs, RAG pipelines, and deep learning. Skilled in Python, PyTorch, LangChain, and FastAPI, with a strong focus on developing practical AI solutions such as educational chatbots, legal assistants, and EMG-based prosthetic control systems. Experienced in end-to-end model deployment, vector search (FAISS, Pinecone), and cloud-based MLOps using AWS. Passionate about creating scalable, explainable, and production-ready AI applications.

EXPERIENCE
Machine Learning Intern | ZAA Soft, Islamabad June 2024 – August 2024
Built LLM-powered applications using OpenAI and Hugging Face models. Implemented FAISS and Pinecone databases for efficient retrieval and search. Contributed to end-to-end deployment of internal AI prototypes.

Air University, Islamabad — Machine Learning Intern Jul 2023 – Sept 2023
Completed an enriching internship in the Department of Creative Technologies at Air University, where I honed my skills of Machine Learning from July to September 2023.

128 Technologies, Islamabad — Backend Developer Jul 2023 – Aug 2023
Created a management system for hospitals to keep track of their doctors' schedules and to provide appointments to patients relative to their emergencies. And gained hands-on experience in coding with python, problemsolving, and project management.

SKILLS
ML Frameworks: PyTorch, TensorFlow, Keras, Scikit-learn
LLM & RAG Tools: LangChain, OpenAI API, Transformers (Hugging Face), FAISS, Pinecone
Data Science & Analysis: Data Analysis, Data Preprocessing, pandas, NumPy, Feature Engineering, Model Evaluation
Deployment & MLOps: FastAPI, Docker.
Data & Databases: MySQL, SQLite, ChromaDB
Programming: Python, C++, C

PROJECTS
Agentic Healthcare Workflow Automation System – Built and deployed an agentic AI system that processes unstructured healthcare data (text, PDFs, scanned documents) using LLMs and OCR, validates information completeness, and executes decision-based workflows with full audit logging.

Mednix – AI-Powered Drugs Information Assistant – Built a FastAPI-based RAG system integrating OpenAI and medical databases to deliver accurate, context-aware drug information.

Legal AI Assistant – Law Retrieval & Analysis System— developed a hybrid BM25 + FAISS retrieval engine with LLM summarization for intelligent legal document search and reasoning.

FYP – Neuro-Flex – EMG-Based Hand Movement Classification— Designed a deep learning pipeline using LSTM models to classify EMG signals and control a 3D prosthetic hand in real-time

Credit Enrich System – Creditworthiness Automation: — Automated financial document parsing and data enrichment using OCR, regex, and AI-driven validation pipelines.

Auto-Complete: — A small scaled NLP based generative model to auto complete sentences.

EDUCATION
Air University, Islamabad — BS Artificial Intelligence — CGPA: 2.71 Sep 2021 - July 2025
"""

SYSTEM_PROMPT = f"""You are a helpful assistant for Umair Farooq's portfolio website. 
Answer questions about Umair based on his CV information below. Be concise and helpful.
If asked something not related to Umair or not in the CV, politely say you can only answer questions about Umair.

CV Information:
{CV_DATA}
"""

def query_openai(question: str) -> str:
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        return "System not initialized or API key missing."
    
    try:
        client = openai.OpenAI(api_key=api_key)
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": question}
            ],
            temperature=0,
            max_tokens=500
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"Error processing query: {str(e)}"

@app.get("/api/health")
async def health_check():
    return {"status": "ok"}

@app.post("/api/chat", response_model=QueryResponse)
async def chat(request: QueryRequest):
    if not request.query:
        raise HTTPException(status_code=400, detail="Query cannot be empty")
    
    answer = query_openai(request.query)
    return {"answer": answer}

# Vercel serverless handler
handler = app
