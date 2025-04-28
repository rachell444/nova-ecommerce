// Mock product data
const products = [
  {
    id: "1",
    name: "Quantum Neural Headset",
    price: 299.99,
    images: ["/placeholder.svg?height=400&width=400"],
    category: "Wearables",
    colors: [
      { id: "black", name: "Obsidian", value: "#000000" },
      { id: "silver", name: "Chrome", value: "#C0C0C0" },
    ],
    sizes: ["One Size"],
    rating: 4.8,
    reviewCount: 42,
    isNew: true,
    description: "Advanced neural interface for immersive experiences",
    tags: ["neural", "headset", "vr", "ar", "brain", "interface", "immersive"],
  },
  {
    id: "2",
    name: "HoloLens Display Glasses",
    price: 459.99,
    images: ["/placeholder.svg?height=400&width=400"],
    category: "AR/VR",
    colors: [
      { id: "blue", name: "Cobalt", value: "#0047AB" },
      { id: "black", name: "Stealth", value: "#000000" },
    ],
    sizes: ["S", "M", "L"],
    rating: 5,
    reviewCount: 28,
    isNew: true,
    description: "Augmented reality glasses with holographic display",
    tags: ["ar", "glasses", "holographic", "display", "augmented reality"],
  },
  {
    id: "3",
    name: "Nebula Smart Home Hub",
    price: 149.99,
    images: ["/placeholder.svg?height=400&width=400"],
    category: "Smart Home",
    colors: [
      { id: "gray", name: "Lunar", value: "#808080" },
      { id: "white", name: "Arctic", value: "#FFFFFF" },
    ],
    sizes: ["One Size"],
    rating: 4.5,
    reviewCount: 36,
    description: "Central hub for controlling all your smart home devices",
    tags: ["smart home", "hub", "iot", "control", "automation"],
  },
  {
    id: "4",
    name: "Fusion Power Bank",
    price: 89.99,
    images: ["/placeholder.svg?height=400&width=400"],
    category: "Accessories",
    colors: [
      { id: "purple", name: "Ultraviolet", value: "#800080" },
      { id: "black", name: "Carbon", value: "#000000" },
    ],
    sizes: ["One Size"],
    rating: 4.7,
    reviewCount: 18,
    isNew: true,
    description: "High-capacity power bank with wireless charging",
    tags: ["power bank", "battery", "charging", "wireless", "portable"],
  },
  {
    id: "5",
    name: "Pulse Fitness Tracker",
    price: 129.99,
    images: ["/placeholder.svg?height=400&width=400"],
    category: "Wearables",
    colors: [
      { id: "cyan", name: "Aqua", value: "#00FFFF" },
      { id: "black", name: "Onyx", value: "#000000" },
    ],
    sizes: ["S", "M", "L"],
    rating: 4.4,
    reviewCount: 24,
    description: "Advanced fitness tracker with health monitoring",
    tags: ["fitness", "tracker", "health", "monitoring", "wearable"],
  },
  {
    id: "6",
    name: "Echo Wireless Earbuds",
    price: 179.99,
    images: ["/placeholder.svg?height=400&width=400"],
    category: "Audio",
    colors: [
      { id: "green", name: "Emerald", value: "#50C878" },
      { id: "black", name: "Phantom", value: "#000000" },
    ],
    sizes: ["One Size"],
    rating: 4.9,
    reviewCount: 32,
    isNew: true,
    description: "Premium wireless earbuds with noise cancellation",
    tags: ["earbuds", "wireless", "audio", "noise cancellation", "sound"],
  },
  {
    id: "7",
    name: "Spectrum RGB Keyboard",
    price: 149.99,
    images: ["/placeholder.svg?height=400&width=400"],
    category: "Peripherals",
    colors: [{ id: "black", name: "Shadow", value: "#000000" }],
    sizes: ["One Size"],
    rating: 4.6,
    reviewCount: 48,
    description: "Mechanical keyboard with customizable RGB lighting",
    tags: ["keyboard", "mechanical", "rgb", "gaming", "typing"],
  },
  {
    id: "8",
    name: "Vortex Gaming Mouse",
    price: 79.99,
    images: ["/placeholder.svg?height=400&width=400"],
    category: "Peripherals",
    colors: [
      { id: "black", name: "Midnight", value: "#000000" },
      { id: "white", name: "Frost", value: "#FFFFFF" },
    ],
    sizes: ["One Size"],
    rating: 4.7,
    reviewCount: 52,
    isNew: true,
    description: "High-precision gaming mouse with programmable buttons",
    tags: ["mouse", "gaming", "precision", "programmable"],
  },
  {
    id: "9",
    name: "Aura Smart Lighting",
    price: 129.99,
    images: ["/placeholder.svg?height=400&width=400"],
    category: "Smart Home",
    colors: [{ id: "multi", name: "Spectrum", value: "linear-gradient(90deg, #FF0000, #00FF00, #0000FF)" }],
    sizes: ["One Size"],
    rating: 4.3,
    reviewCount: 29,
    description: "Customizable smart lighting system for your home",
    tags: ["lighting", "smart home", "rgb", "customizable", "ambiance"],
  },
  {
    id: "10",
    name: "Nexus Smartphone",
    price: 899.99,
    images: ["/placeholder.svg?height=400&width=400"],
    category: "Devices",
    colors: [
      { id: "black", name: "Cosmic", value: "#000000" },
      { id: "silver", name: "Stellar", value: "#C0C0C0" },
      { id: "gold", name: "Solar", value: "#FFD700" },
    ],
    sizes: ["128GB", "256GB", "512GB"],
    rating: 4.8,
    reviewCount: 124,
    isNew: true,
    description: "Next-generation smartphone with AI capabilities",
    tags: ["smartphone", "mobile", "ai", "camera", "communication"],
  },
]

