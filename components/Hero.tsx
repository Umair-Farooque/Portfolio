"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, MessageCircle, Download } from "lucide-react"

interface HeroProps {
  onOpenChat?: () => void
}

export const Hero = ({ onOpenChat }: HeroProps) => {
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

            <div className="mb-8">
              <div
                className="max-w-md mx-auto backdrop-blur-sm bg-white/5 border border-cyan-400/30 rounded-full p-4 cursor-pointer hover:border-cyan-400/50 transition-all duration-300 hover:bg-white/10"
                onClick={onOpenChat}
              >
                <div className="flex items-center justify-center text-cyan-300 hover:text-cyan-200 transition-colors">
                  <MessageCircle className="mr-3 h-5 w-5" />
                  <span className="text-lg">Talk to my AI</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {["Experience", "Projects", "Skills", "Certs", "AboutMe"].map((item) => (
                <button
                  key={item}
                  className="px-6 py-2 backdrop-blur-sm bg-white/5 border border-cyan-400/30 rounded-full text-cyan-300 hover:text-white hover:border-cyan-400/60 hover:bg-white/10 transition-all duration-300 text-sm font-medium"
                >
                  {item}
                </button>
              ))}
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

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              onClick={onOpenChat}
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-8 py-6 text-lg shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105 border border-cyan-400/50 rounded-xl backdrop-blur-sm"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Chat with AI Me
            </Button>

            <Button
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

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="p-2 backdrop-blur-sm bg-white/5 border border-cyan-400/30 rounded-full">
          <ArrowDown className="h-6 w-6 text-cyan-400" />
        </div>
      </div>
    </section>
  )
}
