"use client"

import { useCart } from "./cart-provider"
import { formatPrice } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

export default function CheckoutSummary() {
  const { cart } = useCart()

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = 10
  const tax = subtotal * 0.1
  const total = subtotal + shipping + tax

  return (
    <div className="rounded-lg border shadow-sm">
      <div className="p-6">
        <h3 className="text-lg font-medium">Order Summary</h3>
        <Separator className="my-4" />
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex items-start gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-md bg-muted">
                <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">{item.variant}</p>
                  </div>
                  <div className="text-sm font-medium">
                    {item.quantity} × {formatPrice(item.price)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
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
      </div>
    </div>
  )
}
