import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="mt-12 bg-[#18181b] border-t border-[#232329]/40 py-10 text-sm text-muted-foreground relative">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-8">
        {/* Branding & Copyright moved more to the left */}
        <div className="flex flex-col gap-3 min-w-[220px]">
          <div className="flex items-center gap-2 font-bold text-lg text-white mb-2">
            <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-white">
              <img src="/nova-logo.png" alt="Nova Logo" className="w-10 h-10 object-contain" />
            </div>
          </div>
          <span className="text-xs text-left">2025 Nova E-Commerce. Developed by Rachell Moron. All rights reserved.</span>
        </div>
        {/* Main Links */}
        <div className="flex flex-wrap gap-8 md:gap-12 flex-1 justify-between">
          <div className="flex flex-col gap-2 min-w-[120px]">
            <span className="font-semibold text-white mb-1">Shop</span>
            <Link href="/products" className="hover:underline">All Products</Link>
            <Link href="/products?category=clothing" className="hover:underline">Clothing</Link>
            <Link href="/products?category=accessories" className="hover:underline">Accessories</Link>
            <Link href="/products?category=footwear" className="hover:underline">Footwear</Link>
            <Link href="/products?category=new" className="hover:underline">New Arrivals</Link>
            <Link href="/products?category=sale" className="hover:underline">Sale</Link>
          </div>
          <div className="flex flex-col gap-2 min-w-[120px]">
            <span className="font-semibold text-white mb-1">Company</span>
            <Link href="/about" className="hover:underline">About Us</Link>
            <Link href="/careers" className="hover:underline">Careers</Link>
            <Link href="/stores" className="hover:underline">Store Locator</Link>
            <Link href="/sustainability" className="hover:underline">Sustainability</Link>
            <Link href="/press" className="hover:underline">Press</Link>
            <Link href="/affiliates" className="hover:underline">Affiliates</Link>
          </div>
          <div className="flex flex-col gap-2 min-w-[140px]">
            <span className="font-semibold text-white mb-1">Customer Service</span>
            <Link href="/contact" className="hover:underline">Contact Us</Link>
            <Link href="/faqs" className="hover:underline">FAQs</Link>
            <Link href="/shipping" className="hover:underline">Shipping & Delivery</Link>
            <Link href="/returns" className="hover:underline">Returns & Exchanges</Link>
            <Link href="/warranty" className="hover:underline">Warranty</Link>
            <Link href="/track-order" className="hover:underline">Track Order</Link>
          </div>
          {/* Legal section placed right next to Customer Service */}
          <div className="flex flex-col gap-2 min-w-[140px]">
            <span className="font-semibold text-white mb-1">Legal</span>
            <Link href="/terms" className="hover:underline">Terms of Service</Link>
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
            <Link href="/cookies" className="hover:underline">Cookie Policy</Link>
            <Link href="/accessibility" className="hover:underline">Accessibility</Link>
          </div>
        </div>
        {/* Social Icons removed from here, now absolutely positioned */}
      </div>
      {/* Social Icons: bottom right, always inside footer */}
      <div className="absolute bottom-5 right-8 flex gap-2 z-10">
        {/* GitHub */}
        <a href="https://github.com/rachell444" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="w-8 h-8 rounded-full bg-[#232329] flex items-center justify-center hover:bg-white/10 transition">
          {/* GitHub SVG official logo */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
            <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.867 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.338 1.909-1.296 2.748-1.025 2.748-1.025.546 1.378.202 2.396.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.31.679.922.679 1.858 0 1.341-.012 2.423-.012 2.753 0 .267.18.577.688.48C19.135 20.203 22 16.447 22 12.02 22 6.484 17.523 2 12 2z" fill="currentColor"/>
          </svg>
        </a>
        {/* LinkedIn */}
        <a href="https://www.linkedin.com/in/rachell-moron-henriquez-540aa0266/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-8 h-8 rounded-full bg-[#232329] flex items-center justify-center hover:bg-white/10 transition">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8a6 6 0 016 6v5a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4a2 2 0 00-4 0v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-9a1 1 0 011-1h3a1 1 0 011 1v1.25M2 20h.01"/></svg>
        </a>
      </div>
    </footer>
  )
}
