import Link from "next/link"
import { Check, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CheckoutSuccessPage() {
  return (
    <div className="container px-4 py-16 sm:py-24 lg:py-32">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary">
          <Check className="h-10 w-10 text-primary-foreground" />
        </div>
        <h1 className="mt-6 text-3xl font-bold sm:text-4xl">Order Confirmed!</h1>
        <p className="mt-4 max-w-md text-muted-foreground">
          Thank you for your purchase. Your order has been confirmed and will be shipped soon. You will receive an email
          confirmation shortly.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/products">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Continue Shopping
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/account/orders">View Order Status</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
