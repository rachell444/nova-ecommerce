"use client"

import { useEffect, useState } from "react"
import { products, type Product } from "@/components/products-data"
import { Loader2, Search, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/product-card"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

interface SearchResultsProps {
  query: string
}

export default function SearchResults({ query }: SearchResultsProps) {
  const [results, setResults] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true)
      try {
        const searchResults = products.filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase())
        )
        setResults(searchResults)
      } catch (error) {
        console.error("Error fetching search results:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchResults()
  }, [query])

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">Search Results</h1>
          </div>
          <p className="text-muted-foreground mt-1">
            {isLoading ? "Searching..." : `Found ${results.length} results for "${query}"`}
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      ) : results.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {results.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </motion.div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Search className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-medium mb-2">No results found</h2>
          <p className="text-muted-foreground max-w-md">
            We couldn't find any products matching "{query}". Try checking your spelling or using different keywords.
          </p>
          <Button className="mt-6" onClick={() => router.push("/products")}>
            View All Products
          </Button>
        </div>
      )}
    </div>
  )
}
