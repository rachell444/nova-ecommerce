"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils"
import { useCart } from "./cart-provider"
import { useToast } from "@/hooks/use-toast"
import { useMobile } from "@/hooks/use-mobile"
import { products, type Product } from "@/components/products-data"

interface RelatedProductsProps {
  categoryId: string
  currentProductId: string
}

function getRelatedProducts(categoryId: string, currentProductId: string): Product[] {
  return products.filter((p) => p.id !== currentProductId)
}

export default function RelatedProducts({ categoryId, currentProductId }: RelatedProductsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const { addItem } = useCart()
  const { toast } = useToast()
  const isMobile = useMobile()

  const related = getRelatedProducts(categoryId, currentProductId)

  const handleQuickAdd = (product: Product) => {
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

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef
      const scrollAmount = direction === "left" ? -current.clientWidth / 2 : current.clientWidth / 2
      current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  return (
    <div className="mt-16">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Related Products</h2>
        {!isMobile && (
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => scroll("left")}>
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Scroll left</span>
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => scroll("right")}>
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Scroll right</span>
            </Button>
          </div>
        )}
      </div>
      <div ref={scrollContainerRef} className="mt-6 flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
        {related.map((product) => (
          <div
            key={product.id}
            className="group relative min-w-[250px] max-w-[250px] overflow-hidden rounded-lg border"
          >
            <Link href={`/products/${product.id}`} className="absolute inset-0 z-10">
              <span className="sr-only">View {product.name}</span>
            </Link>
            <div className="relative aspect-square overflow-hidden bg-muted">
              <Image
                src={product.images[0] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <Button
                variant="outline"
                size="icon"
                className="absolute right-2 top-2 z-20 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  // Add to wishlist functionality
                }}
              >
                <Heart className="h-4 w-4" />
                <span className="sr-only">Add to wishlist</span>
              </Button>
            </div>
            <div className="p-4">
              <h3 className="font-medium">{product.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{product.category}</p>
              <div className="mt-2 flex items-center justify-between">
                <div className="font-medium">{formatPrice(product.price)}</div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="z-20"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleQuickAdd(product)
                  }}
                >
                  Quick Add
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
