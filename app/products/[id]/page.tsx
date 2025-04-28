import { notFound, redirect } from "next/navigation"
import ProductGallery from "@/components/product-gallery"
import ProductInfo from "@/components/product-info"
import RelatedProducts from "@/components/related-products"
import ProductReviews from "@/components/product-reviews"
import { products } from "@/components/products-data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  // Redirige siempre al producto de lentes de realidad virtual (id "2")
  const product = products.find(p => p.id === "2")

  if (!product) {
    notFound()
  }

  return (
    <div className="container px-4 py-8 sm:py-12 lg:py-16">
      <div className="grid gap-8 md:grid-cols-2">
        <ProductGallery images={product.images} />
        <ProductInfo product={product} />
      </div>

      <div className="mt-16">
        <Tabs defaultValue="description">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="py-6">
            <div className="prose max-w-none">{product.description ?? "Augmented reality glasses with advanced holographic display and gesture controls."}</div>
          </TabsContent>
          <TabsContent value="details" className="py-6">
            <div className="grid gap-4">
              {(product.details ?? [
                { name: "Display", value: "Holographic AR" },
                { name: "Connectivity", value: "Wi-Fi, Bluetooth 5.2" },
                { name: "Battery", value: "8 hours" },
                { name: "Compatibility", value: "iOS, Android, Windows" },
              ]).map((detail, index) => (
                <div key={index} className="grid grid-cols-1 gap-2 sm:grid-cols-[150px_1fr]">
                  <div className="font-medium">{detail.name}</div>
                  <div>{detail.value}</div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="py-6">
            <ProductReviews productId={product.id} />
          </TabsContent>
        </Tabs>
      </div>

      <RelatedProducts categoryId={product.category} currentProductId={product.id} />
    </div>
  )
}
