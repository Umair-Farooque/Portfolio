"use client"

import type React from "react"
import { RAGService } from "@/lib/rag-service"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

interface ChatBotProps {
  isOpen: boolean
  onToggle: () => void
}

export const ChatBot = ({ isOpen, onToggle }: ChatBotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hi! I'm an AI assistant trained on the owner's CV and experience. Ask me anything about their background, skills, projects, or experience!",
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

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
      await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 1200))

      const ragService = RAGService.getInstance()
      const response = ragService.generateResponse(currentQuery)

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        isUser: false,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I encountered an error processing your question. Please try again.",
        isUser: false,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
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

  if (!isOpen) {
    return (
      <Button
        onClick={onToggle}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-amber-500 hover:bg-amber-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50 border border-amber-400/50 animate-pulse"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[500px] bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border-2 border-amber-200/50 dark:border-amber-500/30 shadow-2xl z-50 flex flex-col overflow-hidden">
      <CardHeader className="pb-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
            <div className="p-2 bg-amber-500/20 rounded-full border border-amber-300/50">
              <Bot className="h-4 w-4 text-amber-600" />
            </div>
            AI Assistant
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="h-8 w-8 p-0 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-amber-300/50 scrollbar-track-transparent"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
              <div className={`flex items-start gap-2 max-w-[80%] ${message.isUser ? "flex-row-reverse" : "flex-row"}`}>
                <div
                  className={`p-2 rounded-full ${message.isUser ? "bg-amber-500/20 border border-amber-300/50" : "bg-pink-500/20 border border-pink-300/50"}`}
                >
                  {message.isUser ? (
                    <User className="h-4 w-4 text-amber-600" />
                  ) : (
                    <Bot className="h-4 w-4 text-pink-600" />
                  )}
                </div>
                <div
                  className={`p-3 rounded-xl transition-all duration-200 hover:scale-[1.02] ${
                    message.isUser
                      ? "bg-amber-500 text-white shadow-lg border border-amber-400/50"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200/50 dark:border-gray-600/50"
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
                <div className="p-2 bg-pink-500/20 rounded-full border border-pink-300/50">
                  <Bot className="h-4 w-4 text-pink-600" />
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-xl border border-gray-200/50 dark:border-gray-600/50">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50/30 dark:bg-gray-700/30 backdrop-blur-sm">
          <div className="flex gap-2">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about experience, skills, projects..."
              className="flex-1 p-3 bg-white/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 rounded-xl focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none text-sm backdrop-blur-sm"
              rows={1}
              style={{ minHeight: "44px", maxHeight: "88px" }}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              size="sm"
              className="bg-amber-500 hover:bg-amber-600 text-white transition-all duration-300 hover:scale-105 border border-amber-400/50 rounded-xl px-4"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
