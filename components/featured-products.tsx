"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Heart, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils"
import { useCart } from "./cart-provider"
import { useToast } from "@/hooks/use-toast"
import { useMobile } from "@/hooks/use-mobile"
import { motion } from "framer-motion"
import { products as allProducts, type Product } from "@/components/products-data"

// Mock data - in a real app, this would come from an API
const featuredProducts: Product[] = allProducts.filter(p => ["1","2","3","4","5","6"].includes(p.id))

export default function FeaturedProducts() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const { addItem } = useCart()
  const { toast } = useToast()
  const isMobile = useMobile()
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)

  const handleQuickAdd = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
      variant: `${product.colors?.[0]?.name || ""} / ${product.sizes?.[0] || ""}`,
    })

    toast({
      title: "Added to cart",
      description: `${product.name} added to your cart.`,
    })
  }

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef
      const scrollAmount = direction === "left" ? -current.clientWidth / 2 : current.clientWidth / 2
      current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  return (
    <div className="relative mt-12">
      <div className="flex items-center justify-between mb-8">
        <motion.h2
          className="text-3xl font-bold"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Featured Products
        </motion.h2>

        {!isMobile && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full border-white/10 bg-background/50 backdrop-blur-sm hover:bg-primary/20 transition-colors"
              onClick={() => scroll("left")}
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Scroll left</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full border-white/10 bg-background/50 backdrop-blur-sm hover:bg-primary/20 transition-colors"
              onClick={() => scroll("right")}
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Scroll right</span>
            </Button>
          </div>
        )}
      </div>

      <div ref={scrollContainerRef} className="flex space-x-6 overflow-x-auto pb-8 pt-4 scrollbar-hide">
        {featuredProducts.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card-3d group relative min-w-[280px] max-w-[280px] overflow-hidden rounded-xl bg-black/20 backdrop-blur-sm border border-white/10"
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            <Link href={`/products/${product.id}`} className="absolute inset-0 z-10">
              <span className="sr-only">View {product.name}</span>
            </Link>

            <div className="card-3d-shine" />

            <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-purple-900/20 to-cyan-900/20">
              <Image
                src={product.images[0] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {product.isNew && (
                <div className="absolute top-2 left-2 z-20 px-2 py-1 text-xs font-medium bg-gradient-futuristic text-white rounded-full">
                  NEW
                </div>
              )}

              <Button
                variant="outline"
                size="icon"
                className="absolute right-2 top-2 z-20 h-8 w-8 rounded-full bg-background/50 backdrop-blur-sm border-white/10 transition-transform duration-300 hover:scale-110"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  // Add to wishlist functionality
                }}
              >
                <Heart className="h-4 w-4" />
                <span className="sr-only">Add to wishlist</span>
              </Button>

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="absolute bottom-4 left-0 right-0 z-20 px-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <Button
                  className="w-full bg-white text-black hover:bg-white/90"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleQuickAdd(product)
                  }}
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </div>

            <div className="card-3d-content p-4">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <svg
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-primary" : "text-muted"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
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
        ))}
      </div>
    </div>
  )
}
