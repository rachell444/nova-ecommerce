"use client"

import { useState } from "react"
import { ShoppingBag, CreditCard, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { formatPrice } from "@/lib/utils"

interface QuickBuyButtonProps {
  product: any
  variant?: "default" | "outline" | "secondary"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export default function QuickBuyButton({
  product,
  variant = "default",
  size = "default",
  className,
}: QuickBuyButtonProps) {
  const [open, setOpen] = useState(false)
  const [purchaseState, setPurchaseState] = useState<"idle" | "processing" | "success" | "error">("idle")
  const { toast } = useToast()
  const router = useRouter()

  const handleQuickBuy = async () => {
    setPurchaseState("processing")

    // Simulate API call
    setTimeout(() => {
      setPurchaseState("success")

      // Redirect after success
      setTimeout(() => {
        setOpen(false)
        toast({
          title: "Purchase successful!",
          description: `Your ${product.name} will be shipped soon.`,
        })
        router.push("/checkout/success")
      }, 2000)
    }, 2500)
  }

  return (
    <>
      <Button variant={variant} size={size} className={className} onClick={() => setOpen(true)}>
        <ShoppingBag className="mr-2 h-4 w-4" />
        Quick Buy
      </Button>

      <Dialog
        open={open}
        onOpenChange={(newOpen) => {
          if (purchaseState === "processing") return
          setOpen(newOpen)
          if (!newOpen) setPurchaseState("idle")
        }}
      >
        <DialogContent className="sm:max-w-[425px] p-0 gap-0 bg-black/90 backdrop-blur-xl border-white/10 overflow-hidden">
          <DialogHeader className="p-6 border-b border-white/10">
            <DialogTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              One-Click Purchase
            </DialogTitle>
          </DialogHeader>

          <div className="p-6">
            <AnimatePresence mode="wait">
              {purchaseState === "idle" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">{product.name}</h3>
                    <p className="text-2xl font-bold">{formatPrice(product.price)}</p>
                    <p className="text-sm text-muted-foreground">
                      Complete your purchase with one click using your default payment method and shipping address.
                    </p>
                  </div>

                  <div className="rounded-lg border border-white/10 p-4 bg-white/5">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Payment Method</span>
                        <span className="text-sm font-medium">•••• 4242</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Shipping Address</span>
                        <span className="text-sm font-medium">Default Address</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Estimated Delivery</span>
                        <span className="text-sm font-medium">2-3 Business Days</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1" onClick={() => setOpen(false)}>
                      Cancel
                    </Button>
                    <Button className="flex-1 bg-gradient-futuristic" onClick={handleQuickBuy}>
                      Confirm Purchase
                    </Button>
                  </div>
                </motion.div>
              )}

              {purchaseState === "processing" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="py-8 flex flex-col items-center justify-center text-center"
                >
                  <div className="relative w-20 h-20 mb-6">
                    <motion.div
                      className="absolute inset-0 rounded-full border-4 border-primary/30"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    />
                    <Loader2 className="absolute inset-0 m-auto h-10 w-10 text-primary animate-pulse" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Processing Your Purchase</h3>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    Please wait while we securely process your payment and prepare your order.
                  </p>
                </motion.div>
              )}

              {purchaseState === "success" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="py-8 flex flex-col items-center justify-center text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6"
                  >
                    <Check className="h-10 w-10 text-green-500" />
                  </motion.div>
                  <h3 className="text-xl font-medium mb-2">Purchase Successful!</h3>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    Your order has been confirmed and will be shipped soon. Thank you for your purchase!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
