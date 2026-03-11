"use client"

import { useState, useRef, useEffect } from "react"
import { ChatSidebar } from "@/components/chat-sidebar"
import { ChatHeader } from "@/components/chat-header"
import { ChatMessage } from "@/components/chat-message"
import { ChatInput } from "@/components/chat-input"
import { MobileSidebar } from "@/components/mobile-sidebar"
import { Trophy, Target, Timer, TrendingUp } from "lucide-react"

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: string
}

export default function TacticalAnalysisChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "¡Bienvenido! Soy TacticaAI. Ahora estoy conectado a tus documentos de la UEFA y Fútbol Europeo. ¿Qué deseas consultar?",
      isUser: false,
      timestamp: "10:00",
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    try {
      // LLAMADA REAL AL BACKEND DE PYTHON
      const response = await fetch('http://127.0.0.1:8000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pregunta: content }),
      });

      const data = await response.json();

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.respuesta,
        isUser: false,
        timestamp: new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      setMessages((prev) => [...prev, {
        id: "err",
        content: "Error: No se pudo contactar con el servidor de Python. Asegúrate de que esté corriendo en el puerto 8000.",
        isUser: false,
        timestamp: "--:--"
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen bg-[#0D0D0D] overflow-hidden">
      <ChatSidebar />
      <MobileSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="flex-1 flex flex-col min-w-0">
        <ChatHeader onToggleSidebar={() => setIsSidebarOpen(true)} />
        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-4xl mx-auto">
            {messages.map((m) => (
              <ChatMessage key={m.id} content={m.content} isUser={m.isUser} timestamp={m.timestamp} />
            ))}
            {isLoading && <p className="text-[#D4AF37] animate-pulse text-sm">Analizando PDFs...</p>}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className="p-4 bg-[#0D0D0D] border-t border-[#1F1F1F]">
          <div className="max-w-4xl mx-auto">
            <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
          </div>
        </div>
      </main>
    </div>
  )
}