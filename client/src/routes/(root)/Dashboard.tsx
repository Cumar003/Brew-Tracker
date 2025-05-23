import type React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, User, CreditCard, Trophy, Coffee } from "lucide-react"

interface DashboardProps {
  user?: {
    name: string
    email: string
    avatarUrl?: string
    memberSince: string
  }
  balance?: {
    amount: string
    dueDate: string
  }
  lastOrder?: {
    name: string
    date: string
    price: string
    imageUrl?: string
  }
}

const Dashboard: React.FC<DashboardProps> = ({
  user = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    avatarUrl: "https://placehold.co/400",
    memberSince: "Jan 2023",
  },
  balance = {
    amount: "$24.50",
    dueDate: "May 30, 2025",
  },
  lastOrder = {
    name: "Iced Caramel Macchiato",
    date: "Today, 9:15 AM",
    price: "$5.75",
    imageUrl: "https://placehold.co/400x300",
  },
}) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Top Row - Profile and Balance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        {/* Profile Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Welcome back!</CardTitle>
                <CardDescription>Here's your account overview</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                Edit Profile
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center  gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user.avatarUrl || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback>
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{user.name}</h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <div className="flex items-center mt-1 text-xs text-muted-foreground">
                  <User className="mr-1 h-3 w-3" />
                  <span>Member since {user.memberSince}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Balance Card */}
        <Card className="border-red-200 bg-red-50/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-red-600" />
              <CardTitle className="text-lg text-red-700">Balance Due</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="text-2xl font-bold text-red-700">{balance.amount}</div>
              <div className="flex items-center text-xs text-red-600">
                <CalendarIcon className="mr-1 h-3 w-3" />
                <span>Due {balance.dueDate}</span>
              </div>
            </div>
            <Button size="sm" className="w-full bg-red-600 hover:bg-red-700">
              Pay Now
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Middle Row - Last Order and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* Last Order Card */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-lg">Last Order</CardTitle>
                <CardDescription>{lastOrder.date}</CardDescription>
              </div>
              <Badge variant="outline">{lastOrder.price}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <div className="relative h-16 w-16 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={lastOrder.imageUrl || "/placeholder.svg"}
                  alt={lastOrder.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">{lastOrder.name}</h3>
                <div className="text-xs text-muted-foreground mt-1 space-y-0.5">
                  <div>Grande • Extra shot • Oat milk</div>
                </div>
                <div className="flex gap-2 mt-2">
                  <Button variant="outline" size="sm" className="text-xs h-7">
                    View Details
                  </Button>
                  <Button size="sm" className="text-xs h-7">
                    Order Again
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="flex justify-center mb-1">
                  <Coffee className="h-5 w-5 text-blue-600" />
                </div>
                <div className="text-xl font-bold">24</div>
                <div className="text-xs text-muted-foreground">Total Orders</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-1">
                  <Trophy className="h-5 w-5 text-yellow-600" />
                </div>
                <div className="text-xl font-bold">350</div>
                <div className="text-xs text-muted-foreground">Points</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-1">
                  <Badge variant="outline" className="h-5 px-1 text-xs">
                    Next
                  </Badge>
                </div>
                <div className="text-xl font-bold">150</div>
                <div className="text-xs text-muted-foreground">To Reward</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row - Recent Activity */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
              <CardDescription>Your latest transactions</CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <Coffee className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <div className="font-medium text-sm">Iced Caramel Macchiato</div>
                  <div className="text-xs text-muted-foreground">Today, 9:15 AM</div>
                </div>
              </div>
              <div className="text-sm font-medium">$5.75</div>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Coffee className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-sm">Vanilla Latte</div>
                  <div className="text-xs text-muted-foreground">Yesterday, 2:30 PM</div>
                </div>
              </div>
              <div className="text-sm font-medium">$4.25</div>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <Coffee className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <div className="font-medium text-sm">Espresso Shot</div>
                  <div className="text-xs text-muted-foreground">May 22, 8:45 AM</div>
                </div>
              </div>
              <div className="text-sm font-medium">$2.50</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard
