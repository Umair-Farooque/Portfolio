"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface HeroProps {
  onOpenChat?: () => void
}

export const Hero = ({ onOpenChat }: HeroProps) => {
  const handleDownloadCV = () => {
    const a = document.createElement("a")
    a.href = "/cv.pdf"
    a.download = "Muhammad_Umair_Farooq_CV.pdf"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <section className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden bg-black">
      {/* Glowing Background Shapes */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-32 h-32 border border-cyan-400/30 rotate-45 animate-pulse shadow-[0_0_50px_20px_rgba(34,211,238,0.6)]"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-pink-400/40 rounded-full animate-bounce shadow-[0_0_60px_25px_rgba(236,72,153,0.6)]" style={{ animationDuration: "3s" }}></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 bg-blue-500/30 rotate-12 animate-spin shadow-[0_0_50px_20px_rgba(59,130,246,0.6)]" style={{ animationDuration: "8s" }}></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 border-2 border-emerald-400/30 rotate-45 animate-pulse shadow-[0_0_55px_25px_rgba(16,185,129,0.6)]" style={{ animationDelay: "1s" }}></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 border border-fuchsia-400/40 rounded-full animate-ping shadow-[0_0_70px_30px_rgba(217,70,239,0.6)]" style={{ animationDuration: "4s" }}></div>

        {/* Grid Lines with Multicolor Glow */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent animate-pulse shadow-[0_0_30px_10px_rgba(34,211,238,0.5)]"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-pink-400/40 to-transparent animate-pulse shadow-[0_0_30px_10px_rgba(236,72,153,0.5)]" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent animate-pulse shadow-[0_0_30px_10px_rgba(59,130,246,0.5)]" style={{ animationDelay: "1s" }}></div>
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent animate-pulse shadow-[0_0_30px_10px_rgba(16,185,129,0.5)]" style={{ animationDelay: "3s" }}></div>

        {/* Multicolor glowing floating particles */}
        {[...Array(14)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full animate-ping"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
              background: `radial-gradient(circle, 
                ${["#22d3ee", "#ec4899", "#3b82f6", "#10b981"][i % 4]} 40%, 
                transparent 100%)`,
              boxShadow: `0 0 25px ${["#22d3ee", "#ec4899", "#3b82f6", "#10b981"][i % 4]}`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="container px-4 mx-auto text-center relative z-10 text-white font-mono">
        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-3xl p-8 md:p-12 mb-8 shadow-[0_0_80px_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_100px_40px_rgba(255,255,255,0.25)] transition-all duration-500 hover:border-white/40">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-pink-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent leading-tight drop-shadow-[0_0_25px_rgba(255,255,255,0.6)] animate-gradient-x">
              Muhammad Umair Farooq
            </h1>
            <p className="text-xl md:text-2xl text-white mb-4 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
              AI Engineer & Machine Learning Specialist
            </p>
            <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              Building intelligent AI solutions with deep learning, LLMs, and MLOps. Passionate about creating
              innovative systems that leverage cutting-edge AI technology.
            </p>

            <div className="flex justify-center items-center gap-4 font-mono">
              <Button
                onClick={handleDownloadCV}
                variant="outline"
                size="lg"
                className="border-2 border-pink-400/50 text-pink-200 hover:bg-pink-400/20 hover:text-white px-8 py-6 text-lg transition-all duration-300 hover:scale-105 bg-white/5 backdrop-blur-sm rounded-xl hover:border-pink-300 shadow-[0_0_30px_12px_rgba(236,72,153,0.6)]"
              >
                <Download className="mr-2 h-5 w-5" />
                Download CV
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
