import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/components/cart-provider"
import { Toaster } from "@/components/ui/toaster"
import CursorEffect from "@/components/cursor-effect"
import BackgroundEffects from "@/components/background-effects"
import LiveChatSupport from "@/components/future-commerce/live-chat-support"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

export const metadata: Metadata = {
  title: "Nova E-Commerce | Futuristic Shopping Experience",
  description: "Discover extraordinary products in an immersive digital experience that redefines online shopping.",
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} font-sans relative overflow-x-hidden dark`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <CartProvider>
            <BackgroundEffects />
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <main className="flex-1 relative z-10">{children}</main>
              <Footer />
              <Toaster />
            </div>
            <CursorEffect />
            <LiveChatSupport />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
