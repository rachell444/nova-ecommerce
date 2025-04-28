import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price)
}

export function getProduct(id: string) {
  // Mock function to get a product by ID
  // In a real app, this would fetch from an API or database
  const products = [
    {
      id: "1",
      name: "Premium Cotton T-Shirt",
      price: 29.99,
      images: [
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
      ],
      category: "T-Shirts",
      categoryId: "tshirts",
      colors: [
        { id: "black", name: "Black", value: "#000000" },
        { id: "white", name: "White", value: "#ffffff" },
        { id: "gray", name: "Gray", value: "#808080" },
      ],
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      rating: 4,
      reviewCount: 42,
      description:
        "<p>Experience unparalleled comfort with our Premium Cotton T-Shirt. Crafted from 100% organic cotton, this shirt offers a perfect blend of softness and durability.</p><p>The breathable fabric ensures all-day comfort, while the classic fit flatters all body types. Available in multiple colors, this versatile piece is a must-have for any wardrobe.</p>",
      details: [
        { name: "Material", value: "100% Organic Cotton" },
        { name: "Fit", value: "Regular" },
        { name: "Care", value: "Machine wash cold, tumble dry low" },
        { name: "Origin", value: "Made in Portugal" },
      ],
    },
    {
      id: "2",
      name: "Slim Fit Jeans",
      price: 59.99,
      images: [
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
      ],
      category: "Pants",
      categoryId: "pants",
      colors: [
        { id: "blue", name: "Blue", value: "#0000ff" },
        { id: "black", name: "Black", value: "#000000" },
        { id: "gray", name: "Gray", value: "#808080" },
      ],
      sizes: ["28", "30", "32", "34", "36", "38"],
      rating: 5,
      reviewCount: 28,
      description:
        "<p>Our Slim Fit Jeans combine style and comfort for the modern individual. Made from premium denim with a touch of stretch, these jeans move with you throughout the day.</p><p>The slim fit design offers a contemporary silhouette without sacrificing comfort. Durable construction ensures these jeans will be a staple in your wardrobe for years to come.</p>",
      details: [
        { name: "Material", value: "98% Cotton, 2% Elastane" },
        { name: "Fit", value: "Slim" },
        { name: "Rise", value: "Mid-rise" },
        { name: "Care", value: "Machine wash cold, inside out" },
        { name: "Origin", value: "Made in Turkey" },
      ],
    },
  ]

  return products.find((product) => product.id === id)
}
