"use client"

import { useState } from "react"
import { Heart, Share2, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface WishlistButtonProps {
  product: any
  variant?: "default" | "outline" | "secondary" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export default function WishlistButton({
  product,
  variant = "outline",
  size = "default",
  className,
}: WishlistButtonProps) {
  const [open, setOpen] = useState(false)
  const [isInWishlist, setIsInWishlist] = useState(false)
  const [isPublic, setIsPublic] = useState(true)
  const [copied, setCopied] = useState(false)
  const [selectedList, setSelectedList] = useState("default")
  const { toast } = useToast()

  const handleAddToWishlist = () => {
    setIsInWishlist(!isInWishlist)

    if (!isInWishlist) {
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist.`,
      })
    } else {
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      })
    }
  }

  const handleShare = () => {
    setOpen(true)
  }

  const copyToClipboard = () => {
    const shareUrl = `https://example.com/wishlist/${selectedList}?product=${product.id}`
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareToSocial = (platform: string) => {
    const shareUrl = `https://example.com/wishlist/${selectedList}?product=${product.id}`
    let socialUrl = ""

    switch (platform) {
      case "twitter":
        socialUrl = `https://twitter.com/intent/tweet?text=Check out this product!&url=${encodeURIComponent(shareUrl)}`
        break
      case "facebook":
        socialUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
        break
      case "pinterest":
        socialUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&media=${encodeURIComponent(product.images[0])}&description=${encodeURIComponent(product.name)}`
        break
      default:
        break
    }

    if (socialUrl) {
      window.open(socialUrl, "_blank")
    }

    toast({
      title: "Shared successfully",
      description: `Your wishlist has been shared on ${platform}.`,
    })

    setOpen(false)
  }

  return (
    <>
      {size === "icon" ? (
        <Button variant={variant} size={size} className={cn("relative", className)} onClick={handleAddToWishlist}>
          <Heart className={cn("h-4 w-4", isInWishlist && "fill-primary text-primary")} />
          <span className="sr-only">Add to wishlist</span>
          {isInWishlist && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.5, 1] }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 rounded-full bg-primary/20"
            />
          )}
        </Button>
      ) : (
        <div className="flex items-center gap-2">
          <Button variant={variant} size={size} className={className} onClick={handleAddToWishlist}>
            <Heart className={cn("mr-2 h-4 w-4", isInWishlist && "fill-primary text-primary")} />
            {isInWishlist ? "Saved" : "Save"}
          </Button>

          <Button variant="ghost" size={size} className={className} onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px] p-0 gap-0 bg-black/90 backdrop-blur-xl border-white/10">
          <DialogHeader className="p-6 border-b border-white/10">
            <DialogTitle className="flex items-center gap-2">
              <Share2 className="h-5 w-5 text-primary" />
              Share Wishlist
            </DialogTitle>
          </DialogHeader>

          <div className="p-6">
            <Tabs defaultValue="link" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="link">Copy Link</TabsTrigger>
                <TabsTrigger value="social">Social Media</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="link" className="space-y-4">
                <div className="space-y-2">
                  <Label>Wishlist</Label>
                  <select
                    className="w-full rounded-md border border-white/10 bg-black/50 px-3 py-2 text-sm"
                    value={selectedList}
                    onChange={(e) => setSelectedList(e.target.value)}
                  >
                    <option value="default">Default Wishlist</option>
                    <option value="tech">Tech Gadgets</option>
                    <option value="gifts">Gift Ideas</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <Input
                    readOnly
                    value={`https://example.com/wishlist/${selectedList}?product=${product.id}`}
                    className="flex-1 bg-black/50 border-white/10"
                  />
                  <Button variant="outline" size="icon" onClick={copyToClipboard} className="relative overflow-hidden">
                    {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    {copied && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute inset-0 bg-green-500/20 rounded-md"
                      />
                    )}
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground">
                  Share this link with friends to show them your wishlist.
                </p>
              </TabsContent>

              <TabsContent value="social" className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <Button
                    variant="outline"
                    className="flex flex-col items-center justify-center h-24 hover:bg-blue-500/20 hover:border-blue-500/50 transition-colors"
                    onClick={() => shareToSocial("twitter")}
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mb-2">
                      <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22 5.8a8.49 8.49 0 0 1-2.36.64 4.13 4.13 0 0 0 1.81-2.27 8.21 8.21 0 0 1-2.61 1 4.1 4.1 0 0 0-7 3.74 11.64 11.64 0 0 1-8.45-4.29 4.16 4.16 0 0 0 1.28 5.52 4.05 4.05 0 0 1-1.85-.51v.05a4.1 4.1 0 0 0 3.3 4 4.1 4.1 0 0 1-1.86.07 4.11 4.11 0 0 0 3.83 2.85A8.22 8.22 0 0 1 2 20.28a11.57 11.57 0 0 0 6.29 1.85A11.59 11.59 0 0 0 20 10.42v-.53a8.43 8.43 0 0 0 2-2.12Z" />
                      </svg>
                    </div>
                    Twitter
                  </Button>

                  <Button
                    variant="outline"
                    className="flex flex-col items-center justify-center h-24 hover:bg-blue-900/20 hover:border-blue-900/50 transition-colors"
                    onClick={() => shareToSocial("facebook")}
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-900/20 flex items-center justify-center mb-2">
                      <svg className="h-5 w-5 text-blue-900" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                      </svg>
                    </div>
                    Facebook
                  </Button>

                  <Button
                    variant="outline"
                    className="flex flex-col items-center justify-center h-24 hover:bg-red-500/20 hover:border-red-500/50 transition-colors"
                    onClick={() => shareToSocial("pinterest")}
                  >
                    <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center mb-2">
                      <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12c0 4.08 2.46 7.58 6 9.08V15c0-.48.12-.94.34-1.34-.22-.08-.34-.2-.34-.36 0-.36.36-1.02 1.34-1.8-.14-.78-.34-1.54-.34-2.5 0-3.5 2.5-6 6-6s6 2.5 6 6c0 2.06-.8 3.88-2.08 5.28-.92 1-1.92 1.28-2.92 1.28-1.12 0-1.84-.38-2.24-.82-.36.82-1.4 2.16-1.76 2.58-.06.1-.18.14-.3.08-.08-.02-.14-.1-.14-.18v-4.38c0-1.12-.32-1.7-1.18-1.7-1.54 0-2.44 1.28-2.44 2.86 0 .76.26 1.32.66 1.7-.18.44-.36.9-.5 1.36-.34 1.2-.64 2.38-1.02 3.56 2.14.92 4.48.92 6.62 0-.38-1.2-.68-2.38-1.02-3.56-.12-.44-.32-.9-.5-1.36.4-.38.66-.94.66-1.7 0-1.58-.9-2.86-2.44-2.86-.86 0-1.18.58-1.18 1.7v4.38c0 .08-.06.16-.14.18-.12.06-.24.02-.3-.08-.36-.42-1.4-1.76-1.76-2.58-.4.44-1.12.82-2.24.82-1 0-2-.28-2.92-1.28C7.8 15.88 7 14.06 7 12c0-3.5 2.5-6 6-6s6 2.5 6 6c0 .96-.2 1.72-.34 2.5.98.78 1.34 1.44 1.34 1.8 0 .16-.12.28-.34.36.22.4.34.86.34 1.34v6.08c3.54-1.5 6-5 6-9.08 0-5.52-4.48-10-10-10z" />
                      </svg>
                    </div>
                    Pinterest
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground">
                  Share your wishlist directly to your favorite social media platforms.
                </p>
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="public-wishlist">Public Wishlist</Label>
                    <p className="text-xs text-muted-foreground">
                      Allow others to view your wishlist without requiring a login
                    </p>
                  </div>
                  <Switch id="public-wishlist" checked={isPublic} onCheckedChange={setIsPublic} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notify-changes">Notify on Changes</Label>
                    <p className="text-xs text-muted-foreground">
                      Get notified when items in your wishlist change price or availability
                    </p>
                  </div>
                  <Switch id="notify-changes" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="allow-comments">Allow Comments</Label>
                    <p className="text-xs text-muted-foreground">Let others comment on your wishlist items</p>
                  </div>
                  <Switch id="allow-comments" defaultChecked />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
