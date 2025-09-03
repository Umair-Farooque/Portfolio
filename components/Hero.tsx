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
    <section className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden">
      <div className="container px-4 mx-auto text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-xl bg-white/5 border border-cyan-400/20 rounded-3xl p-8 md:p-12 mb-8 shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500 hover:border-cyan-400/40">
            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent leading-tight">
              Muhammad Umair Farooq
            </h1>

            <p className="text-xl md:text-2xl text-cyan-300 mb-4 max-w-2xl mx-auto leading-relaxed font-medium">
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
                  className="px-6 py-2 backdrop-blur-sm bg-white/5 border border-cyan-400/30 rounded-full text-cyan-300 hover:text-white hover:border-cyan-400/60 hover:bg-white/10 transition-all duration-300 text-sm font-medium"
                >
                  {item}
                </button>
              ))}
              <button
                onClick={() => scrollToSection("contact")}
                className="px-6 py-2 backdrop-blur-sm bg-white/5 border border-cyan-400/30 rounded-full text-cyan-300 hover:text-white hover:border-cyan-400/60 hover:bg-white/10 transition-all duration-300 text-sm font-medium"
              >
                Skills
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-16">
            {[
              { name: "Python", icon: "🐍" },
              { name: "PyTorch", icon: "🔥" },
              { name: "LangChain", icon: "🔗" },
              { name: "FastAPI", icon: "⚡" },
            ].map((skill) => (
              <div
                key={skill.name}
                className="backdrop-blur-sm bg-white/5 border border-cyan-400/20 rounded-xl p-4 text-center hover:border-cyan-400/40 hover:bg-white/10 transition-all duration-300 hover:scale-105 shadow-lg group"
              >
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                  {skill.icon}
                </div>
                <span className="font-medium text-gray-200 group-hover:text-cyan-300 transition-colors">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center gap-4">
            <Button
              onClick={handleDownloadCV}
              variant="outline"
              size="lg"
              className="border-2 border-cyan-400/50 text-gray-200 hover:bg-cyan-500/20 hover:text-white px-8 py-6 text-lg transition-all duration-300 hover:scale-105 bg-white/5 backdrop-blur-sm rounded-xl hover:border-cyan-400/70"
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
