"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, X, Search, Camera, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface ImageSearchProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function ImageSearch({ open, onOpenChange }: ImageSearchProps) {
  const [dragActive, setDragActive] = useState(false)
  const [image, setImage] = useState<string | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [searchProgress, setSearchProgress] = useState(0)
  const [similarProducts, setSimilarProducts] = useState<any[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    // Check if file is an image
    if (!file.type.match("image.*")) {
      alert("Please upload an image file")
      return
    }

    // Create a URL for the image
    const reader = new FileReader()
    reader.onload = (e) => {
      setImage(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleCameraCapture = () => {
    // In a real implementation, this would access the device camera
    alert("Camera access would be requested here")
  }

  const handleSearch = async () => {
    if (!image) return

    setIsSearching(true)
    setSimilarProducts([])

    // Simulate progress
    const interval = setInterval(() => {
      setSearchProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 5
      })
    }, 100)

    // Simulate API call delay
    setTimeout(() => {
      clearInterval(interval)
      setSearchProgress(100)

      // Mock similar products
      setSimilarProducts([
        {
          id: "1",
          name: "Quantum Neural Headset",
          price: 299.99,
          images: ["/placeholder.svg?height=400&width=400"],
          category: "Wearables",
          similarity: 98,
        },
        {
          id: "2",
          name: "HoloLens Display Glasses",
          price: 459.99,
          images: ["/placeholder.svg?height=400&width=400"],
          category: "AR/VR",
          similarity: 87,
        },
        {
          id: "5",
          name: "Pulse Fitness Tracker",
          price: 129.99,
          images: ["/placeholder.svg?height=400&width=400"],
          category: "Wearables",
          similarity: 76,
        },
        {
          id: "8",
          name: "Vortex Gaming Mouse",
          price: 79.99,
          images: ["/placeholder.svg?height=400&width=400"],
          category: "Peripherals",
          similarity: 65,
        },
      ])

      setIsSearching(false)
    }, 2500)
  }

  const resetSearch = () => {
    setImage(null)
    setIsSearching(false)
    setSearchProgress(0)
    setSimilarProducts([])
  }

  const viewProduct = (id: string) => {
    router.push(`/products/${id}`)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 gap-0 bg-black/90 backdrop-blur-xl border-white/10 overflow-hidden">
        <DialogHeader className="p-6 border-b border-white/10">
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
            Visual Search
          </DialogTitle>
        </DialogHeader>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {!image ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div
                  className={cn(
                    "border-2 border-dashed rounded-lg p-12 text-center transition-colors",
                    dragActive ? "border-primary bg-primary/10" : "border-white/10 hover:border-white/20",
                  )}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => inputRef.current?.click()}
                >
                  <input ref={inputRef} type="file" className="hidden" accept="image/*" onChange={handleChange} />

                  <div className="flex flex-col items-center justify-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                      <Upload className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <p className="text-lg font-medium">Upload an image to search</p>
                      <p className="text-sm text-muted-foreground mt-1">Drag and drop or click to upload</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-white/10" />
                  <span className="text-sm text-muted-foreground">or</span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>

                <Button
                  variant="outline"
                  className="w-full flex items-center gap-2 neon-border"
                  onClick={handleCameraCapture}
                >
                  <Camera className="h-4 w-4" />
                  Take a Photo
                </Button>
              </motion.div>
            ) : similarProducts.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-start gap-4">
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-white/10">
                    <Image src={image || "/placeholder.svg"} alt="Uploaded image" fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium">Visual Search Results</h3>
                    <p className="text-sm text-muted-foreground">
                      We found {similarProducts.length} products that match your image
                    </p>
                    <Button variant="ghost" size="sm" className="mt-2 h-8 px-2 text-xs" onClick={resetSearch}>
                      <X className="h-3 w-3 mr-1" />
                      Clear Search
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {similarProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="relative rounded-lg border border-white/10 overflow-hidden group cursor-pointer"
                      onClick={() => viewProduct(product.id)}
                    >
                      <div className="absolute top-2 right-2 z-10 bg-black/80 rounded-full px-2 py-1 text-xs font-medium">
                        {product.similarity}% Match
                      </div>
                      <div className="relative aspect-square">
                        <Image
                          src={product.images[0] || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform group-hover:scale-110 duration-500"
                        />
                      </div>
                      <div className="p-3">
                        <h4 className="font-medium truncate">{product.name}</h4>
                        <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-start gap-4">
                  <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-white/10">
                    <Image src={image || "/placeholder.svg"} alt="Uploaded image" fill className="object-cover" />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6 bg-black/50 backdrop-blur-sm"
                      onClick={resetSearch}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium">Ready to search</h3>
                    <p className="text-sm text-muted-foreground">Our AI will find products that match your image</p>
                    <Button className="mt-4 bg-gradient-futuristic" onClick={handleSearch} disabled={isSearching}>
                      {isSearching ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing Image...
                        </>
                      ) : (
                        <>
                          <Search className="mr-2 h-4 w-4" />
                          Find Similar Products
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {isSearching && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Analyzing image...</span>
                      <span>{searchProgress}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-purple-500 to-cyan-500"
                        initial={{ width: "0%" }}
                        animate={{ width: `${searchProgress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {searchProgress < 30 && "Detecting objects..."}
                      {searchProgress >= 30 && searchProgress < 60 && "Analyzing product features..."}
                      {searchProgress >= 60 && searchProgress < 90 && "Matching with catalog..."}
                      {searchProgress >= 90 && "Finalizing results..."}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  )
}
