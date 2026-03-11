"use client"

import { cn } from "@/lib/utils"
import { Trophy, Clock, Shield } from "lucide-react"

interface ChatMessageProps {
  content: string
  isUser: boolean
  timestamp?: string
}

export function ChatMessage({ content, isUser, timestamp }: ChatMessageProps) {
  return (
    <div className={cn("flex w-full mb-4", isUser ? "justify-end" : "justify-start")}>
      <div className={cn("flex gap-3 max-w-[85%] lg:max-w-[70%]", isUser && "flex-row-reverse")}>
        {/* Avatar */}
        {!isUser && (
          <div className="flex-shrink-0">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1A3C34] to-[#2A5C4C] flex items-center justify-center shadow-lg shadow-[#1A3C34]/30">
              <Trophy className="h-4 w-4 text-[#D4AF37]" />
            </div>
          </div>
        )}

        {/* Message Bubble */}
        <div
          className={cn(
            "relative px-4 py-3 rounded-2xl",
            isUser
              ? "bg-gradient-to-br from-emerald-600 to-emerald-700 text-white rounded-br-md"
              : "bg-[#1F1F1F] text-[#E8E8E8] rounded-bl-md border border-[#D4AF37]/20 shadow-lg shadow-[#D4AF37]/5"
          )}
        >
          {/* Gold accent line for AI messages */}
          {!isUser && (
            <div className="absolute left-0 top-3 bottom-3 w-0.5 bg-gradient-to-b from-[#D4AF37] to-[#D4AF37]/30 rounded-full" />
          )}

          <p className={cn("text-sm leading-relaxed", !isUser && "pl-2")}>{content}</p>

          {/* Timestamp */}
          {timestamp && (
            <div className={cn("flex items-center gap-1 mt-2", isUser ? "justify-end" : "justify-start pl-2")}>
              <Clock className="h-3 w-3 text-current opacity-50" />
              <span className="text-xs opacity-50">{timestamp}</span>
            </div>
          )}

          {/* Tactical tags for AI messages */}
          {!isUser && (
            <div className="flex items-center gap-2 mt-3 pl-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#1A3C34]/50 text-[10px] text-[#D4AF37] border border-[#D4AF37]/20">
                <Shield className="h-2.5 w-2.5" />
                Análisis Táctico
              </span>
            </div>
          )}
        </div>

        {/* User Avatar */}
        {isUser && (
          <div className="flex-shrink-0">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8962E] flex items-center justify-center shadow-lg">
              <span className="text-xs font-bold text-[#0D0D0D]">TU</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
