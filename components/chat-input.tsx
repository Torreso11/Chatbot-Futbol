"use client"

import { useState, useRef } from "react"
import { cn } from "@/lib/utils"

interface ChatInputProps {
  onSend: (message: string) => void
  isLoading?: boolean
}

// Custom Football Icon Component
function FootballIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      <path d="M2 12h20" />
      <path d="M12 2v20" />
    </svg>
  )
}

// Custom Whistle Icon Component
function WhistleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M8.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
      <path d="M3 5a2 2 0 0 1 2-2h6.5a2 2 0 0 1 1.6.8l6.9 9.2a2 2 0 0 1-.4 2.8l-2.8 2.1a2 2 0 0 1-2.8-.4L7.1 8.3A2 2 0 0 1 7 7.5V7H5a2 2 0 0 1-2-2Z" />
      <path d="m20 16 2-1.5" />
    </svg>
  )
}

export function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !isLoading) {
      onSend(message.trim())
      setMessage("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="relative px-4 pb-4 pt-2">
      {/* Stadium Light Effect */}
      <div
        className={cn(
          "absolute inset-x-4 -top-20 h-32 bg-gradient-to-t from-transparent pointer-events-none transition-opacity duration-500",
          isFocused ? "opacity-100" : "opacity-0"
        )}
        style={{
          background: isFocused
            ? "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(212, 175, 55, 0.15), transparent)"
            : "none",
        }}
      />

      <form onSubmit={handleSubmit} className="relative">
        <div
          className={cn(
            "relative flex items-end gap-3 rounded-2xl transition-all duration-300",
            "bg-[#1A1A1A] border-2",
            isFocused
              ? "border-[#D4AF37]/50 shadow-lg shadow-[#D4AF37]/10"
              : "border-[#2A2A2A] hover:border-[#3A3A3A]"
          )}
        >
          {/* Stadium Light Bars */}
          {isFocused && (
            <>
              <div className="absolute -top-0.5 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent rounded-full" />
              <div className="absolute -top-1.5 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent rounded-full blur-sm" />
            </>
          )}

          {/* Tactical Icons */}
          <div className="flex items-center gap-1 pl-4 pb-3">
            <button
              type="button"
              className="p-2 rounded-lg text-[#666] hover:text-[#D4AF37] hover:bg-[#262626] transition-colors"
              title="Análisis de formación"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <circle cx="7" cy="7" r="1" fill="currentColor" />
                <circle cx="12" cy="10" r="1" fill="currentColor" />
                <circle cx="17" cy="7" r="1" fill="currentColor" />
                <circle cx="7" cy="13" r="1" fill="currentColor" />
                <circle cx="17" cy="13" r="1" fill="currentColor" />
                <line x1="2" y1="20" x2="22" y2="20" />
              </svg>
            </button>
          </div>

          {/* Text Input */}
          <textarea
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Analiza la táctica del partido..."
            rows={1}
            className={cn(
              "flex-1 bg-transparent resize-none py-3.5 text-sm text-white placeholder:text-[#666]",
              "focus:outline-none min-h-[52px] max-h-32"
            )}
            style={{ scrollbarWidth: "thin" }}
          />

          {/* Send Button */}
          <div className="pr-3 pb-3">
            <button
              type="submit"
              disabled={!message.trim() || isLoading}
              className={cn(
                "relative group flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-300",
                message.trim() && !isLoading
                  ? "bg-gradient-to-br from-[#1A3C34] to-[#2A5C4C] hover:from-[#2A5C4C] hover:to-[#3A6C5C] shadow-lg shadow-[#1A3C34]/30"
                  : "bg-[#262626] cursor-not-allowed"
              )}
            >
              {/* Glow effect */}
              {message.trim() && !isLoading && (
                <div className="absolute inset-0 rounded-xl bg-[#D4AF37]/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              )}

              {isLoading ? (
                <div className="w-5 h-5 border-2 border-[#666] border-t-[#D4AF37] rounded-full animate-spin" />
              ) : (
                <div className="relative">
                  <WhistleIcon
                    className={cn(
                      "h-5 w-5 transition-colors",
                      message.trim() ? "text-[#D4AF37]" : "text-[#666]"
                    )}
                  />
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Helper Text */}
        <div className="flex items-center justify-between mt-2 px-1">
          <p className="text-xs text-[#666]">
            <kbd className="px-1.5 py-0.5 rounded bg-[#262626] text-[#888] text-[10px] font-mono">Enter</kbd>
            {" "}para enviar
          </p>
          <div className="flex items-center gap-2 text-[10px] text-[#666]">
            <FootballIcon className="h-3 w-3 text-[#D4AF37]/50" />
            <span>Powered by TacticaAI</span>
          </div>
        </div>
      </form>
    </div>
  )
}
