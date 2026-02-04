from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from langchain_community.document_loaders import TextLoader
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_community.vectorstores import FAISS
from langchain_text_splitters import CharacterTextSplitter
from langchain.chains import RetrievalQA
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

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

# RAG System Class
class RAGSystem:
    def __init__(self, cv_path=None):
        if cv_path is None:
            base_path = os.path.dirname(os.path.abspath(__file__))
            self.cv_path = os.path.join(base_path, "cv_data.txt")
        else:
            self.cv_path = cv_path
        self.vector_store = None
        self.qa_chain = None
        self.initialize_rag()

    def initialize_rag(self):
        if not os.path.exists(self.cv_path):
            print(f"Warning: {self.cv_path} not found.")
            return

        if not os.getenv("OPENAI_API_KEY"):
            print("Warning: OPENAI_API_KEY not found in environment variables.")
            return

        try:
            loader = TextLoader(self.cv_path)
            documents = loader.load()

            text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
            texts = text_splitter.split_documents(documents)

            embeddings = OpenAIEmbeddings()
            self.vector_store = FAISS.from_documents(texts, embeddings)

            llm = ChatOpenAI(temperature=0, model_name="gpt-3.5-turbo")
            self.qa_chain = RetrievalQA.from_chain_type(
                llm=llm,
                chain_type="stuff",
                retriever=self.vector_store.as_retriever()
            )
            print("RAG System initialized successfully.")
        except Exception as e:
            print(f"Error initializing RAG: {e}")

    def query(self, question: str):
        if not self.qa_chain:
            return "System not initialized or API key missing."
        
        try:
            response = self.qa_chain.invoke(question)
            return response.get("result", "No answer found.")
        except Exception as e:
            return f"Error processing query: {str(e)}"

# Initialize RAG system
rag_system = RAGSystem()

@app.get("/api/health")
async def health_check():
    return {"status": "ok"}

@app.post("/api/chat", response_model=QueryResponse)
async def chat(request: QueryRequest):
    if not request.query:
        raise HTTPException(status_code=400, detail="Query cannot be empty")
    
    answer = rag_system.query(request.query)
    return {"answer": answer}

# Vercel serverless handler
handler = app
