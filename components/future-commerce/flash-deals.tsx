"use client"

import { useState, useEffect } from "react"
import { Sparkles, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { formatPrice } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import { useRouter } from "next/navigation"
import QuickBuyButton from "./quick-buy-button"
import { products } from "@/components/products-data"

interface FlashDealsProps {
  className?: string
}

type FlashDeal = {
  id: string
  name: string
  originalPrice: number
  discountedPrice: number
  image: string
  endTime: Date
  category: string
}

export default function FlashDeals({ className }: FlashDealsProps) {
  const [deals, setDeals] = useState<FlashDeal[]>([])
  const [currentTime, setCurrentTime] = useState(new Date())
  const [currentDealIndex, setCurrentDealIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [mounted])

  useEffect(() => {
    // Sincroniza los deals con los productos reales
    setDeals([
      {
        id: "1",
        name: "Quantum Neural Headset",
        originalPrice: 299.99,
        discountedPrice: 249.99,
        image: products.find(p => p.id === "1")?.images[0] || "",
        endTime: new Date(Date.now() + 3600000), // 1 hour from now
        category: "Wearables",
      },
      {
        id: "2",
        name: "HoloLens Display Glasses",
        originalPrice: 459.99,
        discountedPrice: 379.99,
        image: products.find(p => p.id === "2")?.images[0] || "",
        endTime: new Date(Date.now() + 7200000), // 2 hours from now
        category: "AR/VR",
      },
      {
        id: "5",
        name: "Pulse Fitness Tracker",
        originalPrice: 129.99,
        discountedPrice: 89.99,
        image: products.find(p => p.id === "5")?.images[0] || "",
        endTime: new Date(Date.now() + 10800000), // 3 hours from now
        category: "Wearables",
      },
    ])
  }, [])

  // Rotate deals every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDealIndex((prev) => (prev + 1) % deals.length)
    }, 10000)

    return () => clearInterval(interval)
  }, [deals.length])

  const formatTimeRemaining = (endTime: Date) => {
    const diff = Math.max(0, endTime.getTime() - currentTime.getTime())
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  const calculateDiscountPercentage = (original: number, discounted: number) => {
    return Math.round(((original - discounted) / original) * 100)
  }

  const handleViewDeal = (id: string) => {
    router.push(`/products/${id}`)
  }

  const currentDeal = deals[currentDealIndex] ?? null;

  if (!currentDeal) {
    return (
      <div className={className}>
        <p>No hay ofertas disponibles en este momento.</p>
      </div>
    );
  }

  const discountPercentage = calculateDiscountPercentage(currentDeal.originalPrice, currentDeal.discountedPrice)

  if (!mounted) {
    return (
      <div className={className}>
        <div className="rounded-lg overflow-hidden border border-white/10 bg-black/50 backdrop-blur-sm">
          <div className="p-4 border-b border-white/10 bg-gradient-to-r from-purple-900/30 to-cyan-900/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary animate-pulse" />
              <h3 className="font-medium">Flash Deals</h3>
            </div>
            <Button
              variant="link"
              size="sm"
              className="text-primary p-0 h-auto"
              onClick={() => router.push("/flash-deals")}
            >
              View All
              <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-purple-900/20 to-cyan-900/20">
                <Image
                  src={deals[0].image || "/placeholder.svg"}
                  alt={deals[0].name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  -{calculateDiscountPercentage(deals[0].originalPrice, deals[0].discountedPrice)}%
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">{deals[0].name}</h4>
                <p className="text-sm text-muted-foreground">{deals[0].category}</p>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">{formatPrice(deals[0].discountedPrice)}</span>
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(deals[0].originalPrice)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>Ends in: --:--:--</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" disabled>
                  View Details
                </Button>
                <Button variant="default" className="flex-1" disabled>
                  Quick Buy
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      <div className="rounded-lg overflow-hidden border border-white/10 bg-black/50 backdrop-blur-sm">
        <div className="p-4 border-b border-white/10 bg-gradient-to-r from-purple-900/30 to-cyan-900/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary animate-pulse" />
            <h3 className="font-medium">Flash Deals</h3>
          </div>
          <Button
            variant="link"
            size="sm"
            className="text-primary p-0 h-auto"
            onClick={() => router.push("/flash-deals")}
          >
            View All
            <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </div>

        <div className="p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentDeal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="relative aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-purple-900/20 to-cyan-900/20">
                <Image
                  src={currentDeal.image || "/placeholder.svg"}
                  alt={currentDeal.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  -{discountPercentage}%
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">{currentDeal.name}</h4>
                <p className="text-sm text-muted-foreground">{currentDeal.category}</p>

                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">{formatPrice(currentDeal.discountedPrice)}</span>
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(currentDeal.originalPrice)}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>Ends in: {formatTimeRemaining(currentDeal.endTime)}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => handleViewDeal(currentDeal.id)}>
                  View Details
                </Button>
                <QuickBuyButton product={currentDeal} className="flex-1" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
