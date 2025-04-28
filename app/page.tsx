import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import FeaturedProducts from "@/components/featured-products"
import CategoryGrid from "@/components/category-grid"
import HeroSection from "@/components/hero-section"
import BrandBanner from "@/components/brand-banner"
import Newsletter from "@/components/newsletter"
import FlashDeals from "@/components/future-commerce/flash-deals"

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />

      <section className="container px-4 py-12 md:py-24 lg:py-32">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Shop by Category</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Explore our wide range of products across different categories
            </p>
          </div>
        </div>
        <CategoryGrid />
      </section>

      <section className="container px-4 py-12 md:py-24 lg:py-32 bg-muted/50 rounded-lg">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Featured Products</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Discover our most popular items and latest arrivals
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
          <div className="md:col-span-3">
            <FeaturedProducts />
          </div>
          <div className="md:col-span-1">
            <FlashDeals />
          </div>
        </div>
        <div className="flex justify-center mt-10">
          <Button asChild size="lg">
            <Link href="/products">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <BrandBanner />
      <Newsletter />
    </main>
  )
}
