"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { MessageSquare, Send, Mic, Paperclip, X, User, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface LiveChatSupportProps {
  className?: string
}

type Message = {
  id: string
  content: string
  sender: "user" | "ai" | "agent"
  timestamp: Date
  status?: "sending" | "sent" | "read"
  image?: string
}

export default function LiveChatSupport({ className }: LiveChatSupportProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "👋 Hi there! How can I help you today?",
      sender: "ai",
      timestamp: new Date(Date.now() - 60000),
    },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const [agentName, setAgentName] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  // Simulate opening chat after a delay - REMOVED AUTOMATIC POPUP
  useEffect(() => {
    // No auto-open
  }, [])

  const handleSendMessage = () => {
    if (!message.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: "user",
      timestamp: new Date(),
      status: "sending",
    }

    setMessages((prev) => [...prev, userMessage])
    setMessage("")

    // Simulate message being sent
    setTimeout(() => {
      setMessages((prev) => prev.map((msg) => (msg.id === userMessage.id ? { ...msg, status: "sent" } : msg)))

      // Simulate AI/agent typing
      setIsTyping(true)

      // Simulate AI/agent response after a delay
      setTimeout(
        () => {
          setIsTyping(false)

          // Determine if AI or human agent should respond
          if (!agentName && messages.length >= 3) {
            // Transfer to human agent
            setAgentName("Sarah")

            setMessages((prev) => [
              ...prev,
              {
                id: Date.now().toString(),
                content:
                  "I'm transferring you to Sarah, one of our customer support specialists who can better assist you.",
                sender: "ai",
                timestamp: new Date(),
              },
            ])

            setTimeout(() => {
              setMessages((prev) => [
                ...prev,
                {
                  id: Date.now().toString(),
                  content:
                    "Hi there! I'm Sarah from customer support. I'll be taking over from our AI assistant. How can I help you today?",
                  sender: "agent",
                  timestamp: new Date(),
                },
              ])
            }, 1500)
          } else {
            // AI or agent response based on message content
            let responseContent = ""

            if (agentName) {
              // Human agent responses
              if (message.toLowerCase().includes("shipping") || message.toLowerCase().includes("delivery")) {
                responseContent =
                  "Our standard shipping takes 3-5 business days. For expedited shipping, you can select that option during checkout for an additional fee."
              } else if (message.toLowerCase().includes("return") || message.toLowerCase().includes("refund")) {
                responseContent =
                  "We offer a 30-day return policy for all unused items in their original packaging. You can initiate a return from your order history page."
              } else if (message.toLowerCase().includes("discount") || message.toLowerCase().includes("coupon")) {
                responseContent =
                  "You can use the code WELCOME15 for 15% off your first purchase. We also have a rewards program that offers exclusive discounts to members."
              } else {
                responseContent =
                  "I'm happy to help with that. Is there anything specific you'd like to know about our products or services?"
              }
            } else {
              // AI responses
              if (message.toLowerCase().includes("hello") || message.toLowerCase().includes("hi")) {
                responseContent = "Hello! How can I assist you today with your shopping experience?"
              } else if (message.toLowerCase().includes("help")) {
                responseContent =
                  "I'd be happy to help! What specifically are you looking for assistance with? Product recommendations, order status, or something else?"
              } else {
                responseContent =
                  "Thanks for your message. I can help with product information, order tracking, and general inquiries. For more complex issues, I can connect you with a human agent."
              }
            }

            setMessages((prev) => [
              ...prev,
              {
                id: Date.now().toString(),
                content: responseContent,
                sender: agentName ? "agent" : "ai",
                timestamp: new Date(),
              },
            ])
          }
        },
        1500 + Math.random() * 1000,
      )
    }, 500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // In a real app, you would upload the file to a server
    // For this demo, we'll just simulate sending an image

    const userMessage: Message = {
      id: Date.now().toString(),
      content: "I've sent an image",
      sender: "user",
      timestamp: new Date(),
      status: "sending",
      image: "/placeholder.svg?height=200&width=300",
    }

    setMessages((prev) => [...prev, userMessage])

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className={cn("relative", className)}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={isMinimized ? { opacity: 1, y: 0, height: "auto" } : { opacity: 0, y: 20, height: "auto" }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: 20, height: "auto" }}
            transition={{ duration: 0.2 }}
            className={cn(
              "fixed bottom-4 right-4 z-50 w-full max-w-md bg-black/90 backdrop-blur-lg border border-white/10 shadow-xl rounded-xl overflow-hidden",
              isMinimized ? "h-12" : "max-h-[calc(100vh-2rem)]"
            )}
          >
            {isMinimized ? (
              <Button
                className="bg-gradient-futuristic rounded-full p-3 h-auto w-auto shadow-lg"
                onClick={() => setIsMinimized(false)}
              >
                <MessageSquare className="h-6 w-6" />
              </Button>
            ) : (
              <div className="rounded-lg overflow-hidden border border-white/10 bg-black/90 backdrop-blur-xl shadow-xl flex flex-col">
                {/* Chat header */}
                <div className="p-3 border-b border-white/10 bg-gradient-to-r from-purple-900/50 to-cyan-900/50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-futuristic flex items-center justify-center">
                      {agentName ? <User className="h-4 w-4 text-white" /> : <Bot className="h-4 w-4 text-white" />}
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">
                        {agentName ? `${agentName} (Support Agent)` : "AI Assistant"}
                      </h3>
                      <p className="text-xs text-white/70">{agentName ? "Online" : "Always available"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 rounded-full hover:bg-white/10"
                      onClick={() => setIsMinimized(true)}
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                      </svg>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 rounded-full hover:bg-white/10"
                      onClick={() => setIsOpen(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Chat messages */}
                <div className="flex-1 overflow-y-auto p-3 max-h-[350px] space-y-3">
                  {messages.map((msg) => (
                    <div key={msg.id} className={cn("flex", msg.sender === "user" ? "justify-end" : "justify-start")}>
                      <div
                        className={cn(
                          "max-w-[80%] rounded-lg px-3 py-2",
                          msg.sender === "user"
                            ? "bg-primary text-primary-foreground"
                            : msg.sender === "agent"
                              ? "bg-cyan-600 text-white"
                              : "bg-white/10 text-white",
                        )}
                      >
                        {msg.image && (
                          <div className="mb-2 rounded-md overflow-hidden">
                            <Image
                              src={msg.image || "/placeholder.svg"}
                              alt="Uploaded image"
                              width={200}
                              height={150}
                              className="object-cover"
                            />
                          </div>
                        )}
                        <p className="text-sm">{msg.content}</p>
                        <div
                          className={cn(
                            "flex items-center justify-end gap-1 mt-1",
                            msg.sender === "user" ? "text-primary-foreground/70" : "text-white/70",
                          )}
                        >
                          <span className="text-[10px]">
                            {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </span>
                          {msg.sender === "user" && msg.status && (
                            <span className="text-[10px]">
                              {msg.status === "sending" && "●"}
                              {msg.status === "sent" && "✓"}
                              {msg.status === "read" && "✓✓"}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] rounded-lg px-3 py-2 bg-white/10 text-white">
                        <div className="flex items-center gap-1">
                          <span
                            className="w-2 h-2 rounded-full bg-white/70 animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          />
                          <span
                            className="w-2 h-2 rounded-full bg-white/70 animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          />
                          <span
                            className="w-2 h-2 rounded-full bg-white/70 animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Chat input */}
                <div className="p-3 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full hover:bg-white/10"
                            onClick={handleFileUpload}
                          >
                            <Paperclip className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          <p>Attach file</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />

                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type a message..."
                      className="flex-1 bg-white/5 border-white/10 focus-visible:ring-primary"
                    />

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full hover:bg-white/10"
                            onClick={() => alert("Voice input would be activated here")}
                          >
                            <Mic className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          <p>Voice input</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <Button
                      size="icon"
                      className="h-8 w-8 rounded-full bg-gradient-futuristic"
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <motion.div 
          className="fixed bottom-8 right-8 z-50" 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <div className="relative inline-block">
            <Button
              className="bg-gradient-futuristic rounded-full p-2 h-auto w-auto shadow-lg hover:shadow-accent/20 hover:scale-105 transition-all"
              onClick={() => setIsOpen(true)}
            >
              <div className="flex items-center gap-2 px-1">
                <Bot className="h-5 w-5" />
                <span className="font-medium text-sm">AI Assistant</span>
              </div>
            </Button>
            {/* Indicador de disponibilidad */}
            <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></span>
          </div>
        </motion.div>
      )}
    </div>
  )
}