/**
 * Search products based on query
 */
export async function searchProducts(query: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  if (!query) return []

  const normalizedQuery = query.toLowerCase()

  return products.filter((product) => {
    // Search in name, category, description and tags
    return (
      product.name.toLowerCase().includes(normalizedQuery) ||
      product.category.toLowerCase().includes(normalizedQuery) ||
      product.description.toLowerCase().includes(normalizedQuery) ||
      product.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery))
    )
  })
}

/**
 * Get AI-powered search suggestions
 * This is a mock implementation that would be replaced with a real AI service
 */
export async function getAISuggestions(query: string): Promise<string[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 700))

  if (!query) return []

  const normalizedQuery = query.toLowerCase()

  // Mock AI suggestions based on query
  const suggestions: Record<string, string[]> = {
    head: ["Quantum Neural Headset", "Wireless Headphones", "VR Headset"],
    smart: ["Smart Home Hub", "Smart Lighting", "Smart Watch", "Smart Glasses"],
    wireless: ["Wireless Earbuds", "Wireless Charging", "Wireless Keyboard"],
    vr: ["VR Headset", "AR/VR Glasses", "Virtual Reality Games"],
    power: ["Power Bank", "Portable Charger", "Solar Power Devices"],
    gaming: ["Gaming Mouse", "Gaming Keyboard", "Gaming Headset", "Gaming Console"],
    fitness: ["Fitness Tracker", "Smart Watch", "Health Monitoring Devices"],
    audio: ["Wireless Earbuds", "Bluetooth Speakers", "Noise Cancelling Headphones"],
    phone: ["Nexus Smartphone", "Phone Accessories", "Smartphone Camera Lens"],
    home: ["Smart Home Hub", "Home Automation", "Smart Lighting", "Security Camera"],
  }

  // Find matching suggestions
  for (const [key, values] of Object.entries(suggestions)) {
    if (normalizedQuery.includes(key)) {
      return values
    }
  }

  // If no direct match, return some generic tech suggestions
  return ["Latest Tech Gadgets", "Trending Electronics", "New Arrivals", "Top Rated Products", "Tech Accessories"]
}
