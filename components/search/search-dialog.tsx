"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Loader2, Search, Mic, Sparkles, Clock, TrendingUp, X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { searchProducts, getAISuggestions } from "@/lib/search"
import { Badge } from "@/components/ui/badge"
import { useDebounce } from "@/hooks/use-debounce"
import { useLocalStorage } from "@/hooks/use-local-storage"
import Image from "next/image"

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type SearchState = "idle" | "searching" | "success" | "error"

export default function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("")
  const [searchState, setSearchState] = useState<SearchState>("idle")
  const [results, setResults] = useState<any[]>([])
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([])
  const [isListening, setIsListening] = useState(false)
  const [recentSearches, setRecentSearches] = useLocalStorage<string[]>("recent-searches", [])
  const debouncedQuery = useDebounce(query, 300)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const recognitionRef = useRef<any>(null)

  // Trending searches
  const trendingSearches = [
    "Quantum Neural Headset",
    "AR Glasses",
    "Smart Home",
    "Wireless Earbuds",
    "Holographic Display",
  ]

  // Handle search when debounced query changes
  useEffect(() => {
    if (!debouncedQuery) {
      setResults([])
      setSearchState("idle")
      return
    }

    const search = async () => {
      setSearchState("searching")
      try {
        // Search products
        const searchResults = await searchProducts(debouncedQuery)
        setResults(searchResults)

        // Get AI suggestions
        const suggestions = await getAISuggestions(debouncedQuery)
        setAiSuggestions(suggestions)

        setSearchState("success")
      } catch (error) {
        console.error("Search error:", error)
        setSearchState("error")
      }
    }

    search()
  }, [debouncedQuery])

  // Focus input when dialog opens
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [open])

  // Handle voice search
  const startVoiceSearch = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      alert("Voice search is not supported in your browser")
      return
    }

    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition
    recognitionRef.current = new SpeechRecognition()
    recognitionRef.current.continuous = false
    recognitionRef.current.interimResults = false
    recognitionRef.current.lang = "en-US"

    recognitionRef.current.onstart = () => {
      setIsListening(true)
    }

    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      setQuery(transcript)
      setIsListening(false)
    }

    recognitionRef.current.onerror = (event) => {
      console.error("Speech recognition error", event.error)
      setIsListening(false)
    }

    recognitionRef.current.onend = () => {
      setIsListening(false)
    }

    recognitionRef.current.start()
  }

  // Handle search selection
  const handleSelect = (value: string) => {
    // Add to recent searches
    if (!recentSearches.includes(value)) {
      setRecentSearches([value, ...recentSearches.slice(0, 4)])
    }

    // Navigate to search results page
    router.push(`/products?search=${encodeURIComponent(value)}`)
    onOpenChange(false)
  }

  // Clear recent searches
  const clearRecentSearches = (e: React.MouseEvent) => {
    e.stopPropagation()
    setRecentSearches([])
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 gap-0 bg-black/90 backdrop-blur-xl border-white/10">
        <Command className="rounded-lg border-0 bg-transparent">
          <div className="flex items-center border-b border-white/10 px-4">
            <Search className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
            <CommandInput
              ref={inputRef}
              placeholder="Search for products, categories, and more..."
              className="flex h-14 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              value={query}
              onValueChange={setQuery}
            />
            {query && (
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setQuery("")}>
                <X className="h-4 w-4" />
              </Button>
            )}
            <div className="h-6 w-px bg-white/10 mx-2" />
            <Button
              variant="ghost"
              size="icon"
              className={cn("h-8 w-8 relative overflow-hidden", isListening && "text-primary")}
              onClick={startVoiceSearch}
            >
              <Mic className="h-4 w-4" />
              {isListening && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-primary/20"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                />
              )}
            </Button>
          </div>
          <CommandList className="max-h-[400px] overflow-auto p-2">
            {searchState === "searching" && (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}

            {searchState === "idle" && (
              <>
                {recentSearches.length > 0 && (
                  <CommandGroup
                    heading={
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>Recent Searches</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 text-xs text-muted-foreground"
                          onClick={clearRecentSearches}
                        >
                          Clear
                        </Button>
                      </div>
                    }
                  >
                    {recentSearches.map((search) => (
                      <CommandItem
                        key={search}
                        value={search}
                        onSelect={handleSelect}
                        className="flex items-center justify-between"
                      >
                        <span>{search}</span>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}

                <CommandGroup
                  heading={
                    <div className="flex items-center">
                      <TrendingUp className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>Trending Searches</span>
                    </div>
                  }
                >
                  <div className="flex flex-wrap gap-2 p-2">
                    {trendingSearches.map((search) => (
                      <Badge
                        key={search}
                        variant="outline"
                        className="cursor-pointer hover:bg-primary/20 transition-colors"
                        onClick={() => handleSelect(search)}
                      >
                        {search}
                      </Badge>
                    ))}
                  </div>
                </CommandGroup>
              </>
            )}

            {searchState === "success" && (
              <>
                {aiSuggestions.length > 0 && (
                  <CommandGroup
                    heading={
                      <div className="flex items-center">
                        <Sparkles className="mr-2 h-4 w-4 text-primary" />
                        <span>AI Suggestions</span>
                      </div>
                    }
                  >
                    <div className="flex flex-wrap gap-2 p-2">
                      {aiSuggestions.map((suggestion) => (
                        <Badge
                          key={suggestion}
                          className="cursor-pointer bg-primary/20 hover:bg-primary/30 text-primary transition-colors"
                          onClick={() => handleSelect(suggestion)}
                        >
                          {suggestion}
                        </Badge>
                      ))}
                    </div>
                  </CommandGroup>
                )}

                {results.length > 0 ? (
                  <CommandGroup heading="Products">
                    <AnimatePresence>
                      {results.map((product, index) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.05 }}
                        >
                          <CommandItem value={product.name} onSelect={handleSelect} className="py-2">
                            <div className="flex items-center gap-3">
                              <div className="relative h-12 w-12 overflow-hidden rounded-md bg-gradient-to-br from-purple-900/20 to-cyan-900/20">
                                <Image
                                  src={product.images[0] || "/placeholder.svg"}
                                  alt={product.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex flex-col">
                                <span className="font-medium">{product.name}</span>
                                <span className="text-sm text-muted-foreground">{product.category}</span>
                              </div>
                            </div>
                          </CommandItem>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </CommandGroup>
                ) : (
                  <CommandEmpty>
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Search className="h-8 w-8 text-muted-foreground mb-4" />
                      <p className="text-lg font-medium">No results found</p>
                      <p className="text-sm text-muted-foreground">
                        Try searching for something else or check your spelling
                      </p>
                    </div>
                  </CommandEmpty>
                )}
              </>
            )}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  )
}
