"use client"

import { useState, useEffect } from "react"
import { Trophy, Gift, Star, Sparkles, X, ChevronRight, Zap, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import confetti from "canvas-confetti"

interface GamificationRewardsProps {
  className?: string
}

export default function GamificationRewards({ className }: GamificationRewardsProps) {
  const [open, setOpen] = useState(false)
  const [showReward, setShowReward] = useState(false)
  const [points, setPoints] = useState(750)
  const [level, setLevel] = useState(3)
  const [spinResult, setSpinResult] = useState<number | null>(null)
  const [isSpinning, setIsSpinning] = useState(false)
  const { toast } = useToast()

  // Simulate a notification when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowReward(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleClaimReward = () => {
    setShowReward(false)
    setOpen(true)
  }

  const handleSpin = () => {
    if (isSpinning) return

    setIsSpinning(true)
    setSpinResult(null)

    // Simulate spinning wheel
    setTimeout(() => {
      // Random result between 0 and 7 (8 segments)
      const result = Math.floor(Math.random() * 8)
      setSpinResult(result)

      // Trigger confetti for big wins
      if (result === 0 || result === 4) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        })
      }

      // Add points based on result
      const pointsWon = getPointsForSegment(result)
      setPoints((prev) => prev + pointsWon)

      toast({
        title: "You won!",
        description: `You've earned ${pointsWon} points!`,
      })

      setIsSpinning(false)
    }, 3000)
  }

  const getPointsForSegment = (segment: number): number => {
    const rewards = [500, 50, 100, 75, 250, 25, 150, 75]
    return rewards[segment]
  }

  const getColorForSegment = (segment: number): string => {
    const colors = [
      "from-purple-600 to-pink-600", // 500 points
      "from-slate-600 to-slate-700", // 50 points
      "from-blue-600 to-cyan-600", // 100 points
      "from-slate-600 to-slate-700", // 75 points
      "from-purple-600 to-pink-600", // 250 points
      "from-slate-600 to-slate-700", // 25 points
      "from-blue-600 to-cyan-600", // 150 points
      "from-slate-600 to-slate-700", // 75 points
    ]
    return colors[segment]
  }

  const getLabelForSegment = (segment: number): string => {
    const rewards = ["500 pts", "50 pts", "100 pts", "75 pts", "250 pts", "25 pts", "150 pts", "75 pts"]
    return rewards[segment]
  }

  return (
    <>
      <Button
        variant="outline"
        className={cn("relative neon-border group flex items-center gap-2", className)}
        onClick={() => setOpen(true)}
      >
        <Trophy className="h-4 w-4 text-primary" />
        <div className="flex flex-col items-start leading-none">
          <span className="text-xs text-muted-foreground">Level {level}</span>
          <span>{points} pts</span>
        </div>
      </Button>

      <AnimatePresence>
        {showReward && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-[100] w-80 max-w-sm bg-black/90 backdrop-blur-xl border border-white/10 rounded-lg overflow-hidden shadow-xl"
          >
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                    <Gift className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium">Daily Reward Available!</h4>
                    <p className="text-xs text-muted-foreground">Spin the wheel to win points</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowReward(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <Button className="w-full mt-3 bg-gradient-futuristic" size="sm" onClick={handleClaimReward}>
                <Sparkles className="mr-2 h-4 w-4" />
                Claim Reward
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px] p-0 gap-0 bg-black/90 backdrop-blur-xl border-white/10">
          <DialogHeader className="p-6 border-b border-white/10">
            <DialogTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              Rewards & Challenges
            </DialogTitle>
          </DialogHeader>

          <div className="p-6">
            <Tabs defaultValue="rewards" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="rewards">Rewards</TabsTrigger>
                <TabsTrigger value="challenges">Challenges</TabsTrigger>
                <TabsTrigger value="spin">Spin & Win</TabsTrigger>
              </TabsList>

              <TabsContent value="rewards" className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                      <Star className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium">Level {level}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <span>{points} points</span>
                        <span>•</span>
                        <span>{1000 - (points % 1000)} until next level</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="neon-border">
                    <Zap className="mr-2 h-4 w-4 text-primary" />
                    Redeem
                  </Button>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Progress to Level {level + 1}</span>
                    <span>{points % 1000}/1000</span>
                  </div>
                  <Progress value={(points % 1000) / 10} className="h-2" />
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Available Rewards</h4>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center">
                          <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h5 className="font-medium">$10 Store Credit</h5>
                          <p className="text-xs text-muted-foreground">Valid for 30 days</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">1000 pts</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center">
                          <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                            />
                          </svg>
                        </div>
                        <div>
                          <h5 className="font-medium">Free Shipping</h5>
                          <p className="text-xs text-muted-foreground">On your next order</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">500 pts</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                          <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                            />
                          </svg>
                        </div>
                        <div>
                          <h5 className="font-medium">Mystery Gift</h5>
                          <p className="text-xs text-muted-foreground">Surprise item with purchase</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">750 pts</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="challenges" className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Daily Challenges</h4>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg border border-white/10 bg-white/5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
                          <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h5 className="font-medium">Make a Purchase</h5>
                          <p className="text-xs text-muted-foreground">Buy any item from our store</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">+100 pts</span>
                        <Button variant="outline" size="sm">
                          Claim
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border border-white/10 bg-white/5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                          <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h5 className="font-medium">Write a Review</h5>
                          <p className="text-xs text-muted-foreground">Review any product you've purchased</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">+50 pts</span>
                        <Button variant="outline" size="sm">
                          Claim
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border border-white/10 bg-white/5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                          <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h5 className="font-medium">Share on Social</h5>
                          <p className="text-xs text-muted-foreground">Share any product on social media</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">+75 pts</span>
                        <Button variant="outline" size="sm">
                          Claim
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Weekly Challenges</h4>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg border border-white/10 bg-white/5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                          <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h5 className="font-medium">Purchase 3 Items</h5>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">Progress: 1/3</span>
                            <div className="w-20 h-1.5 bg-white/10 rounded-full overflow-hidden">
                              <div className="h-full bg-primary w-1/3" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <span className="text-sm font-medium">+200 pts</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border border-white/10 bg-white/5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
                          <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h5 className="font-medium">Add 5 Items to Wishlist</h5>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">Progress: 3/5</span>
                            <div className="w-20 h-1.5 bg-white/10 rounded-full overflow-hidden">
                              <div className="h-full bg-primary w-3/5" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <span className="text-sm font-medium">+150 pts</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="spin" className="space-y-6">
                <div className="flex flex-col items-center justify-center">
                  <div className="relative w-64 h-64 mb-6">
                    {/* Wheel segments */}
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div
                        key={i}
                        className={cn(
                          "absolute top-0 left-0 w-full h-full origin-center",
                          `bg-gradient-to-r ${getColorForSegment(i)}`,
                          isSpinning && "transition-transform duration-[3000ms] ease-out",
                        )}
                        style={{
                          clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos(((i + 1) * Math.PI) / 4)}% ${50 - 50 * Math.sin(((i + 1) * Math.PI) / 4)}%)`,
                          transform: isSpinning
                            ? `rotate(${3600 + (spinResult !== null ? 360 - spinResult * 45 : 0)}deg)`
                            : `rotate(${i * 45}deg)`,
                          zIndex: 10 - i,
                        }}
                      >
                        <div
                          className="absolute top-[25%] left-[60%] transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-sm"
                          style={{ transform: `rotate(${22.5 + i * 45}deg)` }}
                        >
                          {getLabelForSegment(i)}
                        </div>
                      </div>
                    ))}

                    {/* Center of wheel */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black border-4 border-white z-20 flex items-center justify-center">
                      <Sparkles className="h-6 w-6 text-primary" />
                    </div>

                    {/* Pointer */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 z-30">
                      <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[16px] border-l-transparent border-r-transparent border-t-white" />
                    </div>
                  </div>

                  <Button className="bg-gradient-futuristic" size="lg" onClick={handleSpin} disabled={isSpinning}>
                    {isSpinning ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Spinning...
                      </>
                    ) : (
                      <>
                        <Zap className="mr-2 h-4 w-4" />
                        Spin to Win
                      </>
                    )}
                  </Button>

                  <p className="text-sm text-muted-foreground mt-4 text-center">
                    Spin the wheel once per day to win bonus points!
                    <br />
                    Come back tomorrow for another spin.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
