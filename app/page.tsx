"use client"

import { Suspense } from "react"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Hero } from "@/components/Hero"
import { About } from "@/components/About"
import { Contact } from "@/components/Contact"
import { ChatBot } from "@/components/ChatBot"
import { NetworkBackground } from "@/components/NetworkBackground"
import { FloatingElements } from "@/components/FloatingElements"

const queryClient = new QueryClient()

function SuspendedHero() {
  return (
    <Suspense
      fallback={<div className="h-screen flex items-center justify-center text-amber-400">Loading Hero...</div>}
    >
      <Hero />
    </Suspense>
  )
}

function SuspendedAbout() {
  return (
    <Suspense fallback={<div className="h-64 flex items-center justify-center text-amber-400">Loading About...</div>}>
      <About />
    </Suspense>
  )
}

function SuspendedContact() {
  return (
    <Suspense fallback={<div className="h-64 flex items-center justify-center text-amber-400">Loading Contact...</div>}>
      <Contact />
    </Suspense>
  )
}

function SuspendedChatBot() {
  return (
    <Suspense fallback={<div className="h-64 flex items-center justify-center text-amber-400">Loading ChatBot...</div>}>
      <ChatBot />
    </Suspense>
  )
}

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 relative overflow-hidden">
          <NetworkBackground />
          <FloatingElements />
          <div className="relative z-20">
            <SuspendedHero />
            <SuspendedAbout />
            <SuspendedContact />
            <SuspendedChatBot />
          </div>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  )
}
