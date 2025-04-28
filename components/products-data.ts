// Centralized product data for Nova e-commerce
export interface Product {
  id: string
  name: string
  price: number
  images: string[]
  category: string
  colors: { id: string, name: string, value: string }[]
  sizes: string[]
  rating: number
  reviewCount: number
  isNew?: boolean
}

export const products: Product[] = [
  {
    id: "1",
    name: "Quantum Neural Headset",
    price: 299.99,
    images: ["/products/quantum-headphones.png"],
    category: "Wearables",
    colors: [
      { id: "black", name: "Obsidian", value: "#000000" },
      { id: "silver", name: "Chrome", value: "#C0C0C0" },
    ],
    sizes: ["One Size"],
    rating: 4.8,
    reviewCount: 42,
    isNew: true,
  },
  {
    id: "2",
    name: "HoloLens Display Glasses",
    price: 459.99,
    images: [
      "/products/hololens-display-glasses.png",
      "/products/hololens-display-glasses-front.png",
      "/products/hololens-display-glasses-front-above.png"
    ],
    category: "AR/VR",
    colors: [
      { id: "blue", name: "Cobalt", value: "#0047AB" },
      { id: "black", name: "Stealth", value: "#000000" },
    ],
    sizes: ["S", "M", "L"],
    rating: 5,
    reviewCount: 28,
    isNew: true,
  },
  {
    id: "3",
    name: "Nebula Smart Home Hub",
    price: 149.99,
    images: ["/products/nebula-smart-home-hub.png"],
    category: "Smart Home",
    colors: [
      { id: "gray", name: "Lunar", value: "#808080" },
      { id: "white", name: "Arctic", value: "#FFFFFF" },
    ],
    sizes: ["One Size"],
    rating: 4.5,
    reviewCount: 36,
  },
  {
    id: "4",
    name: "Fusion Power Bank",
    price: 89.99,
    images: ["/products/fusion-power-bank.png"],
    category: "Accessories",
    colors: [
      { id: "purple", name: "Ultraviolet", value: "#800080" },
      { id: "black", name: "Carbon", value: "#000000" },
    ],
    sizes: ["One Size"],
    rating: 4.7,
    reviewCount: 18,
    isNew: true,
  },
  {
    id: "5",
    name: "Pulse Fitness Tracker",
    price: 129.99,
    images: ["/products/pulse-fitness-tracker.png"],
    category: "Wearables",
    colors: [
      { id: "cyan", name: "Aqua", value: "#00FFFF" },
      { id: "black", name: "Onyx", value: "#000000" },
    ],
    sizes: ["S", "M", "L"],
    rating: 4.4,
    reviewCount: 24,
  },
  {
    id: "6",
    name: "Echo Wireless Earbuds",
    price: 179.99,
    images: ["/products/echo-wireless-earbuss.png"],
    category: "Audio",
    colors: [
      { id: "green", name: "Emerald", value: "#50C878" },
      { id: "black", name: "Phantom", value: "#000000" },
    ],
    sizes: ["One Size"],
    rating: 4.9,
    reviewCount: 32,
    isNew: true,
  },
  {
    id: "7",
    name: "Spectrum RGB Keyboard",
    price: 149.99,
    images: ["/products/spectrum-rgb-keyboard.png"],
    category: "Accessories",
    colors: [
      { id: "rgb", name: "Rainbow", value: "linear-gradient(90deg, #ff0080, #7928ca, #007cf0)" },
      { id: "black", name: "Dark", value: "#000000" },
    ],
    sizes: ["One Size"],
    rating: 4.6,
    reviewCount: 21,
  },
  {
    id: "8",
    name: "Vortex Gaming Mouse",
    price: 99.99,
    images: ["/products/vortex-gaming-mouse.png"],
    category: "Accessories",
    colors: [
      { id: "black", name: "Shadow", value: "#000000" },
      { id: "red", name: "Inferno", value: "#FF0000" },
    ],
    sizes: ["One Size"],
    rating: 4.8,
    reviewCount: 19,
  },
  {
    id: "9",
    name: "Photon Camera Drone",
    price: 799.99,
    images: ["/products/photon-camera-drone.png"],
    category: "Drones",
    colors: [
      { id: "white", name: "Arctic", value: "#FFFFFF" },
      { id: "black", name: "Night", value: "#000000" },
    ],
    sizes: ["One Size"],
    rating: 4.7,
    reviewCount: 15,
  },
  {
    id: "10",
    name: "Gravity Wireless Charger",
    price: 49.99,
    images: ["/products/gravity-wireless-charger.png"],
    category: "Accessories",
    colors: [
      { id: "white", name: "Pearl", value: "#FFFFFF" },
      { id: "black", name: "Obsidian", value: "#000000" },
    ],
    sizes: ["One Size"],
    rating: 4.5,
    reviewCount: 13,
  },
  {
    id: "11",
    name: "Nexus Smartphone",
    price: 999.99,
    images: ["/products/nexus-smartphone.png"],
    category: "Smartphones",
    colors: [
      { id: "blue", name: "Ocean", value: "#007cf0" },
      { id: "black", name: "Midnight", value: "#000000" },
    ],
    sizes: ["One Size"],
    rating: 4.9,
    reviewCount: 45,
  },
  {
    id: "12",
    name: "Aura Smart Lighting",
    price: 69.99,
    images: ["/products/aura-smart-ighting.png"],
    category: "Smart Home",
    colors: [
      { id: "rgb", name: "Spectrum", value: "linear-gradient(90deg, #ff0080, #7928ca, #007cf0)" },
      { id: "white", name: "Classic", value: "#FFFFFF" },
    ],
    sizes: ["One Size"],
    rating: 4.3,
    reviewCount: 11,
  },
]
