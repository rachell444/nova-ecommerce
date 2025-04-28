"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

interface ProductGalleryProps {
  images: string[]
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
  const imageContainerRef = useRef<HTMLDivElement>(null)

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleZoomToggle = () => {
    setIsZoomed(!isZoomed)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current || !isZoomed) return

    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect()
    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height

    setZoomPosition({ x, y })
  }

  // Reset zoom when changing images
  useEffect(() => {
    setIsZoomed(false)
  }, [activeIndex])

  return (
    <div className="space-y-4">
      <div
        ref={imageContainerRef}
        className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-purple-900/20 to-cyan-900/20 border border-white/10"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setIsZoomed(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative h-full w-full"
          >
            <Image
              src={images[activeIndex] || "/placeholder.svg"}
              alt={`Product image ${activeIndex + 1}`}
              fill
              className={cn(
                "object-cover object-center transition-all duration-300",
                isZoomed ? "scale-150" : "scale-100",
              )}
              style={
                isZoomed
                  ? {
                      transformOrigin: `${zoomPosition.x * 100}% ${zoomPosition.y * 100}%`,
                    }
                  : undefined
              }
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 flex items-center justify-between p-4">
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-full bg-background/50 backdrop-blur-sm border-white/10 hover:bg-primary/20 transition-colors"
            onClick={handlePrevious}
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Previous image</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-full bg-background/50 backdrop-blur-sm border-white/10 hover:bg-primary/20 transition-colors"
            onClick={handleNext}
          >
            <ChevronRight className="h-5 w-5" />
            <span className="sr-only">Next image</span>
          </Button>
        </div>

        <Button
          variant="outline"
          size="icon"
          className={cn(
            "absolute bottom-4 right-4 h-10 w-10 rounded-full bg-background/50 backdrop-blur-sm border-white/10 hover:bg-primary/20 transition-colors",
            isZoomed && "bg-primary/50 hover:bg-primary/70",
          )}
          onClick={handleZoomToggle}
        >
          <ZoomIn className="h-5 w-5" />
          <span className="sr-only">Zoom image</span>
        </Button>
      </div>

      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
        {images.map((image, index) => (
          <button
            key={index}
            className={cn(
              "relative h-20 w-20 cursor-pointer overflow-hidden rounded-md bg-gradient-to-br from-purple-900/20 to-cyan-900/20 border border-white/10 transition-all duration-300",
              activeIndex === index
                ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                : "opacity-70 hover:opacity-100",
            )}
            onClick={() => setActiveIndex(index)}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`Product thumbnail ${index + 1}`}
              fill
              className="object-cover object-center"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
