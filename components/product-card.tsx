"use client"

import type React from "react"
import type { Product } from "@/components/products-data"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingBag, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils"
import { useCart } from "./cart-provider"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"

interface ProductCardProps {
  product: Product
  index: number
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { addItem } = useCart()
  const { toast } = useToast()

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
      variant: `${product.colors[0].name} / ${product.sizes[0]}`,
    })

    toast({
      title: "Added to cart",
      description: `${product.name} added to your cart.`,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="card-3d group relative overflow-hidden rounded-xl bg-black/20 backdrop-blur-sm border border-white/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.id}`} className="absolute inset-0 z-10">
        <span className="sr-only">View {product.name}</span>
      </Link>

      <div className="card-3d-shine" />

      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-purple-900/20 to-cyan-900/20">
        <Image
          src={product.images && product.images.length > 0 ? product.images[0] : "/placeholder.svg?height=400&width=400"}
          alt={product.name}
          width={400}
          height={400}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        {/* Miniaturas de las siguientes imágenes si existen */}
        {product.images && product.images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {product.images.slice(1, 3).map((img, idx) => (
              <Image
                key={img}
                src={img}
                alt={`${product.name} view ${idx + 2}`}
                width={48}
                height={48}
                className="rounded border border-white/20 bg-black/30 object-cover w-12 h-12 shadow-sm"
              />
            ))}
          </div>
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="absolute bottom-4 left-0 right-0 z-20 px-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <Button className="w-full bg-white text-black hover:bg-white/90" onClick={handleQuickAdd}>
          <ShoppingBag className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </div>

      <div className="card-3d-content p-4">
        <div className="flex items-center gap-2">
          <div className="flex">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "fill-muted-foreground/20 text-muted-foreground/20"}`}
                />
              ))}
          </div>
          <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
        </div>

        <h3 className="mt-2 font-medium text-gradient">{product.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{product.category}</p>

        <div className="mt-2 flex items-center justify-between">
          <div className="font-bold">{formatPrice(product.price)}</div>
          <div className="flex gap-1">
            {product.colors.map((color) => (
              <div
                key={color.id}
                className="h-4 w-4 rounded-full border border-white/20"
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
