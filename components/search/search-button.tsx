"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import SearchDialog from "@/components/search/search-dialog"
import { cn } from "@/lib/utils"

interface SearchButtonProps {
  className?: string
  variant?: "default" | "ghost" | "outline"
}

export default function SearchButton({ className, variant = "ghost" }: SearchButtonProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        variant={variant}
        size="icon"
        className={cn("relative overflow-hidden group", className)}
        onClick={() => setOpen(true)}
      >
        <Search className="h-5 w-5" />
        <span className="sr-only">Search</span>
        <span className="absolute inset-0 w-full h-full bg-primary/10 scale-0 rounded-full group-hover:scale-100 transition-transform duration-300" />
      </Button>
      <SearchDialog open={open} onOpenChange={setOpen} />
    </>
  )
}
