"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, ShoppingBag, Sparkles } from "lucide-react"
import Image from "next/image"

export default function HeroSection() {
  const mousePosition = useRef({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const [, forceRerender] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return
      const rect = heroRef.current.getBoundingClientRect()
      mousePosition.current = {
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
      }
      forceRerender((n) => n + 1)
    }
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const parallaxIntensity = 20
  const rotateIntensity = 2

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden min-h-[90vh] flex items-center"
      style={{
        background: "radial-gradient(circle at center, rgba(124, 58, 237, 0.15) 0%, rgba(0, 0, 0, 0) 70%)",
      }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute top-0 left-0 w-full h-full opacity-40 blur-2xl"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, rgba(236, 72, 153, 0.22) 0%, transparent 45%), " +
              "radial-gradient(circle at 80% 70%, rgba(6, 182, 212, 0.22) 0%, transparent 45%)",
          }}
        />

        {/* Grid lines */}
        <div
          className="absolute inset-0 bg-grid-pattern bg-[length:50px_50px]"
          style={{
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        />

        {/* Floating orbs */}
        <motion.div
          className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{
            top: "20%",
            left: "10%",
          }}
        />

        <motion.div
          className="absolute w-40 h-40 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{
            top: "60%",
            right: "15%",
          }}
        />
      </div>

      <div
        className="container relative z-10 px-4 py-32 md:py-48 lg:py-56"
        style={{
          transform: `translateY(${-scrollY * 0.2}px)`,
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                <span className="text-gradient">Future</span> of Shopping is Here
              </h1>
              <p className="mt-6 text-xl text-muted-foreground">
                Discover extraordinary products in an immersive digital experience that redefines online shopping.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" className="bg-gradient-futuristic group relative overflow-hidden" asChild>
                <Link href="/products">
                  <span className="relative z-10 flex items-center">
                    Explore Products
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-white" />
                </Link>
              </Button>

              <Button size="lg" variant="outline" className="neon-border group" asChild>
                <Link href="/categories">
                  <Sparkles className="mr-2 h-4 w-4 transition-all group-hover:rotate-12" />
                  Browse Categories
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="flex items-center gap-4 text-sm text-muted-foreground"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-muted border border-background" />
                ))}
              </div>
              <p>Join 10,000+ tech enthusiasts exploring the future</p>
            </motion.div>
          </div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{
                transform: `perspective(1000px) rotateX(${mousePosition.current.y * rotateIntensity}deg) rotateY(${-mousePosition.current.x * rotateIntensity}deg) translateZ(0)`,
              }}
              className="relative z-10"
            >
              <div className="relative aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 rounded-2xl overflow-hidden bg-gradient-to-br from-purple-600/20 to-cyan-600/20 backdrop-blur-sm border border-white/10 shadow-lg">
                  <div className="absolute inset-0 bg-grid-pattern opacity-10" />

                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 aspect-square rounded-full bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-cyan-500/30 blur-2xl" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-3/4 aspect-square relative"
                      style={{
                        transform: `translateX(${mousePosition.current.x * parallaxIntensity}px) translateY(${mousePosition.current.y * parallaxIntensity}px)`,
                      }}
                    >
                      {/* Fondo animado del círculo */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 animate-[gradient-shift_8s_ease-in-out_infinite] opacity-80" />

                      {/* Imagen del producto destacado */}
                      <div className="absolute inset-4 rounded-full overflow-hidden flex items-center justify-center bg-black/50 backdrop-blur-md">
                        <Image
                          src="/hero image.png"
                          alt="Destacado Nova"
                          width={336}
                          height={336}
                          className="object-contain w-full h-full"
                          priority
                        />
                      </div>

                      {/* Orbiting elements */}
                      <motion.div
                        className="absolute w-12 h-12 rounded-full bg-cyan-500/80 backdrop-blur-sm flex items-center justify-center text-white"
                        animate={{
                          rotate: [0, 360],
                        }}
                        transition={{
                          duration: 20,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                        style={{
                          top: "10%",
                          left: "50%",
                          translateX: "-50%",
                          translateY: "-50%",
                          transformOrigin: "center 250px",
                        }}
                      >
                        VR
                      </motion.div>

                      <motion.div
                        className="absolute w-10 h-10 rounded-full bg-purple-500/80 backdrop-blur-sm flex items-center justify-center text-white"
                        animate={{
                          rotate: [0, -360],
                        }}
                        transition={{
                          duration: 15,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                        style={{
                          bottom: "10%",
                          right: "20%",
                          translateX: "-50%",
                          translateY: "-50%",
                          transformOrigin: "center 200px",
                        }}
                      >
                        AI
                      </motion.div>

                      <motion.div
                        className="absolute w-14 h-14 rounded-full bg-pink-500/80 backdrop-blur-sm flex items-center justify-center text-white"
                        animate={{
                          rotate: [0, 360],
                        }}
                        transition={{
                          duration: 25,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                        style={{
                          bottom: "20%",
                          left: "10%",
                          translateX: "-50%",
                          translateY: "-50%",
                          transformOrigin: "center 220px",
                        }}
                      >
                        3D
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating elements */}
            <motion.div
              className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-xl"
              animate={{
                y: [0, 20, 0],
                x: [0, -10, 0],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />

            <motion.div
              className="absolute bottom-10 left-10 w-32 h-32 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur-xl"
              animate={{
                y: [0, -30, 0],
                x: [0, 15, 0],
              }}
              transition={{
                duration: 7,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
