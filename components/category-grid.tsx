"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

const categories = [
  {
    id: "wearables",
    name: "Wearables",
    description: "Smart devices for your body",
    image: "/placeholder.svg?height=300&width=300",
    href: "/products?category=wearables",
    color: "from-purple-600 to-pink-600",
  },
  {
    id: "ar-vr",
    name: "AR/VR",
    description: "Immersive reality experiences",
    image: "/placeholder.svg?height=300&width=300",
    href: "/products?category=ar-vr",
    color: "from-cyan-600 to-blue-600",
  },
  {
    id: "smart-home",
    name: "Smart Home",
    description: "Intelligent living spaces",
    image: "/placeholder.svg?height=300&width=300",
    href: "/products?category=smart-home",
    color: "from-green-600 to-cyan-600",
  },
  {
    id: "audio",
    name: "Audio",
    description: "Next-gen sound technology",
    image: "/placeholder.svg?height=300&width=300",
    href: "/products?category=audio",
    color: "from-pink-600 to-orange-600",
  },
]

export default function CategoryGrid() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.div
      className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      {categories.map((category) => (
        <motion.div key={category.id} variants={item}>
          <Link href={category.href} className="group relative block h-full overflow-hidden rounded-xl">
            <div className="card-3d relative aspect-square overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-80`} />

              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                fill
                className="object-cover mix-blend-overlay transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />

              {/* Grid pattern overlay */}
              <div className="absolute inset-0 bg-grid-pattern bg-[length:20px_20px] opacity-30" />

              {/* Glowing orb */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 aspect-square rounded-full bg-white/20 blur-xl" />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                <p className="mt-2 text-sm text-white/80">{category.description}</p>

                <div className="mt-4 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium transition-transform duration-300 transform group-hover:scale-110">
                  Explore
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  )
}
