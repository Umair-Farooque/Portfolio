"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { RAGService } from "@/lib/rag-service"

interface HeroProps {
  onOpenChat?: () => void
}

export const Hero = ({ onOpenChat }: HeroProps) => {
  const handleDownloadCV = () => {
    const ragService = RAGService.getInstance()
    const cvContent = ragService.generateCVContent()

    const blob = new Blob([cvContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "Muhammad_Umair_Farooq_CV.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden bg-black">
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-32 h-32 border border-white/10 rotate-45 animate-pulse"></div>
        <div
          className="absolute top-40 right-20 w-24 h-24 border border-white/20 rounded-full animate-bounce"
          style={{ animationDuration: "3s" }}
        ></div>
        <div
          className="absolute bottom-32 left-1/4 w-16 h-16 bg-white/5 rotate-12 animate-spin"
          style={{ animationDuration: "8s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/3 w-20 h-20 border-2 border-white/15 transform rotate-45 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-20 right-10 w-28 h-28 border border-white/10 rounded-full animate-ping"
          style={{ animationDuration: "4s" }}
        ></div>
      </div>

      {/* Animated grid lines */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/30 to-transparent animate-pulse"></div>
        <div
          className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-ping"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="container px-4 mx-auto text-center relative z-10 text-white font-mono bg-transparent">
        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-3xl p-8 md:p-12 mb-8 shadow-2xl hover:shadow-white/10 transition-all duration-500 hover:border-white/40">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent leading-tight">
              Muhammad Umair Farooq
            </h1>

            <p className="text-xl md:text-2xl text-white mb-4 max-w-2xl mx-auto leading-relaxed font-medium">
              AI Engineer & Machine Learning Specialist
            </p>

            <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Building intelligent AI solutions with deep learning, LLMs, and MLOps. Passionate about creating
              innovative systems that leverage cutting-edge AI technology.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {["Experience", "Projects", "Certs"].map((item) => (
                <button
                  key={item}
                  className="px-6 py-2 backdrop-blur-sm bg-white/5 border border-white/30 rounded-full text-gray-300 hover:text-white hover:border-white/60 hover:bg-white/10 transition-all duration-300 text-sm font-medium"
                >
                  {item}
                </button>
              ))}
              <button
                onClick={() => scrollToSection("contact")}
                className="px-6 py-2 backdrop-blur-sm bg-white/5 border border-white/30 rounded-full text-gray-300 hover:text-white hover:border-white/60 hover:bg-white/10 transition-all duration-300 text-sm font-medium"
              >
                Skills
              </button>
            </div>
          </div>

          <div className="flex justify-center items-center gap-4 font-mono">
            <Button
              onClick={handleDownloadCV}
              variant="outline"
              size="lg"
              className="border-2 border-white/50 text-gray-200 hover:bg-white/20 hover:text-white px-8 py-6 text-lg transition-all duration-300 hover:scale-105 bg-white/5 backdrop-blur-sm rounded-xl hover:border-white/70"
            >
              <Download className="mr-2 h-5 w-5" />
              Download CV
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
