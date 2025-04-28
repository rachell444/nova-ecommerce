'use client'

import { Suspense, useState } from "react"
import type { Product } from "@/components/products-data"
import ProductFilters from "@/components/product-filters"
import ProductGrid from "@/components/product-grid"
import ProductsHeader from "@/components/products-header"
import { Skeleton } from "@/components/ui/skeleton"
import SearchResults from "@/components/search/search-results"

export default function ProductsPage({ searchParams }: { searchParams: { search?: string } }) {
  const searchQuery = searchParams.search || ""
  const [filters, setFilters] = useState<any>(null)

  return (
    <div className="container px-4 py-8 sm:py-12 lg:py-16">
      {searchQuery ? (
        <SearchResults query={searchQuery} />
      ) : (
        <>
          <ProductsHeader />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr]">
            <div>
              <ProductFilters onApply={setFilters} />
            </div>
            <div>
              <Suspense fallback={<ProductGridSkeleton />}>
                <ProductGrid filters={filters} />
              </Suspense>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array(12)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-60 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        ))}
    </div>
  )
}
