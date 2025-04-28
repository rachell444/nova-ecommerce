"use client"

import { useState } from "react"
import { ShoppingBag, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { formatPrice } from "@/lib/utils"
import { useCart } from "./cart-provider"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import QuickBuyButton from "./future-commerce/quick-buy-button"
import WishlistButton from "./future-commerce/wishlist-button"
import ImageSearch from "./future-commerce/image-search"

interface ProductInfoProps {
  product: any
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [quantity, setQuantity] = useState(1)
  const [isImageSearchOpen, setIsImageSearchOpen] = useState(false)
  const { addItem } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity,
      variant: `${selectedColor.name} / ${selectedSize}`,
    })

    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.name} added to your cart.`,
    })
  }

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center gap-4">
          {product.isNew && (
            <span className="px-2 py-1 text-xs font-medium bg-gradient-futuristic text-white rounded-full">NEW</span>
          )}
          <div className="flex items-center gap-1">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < product.rating ? "fill-primary text-primary" : "fill-muted-foreground/20 text-muted-foreground/20"}`}
                />
              ))}
            <span className="ml-2 text-sm text-muted-foreground">{product.reviewCount} reviews</span>
          </div>
        </div>

        <h1 className="mt-2 text-4xl font-bold text-gradient">{product.name}</h1>
        <p className="mt-2 text-xl text-muted-foreground">{product.category}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl font-bold"
      >
        {formatPrice(product.price)}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-6"
      >
        <div>
          <h3 className="text-sm font-medium mb-3">Color</h3>
          <RadioGroup
            value={selectedColor.id}
            onValueChange={(value) => setSelectedColor(product.colors.find((c) => c.id === value))}
            className="flex gap-3"
          >
            {product.colors.map((color) => (
              <div key={color.id} className="flex items-center gap-2">
                <RadioGroupItem id={`color-${color.id}`} value={color.id} className="peer sr-only" />
                <Label
                  htmlFor={`color-${color.id}`}
                  className="flex cursor-pointer items-center gap-2 rounded-full border border-white/10 px-4 py-2 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 transition-colors"
                >
                  <span
                    className="h-4 w-4 rounded-full border border-white/20"
                    style={{ backgroundColor: color.value }}
                  />
                  {color.name}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-3">Size</h3>
          <RadioGroup
            value={selectedSize}
            onValueChange={setSelectedSize}
            className="grid grid-cols-4 gap-3 sm:grid-cols-6"
          >
            {product.sizes.map((size) => (
              <div key={size}>
                <RadioGroupItem id={`size-${size}`} value={size} className="peer sr-only" />
                <Label
                  htmlFor={`size-${size}`}
                  className="flex cursor-pointer items-center justify-center rounded-md border border-white/10 px-3 py-2 text-center peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 transition-colors"
                >
                  {size}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-3">Quantity</h3>
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-l-md border-white/10"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              -
            </Button>
            <div className="flex h-10 w-16 items-center justify-center border-y border-white/10 text-sm">
              {quantity}
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-r-md border-white/10"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </Button>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col gap-4 sm:flex-row"
      >
        <Button
          size="lg"
          className="flex-1 bg-gradient-futuristic group relative overflow-hidden"
          onClick={handleAddToCart}
        >
          <span className="relative z-10 flex items-center">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Add to Cart
          </span>
          <span className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-white" />
        </Button>

        <QuickBuyButton product={product} variant="outline" size="lg" className="flex-1" />

        <WishlistButton product={product} size="icon" className="sm:flex-none" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="rounded-xl bg-glass p-6 text-sm"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-futuristic flex items-center justify-center">
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="font-medium">Free shipping on orders over $100</p>
              <p className="text-muted-foreground">Fast delivery within 2-5 business days</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-futuristic flex items-center justify-center">
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"
                />
              </svg>
            </div>
            <div>
              <p className="font-medium">30-day return policy</p>
              <p className="text-muted-foreground">Free returns. No questions asked.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-futuristic flex items-center justify-center">
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div>
              <p className="font-medium">2-year warranty</p>
              <p className="text-muted-foreground">Full coverage for manufacturing defects</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-futuristic flex items-center justify-center">
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <Button
                variant="link"
                className="font-medium p-0 h-auto text-sm"
                onClick={() => setIsImageSearchOpen(true)}
              >
                Find similar products with Image Search
              </Button>
              <p className="text-muted-foreground">Upload a photo to find visually similar items</p>
            </div>
          </div>
        </div>
      </motion.div>

      <ImageSearch open={isImageSearchOpen} onOpenChange={setIsImageSearchOpen} />
    </div>
  )
}
