"use client"

import { useState, useEffect } from "react"
import ProductCard from "@/components/product-card"
import { motion, AnimatePresence } from "framer-motion"
import { products, type Product } from "@/components/products-data"

export default function ProductGrid({ filters }: { filters?: any }) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    // Filtrado por categorías
    let result = products
    if (filters?.categories?.length && !filters.categories.includes("all")) {
      result = result.filter(p => filters.categories.includes(p.category.toLowerCase()))
    }
    // Filtrado por colores
    if (filters?.colors?.length) {
      result = result.filter(p =>
        p.colors?.some((c: any) => filters.colors.includes(c.id))
      )
    }
    // Filtrado por tallas
    if (filters?.sizes?.length) {
      result = result.filter(p =>
        p.sizes?.some((s: string) => filters.sizes.includes(s))
      )
    }
    // Filtrado por precio
    if (filters?.priceRange) {
      result = result.filter(p =>
        p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
      )
    }
    setFilteredProducts(result)
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [filters])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array(8)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden bg-black/20 backdrop-blur-sm border border-white/10 animate-pulse"
            >
              <div className="aspect-square bg-gradient-to-br from-purple-900/20 to-cyan-900/20" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-white/10 rounded-full w-3/4" />
                <div className="h-4 bg-white/10 rounded-full w-1/2" />
                <div className="h-4 bg-white/10 rounded-full w-1/4" />
              </div>
            </div>
          ))}
      </div>
    )
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {filteredProducts.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </motion.div>
    </AnimatePresence>
  )
}
