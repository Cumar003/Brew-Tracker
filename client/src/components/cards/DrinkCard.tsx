import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface FoodCardProps {
  title?: string
  description?: string
  price?: string
  quantity?: string
  imageUrl?: string
}

const FoodCard: React.FC<FoodCardProps> = ({
  title = "Chicken Pasta",
  description = "Delicious pasta with grilled chicken, creamy sauce, and fresh herbs.",
  price = "$12.99",
  quantity = "1 serving",
  imageUrl = "https://kzmph6mx74sm3t23kenm.lite.vusercontent.net/placeholder.svg?height=400&width=600",
}) => {
  return (
    <Card className="w-full max-w-sm overflow-hidden p-0">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <img
            src={imageUrl || "https://kzmph6mx74sm3t23kenm.lite.vusercontent.net/placeholder.svg?height=400&width=600"}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <Badge variant="outline" className="ml-2">
            {price}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="flex items-center mt-2">
          <span className="text-sm font-medium">Quantity:</span>
          <span className="ml-2 text-sm">{quantity}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full">Take Out</Button>
      </CardFooter>
    </Card>
  )
}

export default FoodCard
