"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Heart, Menu, ShoppingBag, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState, useEffect } from "react"
import { useCart } from "./cart-provider"
import CartDrawer from "./cart-drawer"
import { cn } from "@/lib/utils"
import { ModeToggle } from "./mode-toggle"
import SearchButton from "@/components/search/search-button"
import GamificationRewards from "./future-commerce/gamification-rewards"

export default function Header() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { cart } = useCart()

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const routes = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Shop" },
    { href: "/categories", label: "Categories" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-500",
        isScrolled
          ? "bg-[#232329]/70 backdrop-blur-md border-b border-white/10 shadow-lg"
          : "bg-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6 md:gap-10">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-black/90 backdrop-blur-xl border-white/10">
              <div className="flex flex-col gap-6 py-4">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                  <div className="w-32 h-12 flex items-center justify-center">
                    <img src="/nova-logo.png" alt="Nova Logo" className="h-12 object-contain" />
                  </div>
                </Link>
                <nav className="flex flex-col gap-4">
                  {routes.map((route) => (
                    <Link
                      key={route.href}
                      href={route.href}
                      className={cn(
                        "text-lg font-medium transition-colors hover:text-primary relative group",
                        pathname === route.href ? "text-primary" : "text-muted-foreground",
                      )}
                    >
                      {route.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-300 group-hover:w-full" />
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          {/* Logo principal sin fondo extra para respetar transparencia */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className={cn("w-12 h-12 flex items-center justify-center transition-all duration-300", isScrolled ? "rounded-full" : "")}>
              <img src="/nova-logo.png" alt="Nova Logo" className="h-10 w-10 object-contain" />
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary relative group",
                  pathname === route.href ? "text-primary" : "text-muted-foreground",
                )}
              >
                {route.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <SearchButton />
          <ModeToggle />
          {pathname === "/" && <GamificationRewards />}
          <Button variant="ghost" size="icon" className="relative overflow-hidden group">
            <Heart className="h-5 w-5" />
            <span className="sr-only">Wishlist</span>
            <span className="absolute inset-0 w-full h-full bg-primary/10 scale-0 rounded-full group-hover:scale-100 transition-transform duration-300" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="relative overflow-hidden group"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingBag className="h-5 w-5" />
            {cartItemsCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-futuristic text-[10px] font-medium text-white">
                {cartItemsCount}
              </span>
            )}
            <span className="sr-only">Cart</span>
            <span className="absolute inset-0 w-full h-full bg-primary/10 scale-0 rounded-full group-hover:scale-100 transition-transform duration-300" />
          </Button>

          <Button variant="ghost" size="icon" className="relative overflow-hidden group" asChild>
            <Link href="/account">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
              <span className="absolute inset-0 w-full h-full bg-primary/10 scale-0 rounded-full group-hover:scale-100 transition-transform duration-300" />
            </Link>
          </Button>
        </div>
      </div>
      <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />
    </header>
  )
}
