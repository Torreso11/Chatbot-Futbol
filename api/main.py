import os
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from groq import Groq
from pathlib import Path
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS

# 1. Configuración Inicial
load_dotenv()
app = FastAPI()

# PERMITIR CONEXIÓN CON EL FRONTEND (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# 2. Carga de Documentos
BASE_DIR = Path(__file__).parent
docs_path = BASE_DIR / "docs"
archivos = ["clubes de la uefa.pdf", "Fútbol Europeo.pdf"]
documentos = []

print("--- Cargando documentos tácticos... ---")
for nombre in archivos:
    file_path = docs_path / nombre
    if file_path.exists():
        loader = PyPDFLoader(str(file_path))
        documentos.extend(loader.load())
        print(f"✅ Cargado: {nombre}")

# 3. Base de Datos de Conocimiento (RAG)
text_splitter = RecursiveCharacterTextSplitter(chunk_size=800, chunk_overlap=80)
chunks = text_splitter.split_documents(documentos)
embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
vector_db = FAISS.from_documents(chunks, embeddings)
print("🚀 Sistema RAG listo y entrenado con los PDFs.")

class ChatQuery(BaseModel):
    pregunta: str

@app.post("/api/chat")
async def chat_endpoint(query: ChatQuery):
    try:
        # Buscar contexto en los PDFs
        docs_relevantes = vector_db.similarity_search(query.pregunta, k=3)
        contexto = "\n\n".join([d.page_content for d in docs_relevantes])

        # Prompt estricto para evitar alucinaciones
        prompt = f"""Eres un asistente experto en fútbol. Responde SOLO usando el contexto proporcionado. 
        Si la información no está en el contexto, di que no lo sabes.
        
        CONTEXTO:
        {contexto}
        
        PREGUNTA: {query.pregunta}"""

        completion = client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model="llama-3.3-70b-versatile",
            temperature=0 # <--- Vital para que no invente
        )
        return {"respuesta": completion.choices[0].message.content}
    except Exception as e:
        return {"respuesta": f"Error en el servidor: {str(e)}"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=7860)
