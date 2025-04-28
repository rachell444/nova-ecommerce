"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ShoppingBag, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import { formatPrice } from "@/lib/utils"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export default function CartPage() {
  const { cart, updateQuantity, removeItem } = useCart()
  const [isUpdating, setIsUpdating] = useState(false)

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 0 ? 10 : 0
  const tax = subtotal * 0.1
  const total = subtotal + shipping + tax

  const handleQuantityChange = (id: string, quantity: number) => {
    setIsUpdating(true)
    updateQuantity(id, quantity)
    setTimeout(() => setIsUpdating(false), 500)
  }

  return (
    <div className="container px-4 py-8 sm:py-12 lg:py-16">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <Button variant="ghost" asChild>
          <Link href="/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Link>
        </Button>
      </div>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-medium mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Button asChild size="lg">
            <Link href="/products">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
          <div>
            <div className="rounded-lg border shadow-sm">
              <div className="p-6">
                <div className="hidden md:grid md:grid-cols-[2fr_1fr_1fr_auto] md:gap-4 md:text-sm md:font-medium">
                  <div>Product</div>
                  <div>Price</div>
                  <div>Quantity</div>
                  <div></div>
                </div>
                <Separator className="my-4 hidden md:block" />
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div key={item.id} className="grid gap-4 md:grid-cols-[2fr_1fr_1fr_auto] md:items-center">
                      <div className="flex items-center gap-4">
                        <div className="relative h-16 w-16 overflow-hidden rounded">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-muted-foreground">{item.variant}</div>
                        </div>
                      </div>
                      <div className="text-sm md:text-base">{formatPrice(item.price)}</div>
                      <div>
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-r-none"
                            onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                            disabled={isUpdating}
                          >
                            -
                          </Button>
                          <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, Number.parseInt(e.target.value) || 1)}
                            className="h-8 w-12 rounded-none border-x-0 text-center"
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-l-none"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            disabled={isUpdating}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                      <div>
                        <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} disabled={isUpdating}>
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="rounded-lg border shadow-sm">
              <div className="p-6">
                <h3 className="text-lg font-medium">Order Summary</h3>
                <Separator className="my-4" />
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>Subtotal</div>
                    <div>{formatPrice(subtotal)}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>Shipping</div>
                    <div>{formatPrice(shipping)}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>Tax</div>
                    <div>{formatPrice(tax)}</div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between font-medium">
                    <div>Total</div>
                    <div>{formatPrice(total)}</div>
                  </div>
                </div>
                <Button className="w-full mt-6" size="lg" asChild>
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
