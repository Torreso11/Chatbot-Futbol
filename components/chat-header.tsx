"use client"

import { Menu, Timer, Trophy, Shield, Star, Zap } from "lucide-react"

interface ChatHeaderProps {
  onToggleSidebar?: () => void
}

// Yellow Card Icon
function YellowCardIcon({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="w-3 h-4 rounded-sm bg-gradient-to-br from-yellow-400 to-yellow-500 shadow-sm" />
    </div>
  )
}

// Red Card Icon
function RedCardIcon({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="w-3 h-4 rounded-sm bg-gradient-to-br from-red-500 to-red-600 shadow-sm" />
    </div>
  )
}

export function ChatHeader({ onToggleSidebar }: ChatHeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-[#0D0D0D]/95 backdrop-blur-sm border-b border-[#1F1F1F] sticky top-0 z-10">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-lg text-[#A0A0A0] hover:text-white hover:bg-[#1A1A1A] transition-colors"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1A3C34] to-[#2A5C4C] flex items-center justify-center shadow-lg shadow-[#1A3C34]/30">
              <Trophy className="h-5 w-5 text-[#D4AF37]" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0D0D0D]">
              <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-50" />
            </div>
          </div>

          <div>
            <h2 className="font-semibold text-white flex items-center gap-2">
              <span>TacticaAI</span>
              <span className="px-1.5 py-0.5 rounded-md bg-[#D4AF37]/20 text-[#D4AF37] text-[10px] font-bold">PRO</span>
            </h2>
            <p className="text-xs text-[#A0A0A0] flex items-center gap-1">
              <Zap className="h-3 w-3 text-emerald-500" />
              Análisis en tiempo real
            </p>
          </div>
        </div>
      </div>

      {/* Center Section - Match Stats (Desktop) */}
      <div className="hidden md:flex items-center gap-6">
        <div className="flex items-center gap-4 px-4 py-2 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A]">
          <div className="flex items-center gap-2">
            <Timer className="h-4 w-4 text-[#D4AF37]" />
            <span className="text-sm text-[#E8E8E8] font-mono">90:00</span>
          </div>
          <div className="w-px h-5 bg-[#2A2A2A]" />
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <YellowCardIcon className="opacity-80" />
              <span className="text-xs text-[#A0A0A0]">3</span>
            </div>
            <div className="flex items-center gap-1">
              <RedCardIcon className="opacity-80" />
              <span className="text-xs text-[#A0A0A0]">0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* League Badges */}
        <div className="hidden sm:flex items-center gap-1">
          <div className="p-2 rounded-lg hover:bg-[#1A1A1A] transition-colors cursor-pointer group" title="Premier League">
            <Shield className="h-4 w-4 text-purple-400 group-hover:text-purple-300" />
          </div>
          <div className="p-2 rounded-lg hover:bg-[#1A1A1A] transition-colors cursor-pointer group" title="Champions League">
            <Star className="h-4 w-4 text-[#D4AF37] group-hover:text-[#E5C04D]" />
          </div>
          <div className="p-2 rounded-lg hover:bg-[#1A1A1A] transition-colors cursor-pointer group" title="LaLiga">
            <Trophy className="h-4 w-4 text-orange-400 group-hover:text-orange-300" />
          </div>
        </div>

        <div className="w-px h-6 bg-[#2A2A2A] hidden sm:block" />

        {/* Premium Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#D4AF37]/10 to-transparent border border-[#D4AF37]/20">
          <Trophy className="h-4 w-4 text-[#D4AF37]" />
          <span className="text-xs font-medium text-[#D4AF37]">UEFA Pro</span>
        </div>
      </div>
    </header>
  )
}
