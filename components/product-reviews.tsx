"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

interface ProductReviewsProps {
  productId: string
}

// Mock data - in a real app, this would come from an API
const reviews = [
  {
    id: "1",
    author: "Alex Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "2 months ago",
    title: "Excellent quality and design",
    content:
      "I'm extremely satisfied with this product. The quality is outstanding and the design is exactly what I was looking for. Highly recommend!",
  },
  {
    id: "2",
    author: "Sam Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    date: "1 month ago",
    title: "Great product, minor issues",
    content:
      "Overall, I'm happy with my purchase. The product is well-made and looks great. The only issue I had was with the sizing, which runs a bit small.",
  },
  {
    id: "3",
    author: "Jamie Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "3 weeks ago",
    title: "Exceeded my expectations",
    content:
      "This product exceeded all my expectations. The quality is top-notch and it arrived earlier than expected. Will definitely buy from this brand again!",
  },
]

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const [rating, setRating] = useState(0)
  const [reviewTitle, setReviewTitle] = useState("")
  const [reviewContent, setReviewContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleRatingChange = (newRating: number) => {
    setRating(newRating)
  }

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Review submitted",
        description: "Thank you for your feedback!",
      })
      setRating(0)
      setReviewTitle("")
      setReviewContent("")
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Customer Reviews</h3>
        <div className="flex items-center gap-2">
          <div className="flex">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Star key={i} className={`h-5 w-5 ${i < 4 ? "fill-primary" : "fill-muted stroke-muted-foreground"}`} />
              ))}
          </div>
          <span className="text-sm font-medium">4.0 out of 5</span>
          <span className="text-sm text-muted-foreground">Based on {reviews.length} reviews</span>
        </div>
      </div>

      <Separator />

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="space-y-2">
            <div className="flex items-center gap-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.author} />
                <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{review.author}</div>
                <div className="text-xs text-muted-foreground">{review.date}</div>
              </div>
            </div>
            <div className="flex items-center">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < review.rating ? "fill-primary" : "fill-muted stroke-muted-foreground"}`}
                  />
                ))}
            </div>
            <div>
              <h4 className="font-medium">{review.title}</h4>
              <p className="text-sm text-muted-foreground">{review.content}</p>
            </div>
            <Separator />
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Write a Review</h3>
        <form onSubmit={handleSubmitReview} className="space-y-4">
          <div className="space-y-2">
            <div className="text-sm font-medium">Rating</div>
            <div className="flex">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <button key={i} type="button" className="p-0" onClick={() => handleRatingChange(i + 1)}>
                    <Star className={`h-6 w-6 ${i < rating ? "fill-primary" : "fill-muted stroke-muted-foreground"}`} />
                  </button>
                ))}
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="review-title" className="text-sm font-medium">
              Title
            </label>
            <input
              id="review-title"
              className="w-full rounded-md border px-3 py-2"
              value={reviewTitle}
              onChange={(e) => setReviewTitle(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="review-content" className="text-sm font-medium">
              Review
            </label>
            <Textarea
              id="review-content"
              className="min-h-[100px]"
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
              required
            />
          </div>
          <Button type="submit" disabled={isSubmitting || rating === 0}>
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      </div>
    </div>
  )
}
