"use client"

import { useState } from "react"
import {
  Trophy,
  FileText,
  ChevronDown,
  ChevronRight,
  Clock,
  Shield,
  Star,
  History,
  BarChart3,
  Plus,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface HistoryItem {
  id: string
  title: string
  date: string
  type: "match" | "analysis"
}

interface LeagueSection {
  id: string
  name: string
  icon: React.ReactNode
  color: string
}

const leagues: LeagueSection[] = [
  { id: "premier", name: "Premier League", icon: <Shield className="h-4 w-4" />, color: "text-purple-400" },
  { id: "champions", name: "Champions League", icon: <Star className="h-4 w-4" />, color: "text-[#D4AF37]" },
  { id: "laliga", name: "LaLiga", icon: <Trophy className="h-4 w-4" />, color: "text-orange-400" },
]

const recentMatches: HistoryItem[] = [
  { id: "1", title: "Real Madrid vs Barcelona", date: "Hace 2 horas", type: "match" },
  { id: "2", title: "Man City vs Liverpool", date: "Hace 1 día", type: "match" },
  { id: "3", title: "Bayern vs Dortmund", date: "Hace 2 días", type: "match" },
  { id: "4", title: "Análisis Defensivo UCL", date: "Hace 3 días", type: "analysis" },
]

export function ChatSidebar() {
  const [expandedSections, setExpandedSections] = useState<string[]>(["reports", "leagues"])
  const [selectedLeague, setSelectedLeague] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    )
  }

  return (
    <aside className="hidden lg:flex flex-col w-72 bg-[#0A0A0A] border-r border-[#1F1F1F] h-full">
      {/* Header */}
      <div className="p-4 border-b border-[#1F1F1F]">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1A3C34] to-[#2A5C4C] flex items-center justify-center">
              <Trophy className="h-5 w-5 text-[#D4AF37]" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0A0A0A]" />
          </div>
          <div>
            <h1 className="font-semibold text-white tracking-tight">TacticaAI</h1>
            <p className="text-xs text-[#A0A0A0]">Análisis Táctico Pro</p>
          </div>
        </div>
      </div>

      {/* New Chat Button */}
      <div className="p-3">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#1A3C34] to-[#2A5C4C] text-white font-medium text-sm hover:from-[#2A5C4C] hover:to-[#3A6C5C] transition-all duration-300 shadow-lg shadow-[#1A3C34]/20 border border-[#D4AF37]/20">
          <Plus className="h-4 w-4" />
          <span>Nuevo Análisis</span>
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
        {/* Match Reports Section */}
        <div className="mb-4">
          <button
            onClick={() => toggleSection("reports")}
            className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-[#A0A0A0] hover:text-white transition-colors rounded-lg hover:bg-[#1A1A1A]"
          >
            <div className="flex items-center gap-2">
              <History className="h-4 w-4" />
              <span>Informes de Partidos</span>
            </div>
            {expandedSections.includes("reports") ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>

          {expandedSections.includes("reports") && (
            <div className="mt-1 space-y-0.5">
              {recentMatches.map((item) => (
                <button
                  key={item.id}
                  className="w-full flex items-start gap-3 px-3 py-2.5 text-left rounded-lg hover:bg-[#1A1A1A] transition-colors group"
                >
                  <div className="mt-0.5">
                    {item.type === "match" ? (
                      <FileText className="h-4 w-4 text-[#A0A0A0] group-hover:text-[#D4AF37]" />
                    ) : (
                      <BarChart3 className="h-4 w-4 text-[#A0A0A0] group-hover:text-[#D4AF37]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#E8E8E8] truncate group-hover:text-white">{item.title}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Clock className="h-3 w-3 text-[#666]" />
                      <span className="text-xs text-[#666]">{item.date}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* League Analysis Section */}
        <div>
          <button
            onClick={() => toggleSection("leagues")}
            className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-[#A0A0A0] hover:text-white transition-colors rounded-lg hover:bg-[#1A1A1A]"
          >
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span>Análisis de Ligas</span>
            </div>
            {expandedSections.includes("leagues") ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>

          {expandedSections.includes("leagues") && (
            <div className="mt-1 space-y-0.5">
              {leagues.map((league) => (
                <button
                  key={league.id}
                  onClick={() => setSelectedLeague(league.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                    selectedLeague === league.id
                      ? "bg-[#1A3C34]/30 border border-[#D4AF37]/30"
                      : "hover:bg-[#1A1A1A]"
                  )}
                >
                  <div className={cn("transition-colors", league.color)}>{league.icon}</div>
                  <span className="text-sm text-[#E8E8E8]">{league.name}</span>
                  {selectedLeague === league.id && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-[#1F1F1F]">
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg bg-[#1A1A1A]/50">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8962E] flex items-center justify-center">
            <span className="text-xs font-bold text-[#0D0D0D]">UA</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">UEFA Analyst</p>
            <p className="text-xs text-[#666]">Plan Premium</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
        </div>
      </div>
    </aside>
  )
}
