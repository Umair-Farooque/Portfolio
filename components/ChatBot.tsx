"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"

// Types
interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

interface ChatBotProps {
  isOpen?: boolean
  onToggle?: () => void
}

export const ChatBot = ({ isOpen = false, onToggle }: ChatBotProps) => {
  const [internalOpen, setInternalOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "👋 Hi! I'm an AI assistant trained on Muhammad Umair Farooq's CV. Ask me about his background, skills, or projects!",
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const isOpen_ = onToggle ? isOpen : internalOpen
  const toggle = onToggle || (() => setInternalOpen(!internalOpen))

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Call API with history
  const fetchAIResponse = async (messages: { role: "user" | "assistant"; content: string }[]) => {
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages }),
      })

      if (!res.ok) throw new Error("LLM API failed")
      const data = await res.json()
      return data.reply
    } catch (err) {
      return "⚠️ Sorry, I couldn’t fetch an answer. Please try again."
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const currentQuery = inputValue
    setInputValue("")
    setIsTyping(true)

    try {
      // Format history for LLM
      const formattedMessages = [
        ...messages.map((m) => ({
          role: m.isUser ? "user" : "assistant",
          content: m.content,
        })),
        { role: "user", content: currentQuery },
      ]

      const response = await fetchAIResponse(formattedMessages)

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        isUser: false,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen_) {
    return (
      <Button
        onClick={toggle}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-white/20 hover:bg-white/30 
        shadow-2xl hover:shadow-white/25 transition-all duration-300 hover:scale-110 
        z-50 border border-white/50 backdrop-blur-sm"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </Button>
    )
  }

  return (
    <Card
      className="fixed bottom-0 right-0 w-full sm:w-96 max-h-[85vh] sm:h-[500px] 
      rounded-t-2xl sm:rounded-2xl 
      backdrop-blur-2xl bg-white/5 border-2 border-white/30 shadow-2xl z-50 
      flex flex-col overflow-hidden transition-all duration-500"
    >
      {/* Header */}
      <CardHeader className="pb-3 border-b border-white/20 bg-white/5 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-gray-200">
            <div className="p-2 bg-white/20 rounded-full border border-white/40 shadow-lg shadow-white/20">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <span className="text-white font-bold">AI Assistant</span>
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggle}
            className="h-8 w-8 p-0 hover:bg-red-500/20 hover:text-red-400 
            transition-all duration-300 rounded-lg border border-transparent 
            hover:border-red-400/30"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      {/* Chat Content */}
      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
        <div
          className="flex-1 overflow-y-auto p-4 space-y-4 
          scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent"
        >
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
              <div className={`flex items-start gap-2 max-w-[80%] ${message.isUser ? "flex-row-reverse" : "flex-row"}`}>
                <div
                  className={`p-2 rounded-full backdrop-blur-sm ${
                    message.isUser
                      ? "bg-white/20 border border-white/40"
                      : "bg-gray-500/30 border border-gray-400/40"
                  } shadow-lg`}
                >
                  {message.isUser ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <Bot className="h-4 w-4 text-gray-300" />
                  )}
                </div>
                <div
                  className={`p-3 rounded-xl transition-all duration-200 hover:scale-[1.02] backdrop-blur-sm ${
                    message.isUser
                      ? "bg-white/80 text-black shadow-lg border border-white/50 hover:shadow-white/25"
                      : "bg-white/10 text-gray-200 border border-white/20 shadow-lg hover:bg-white/15"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start gap-2">
                <div className="p-2 bg-gray-500/30 rounded-full border border-gray-400/40 backdrop-blur-sm shadow-lg">
                  <Bot className="h-4 w-4 text-gray-300" />
                </div>
                <div className="bg-white/10 p-3 rounded-xl border border-white/20 backdrop-blur-sm shadow-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/20 bg-white/5 backdrop-blur-sm">
          <div className="flex gap-2">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about Umair’s skills, projects, or experience..."
              className="flex-1 p-3 backdrop-blur-sm bg-white/10 border border-white/30 rounded-xl 
              focus:border-white/60 focus:outline-none focus:ring-2 focus:ring-white/20 
              transition-all duration-300 text-gray-200 placeholder-gray-400 resize-none text-sm 
              hover:bg-white/15"
              rows={1}
              style={{ minHeight: "44px", maxHeight: "88px" }}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              size="sm"
              className="bg-white/20 hover:bg-white/30 text-white transition-all duration-300 
              hover:scale-105 border border-white/50 rounded-xl px-4 shadow-lg hover:shadow-white/25"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
