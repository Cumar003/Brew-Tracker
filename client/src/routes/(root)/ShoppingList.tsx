"use client"

import { useState } from "react"
import { Check, ChevronDown, Minus, MoreHorizontal, Plus, Search, ShoppingCart, Trash2, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample shopping list data
const initialShoppingItems = [
  {
    id: "item_001",
    name: "Arabica Coffee Beans",
    category: "Coffee",
    quantity: 2,
    unit: "kg",
    estimatedPrice: 24.99,
    priority: "high",
    completed: false,
    notes: "Premium quality for espresso",
    addedDate: "Today",
  },
  {
    id: "item_002",
    name: "Whole Milk",
    category: "Dairy",
    quantity: 1,
    unit: "liter",
    estimatedPrice: 3.49,
    priority: "medium",
    completed: true,
    notes: "",
    addedDate: "Today",
  },
  {
    id: "item_003",
    name: "Vanilla Syrup",
    category: "Syrups",
    quantity: 3,
    unit: "bottles",
    estimatedPrice: 8.99,
    priority: "low",
    completed: false,
    notes: "Sugar-free option preferred",
    addedDate: "Yesterday",
  },
  {
    id: "item_004",
    name: "Paper Coffee Cups",
    category: "Supplies",
    quantity: 100,
    unit: "pieces",
    estimatedPrice: 15.99,
    priority: "high",
    completed: false,
    notes: "12oz size with lids",
    addedDate: "Yesterday",
  },
  {
    id: "item_005",
    name: "Ceramic Mugs",
    category: "Equipment",
    quantity: 6,
    unit: "pieces",
    estimatedPrice: 12.5,
    priority: "medium",
    completed: true,
    notes: "White color preferred",
    addedDate: "2 days ago",
  },
  {
    id: "item_006",
    name: "Sugar Packets",
    category: "Supplies",
    quantity: 200,
    unit: "packets",
    estimatedPrice: 9.99,
    priority: "medium",
    completed: false,
    notes: "Individual packets",
    addedDate: "2 days ago",
  },
  {
    id: "item_007",
    name: "Cleaning Supplies",
    category: "Maintenance",
    quantity: 1,
    unit: "set",
    estimatedPrice: 25.99,
    priority: "high",
    completed: false,
    notes: "Food-safe sanitizer",
    addedDate: "3 days ago",
  },
  {
    id: "item_008",
    name: "Caramel Syrup",
    category: "Syrups",
    quantity: 2,
    unit: "bottles",
    estimatedPrice: 8.99,
    priority: "low",
    completed: false,
    notes: "",
    addedDate: "3 days ago",
  },
]

export default function ShoppingList() {
  const [shoppingItems, setShoppingItems] = useState(initialShoppingItems)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPriority, setSelectedPriority] = useState("all")
  const [showCompleted, setShowCompleted] = useState(true)
  const [newItemName, setNewItemName] = useState("")
  const [newItemQuantity, setNewItemQuantity] = useState(1)
  const [newItemUnit, setNewItemUnit] = useState("pieces")
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  // Handle toggle item completion
  const toggleItemCompletion = (itemId: string) => {
    setShoppingItems((items) =>
      items.map((item) => (item.id === itemId ? { ...item, completed: !item.completed } : item)),
    )
  }

  // Handle quantity change
  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) return
    setShoppingItems((items) => items.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item)))
  }

  // Handle delete item
  const deleteItem = (itemId: string) => {
    setShoppingItems((items) => items.filter((item) => item.id !== itemId))
  }

  // Handle add new item
  const addNewItem = () => {
    if (!newItemName.trim()) return

    const newItem = {
      id: `item_${Date.now()}`,
      name: newItemName,
      category: "Other",
      quantity: newItemQuantity,
      unit: newItemUnit,
      estimatedPrice: 0,
      priority: "medium" as const,
      completed: false,
      notes: "",
      addedDate: "Just now",
    }

    setShoppingItems((items) => [newItem, ...items])
    setNewItemName("")
    setNewItemQuantity(1)
    setNewItemUnit("pieces")
  }

  // Handle select item
  const handleSelectItem = (itemId: string) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId))
    } else {
      setSelectedItems([...selectedItems, itemId])
    }
  }

  // Handle select all
  const handleSelectAll = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(filteredItems.map((item) => item.id))
    }
  }

  // Handle bulk delete
  const handleBulkDelete = () => {
    setShoppingItems((items) => items.filter((item) => !selectedItems.includes(item.id)))
    setSelectedItems([])
  }

  // Handle bulk complete
  const handleBulkComplete = () => {
    setShoppingItems((items) =>
      items.map((item) => (selectedItems.includes(item.id) ? { ...item, completed: true } : item)),
    )
    setSelectedItems([])
  }

  // Filter items
  const filteredItems = shoppingItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item.category.toLowerCase() === selectedCategory.toLowerCase()
    const matchesPriority = selectedPriority === "all" || item.priority === selectedPriority
    const matchesCompletion = showCompleted || !item.completed

    return matchesSearch && matchesCategory && matchesPriority && matchesCompletion
  })

  // Get priority badge
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Medium</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Low</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  // Calculate totals
  const totalItems = shoppingItems.length
  const completedItems = shoppingItems.filter((item) => item.completed).length
  const pendingItems = totalItems - completedItems
  const estimatedTotal = shoppingItems
    .filter((item) => !item.completed)
    .reduce((sum, item) => sum + item.estimatedPrice * item.quantity, 0)

  // Get categories
  const categories = Array.from(new Set(shoppingItems.map((item) => item.category)))

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <ShoppingCart className="h-6 w-6" />
            Shopping List
          </h1>
          <p className="text-muted-foreground">Manage your shopping items and track your purchases</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowCompleted(!showCompleted)}>
            {showCompleted ? "Hide" : "Show"} Completed
          </Button>
          <Button size="sm" onClick={() => window.print()}>
            Print List
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-background border rounded-lg p-4">
          <h3 className="text-sm font-medium mb-1">Total Items</h3>
          <div className="text-2xl font-bold">{totalItems}</div>
          <p className="text-xs text-muted-foreground">Items in your list</p>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <h3 className="text-sm font-medium mb-1 text-orange-800">Pending</h3>
          <div className="text-2xl font-bold text-orange-600">{pendingItems}</div>
          <p className="text-xs text-orange-700">Items to purchase</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="text-sm font-medium mb-1 text-green-800">Completed</h3>
          <div className="text-2xl font-bold text-green-600">{completedItems}</div>
          <p className="text-xs text-green-700">Items purchased</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium mb-1 text-blue-800">Estimated Total</h3>
          <div className="text-2xl font-bold text-blue-600">${estimatedTotal.toFixed(2)}</div>
          <p className="text-xs text-blue-700">For pending items</p>
        </div>
      </div>

      {/* Add New Item */}
      <div className="bg-background rounded-lg mb-6 p-2">
        <div className="mb-3">
          <h2 className="text-base font-medium">Add New Item</h2>
          <p className="text-sm text-muted-foreground">Quickly add items to your shopping list</p>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Enter item name..."
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addNewItem()}
            />
          </div>
          <div className="flex gap-2">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9"
                onClick={() => setNewItemQuantity(Math.max(1, newItemQuantity - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                value={newItemQuantity}
                onChange={(e) => setNewItemQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                className="w-16 text-center"
                min="1"
              />
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9"
                onClick={() => setNewItemQuantity(newItemQuantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Select value={newItemUnit} onValueChange={setNewItemUnit}>
              <SelectTrigger className="w-[100px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pieces">pieces</SelectItem>
                <SelectItem value="kg">kg</SelectItem>
                <SelectItem value="liter">liter</SelectItem>
                <SelectItem value="bottles">bottles</SelectItem>
                <SelectItem value="packets">packets</SelectItem>
                <SelectItem value="set">set</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={addNewItem} disabled={!newItemName.trim()}>
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-background  rounded-lg p-2 mb-6">
        <div className="mb-3">
          <h2 className="text-base font-medium">Filters</h2>
          <p className="text-sm text-muted-foreground">Filter your shopping list by category, priority or search</p>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search items..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1 h-7 w-7 p-0"
                onClick={() => setSearchTerm("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <div className="flex gap-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category.toLowerCase()}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedPriority} onValueChange={setSelectedPriority}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="low">Low Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Shopping List */}
      <div className="bg-background border rounded-lg">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-medium">Items</h2>
            <div className="flex items-center text-sm text-muted-foreground">
              {selectedItems.length > 0 && (
                <div className="flex items-center mr-4">
                  <span className="mr-2">{selectedItems.length} selected</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        Actions <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={handleBulkComplete}>
                        <Check className="mr-2 h-4 w-4" /> Mark as Completed
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleBulkDelete} className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" /> Delete Selected
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
              <span>
                Showing {filteredItems.length} of {totalItems} items
              </span>
            </div>
          </div>
        </div>
        <div className="p-4">
          {filteredItems.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">No items found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or add some items to your list</p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-4">
                <Checkbox
                  checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all"
                />
                <span className="text-sm font-medium">Select All</span>
              </div>
              <div className="space-y-2">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center gap-4 p-4 rounded-lg border transition-colors ${
                      item.completed
                        ? "bg-muted/50 border-muted-foreground/20"
                        : "bg-background border-border hover:bg-muted/30"
                    }`}
                  >
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onCheckedChange={() => handleSelectItem(item.id)}
                      aria-label={`Select ${item.name}`}
                    />
                    <Checkbox
                      checked={item.completed}
                      onCheckedChange={() => toggleItemCompletion(item.id)}
                      aria-label={`Mark ${item.name} as ${item.completed ? "pending" : "completed"}`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3
                          className={`font-medium ${
                            item.completed ? "line-through text-muted-foreground" : "text-foreground"
                          }`}
                        >
                          {item.name}
                        </h3>
                        <Badge variant="outline" className="text-xs">
                          {item.category}
                        </Badge>
                        {getPriorityBadge(item.priority)}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>
                          {item.quantity} {item.unit}
                        </span>
                        {item.estimatedPrice > 0 && <span>${(item.estimatedPrice * item.quantity).toFixed(2)}</span>}
                        <span>{item.addedDate}</span>
                      </div>
                      {item.notes && <p className="text-xs text-muted-foreground mt-1">{item.notes}</p>}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => toggleItemCompletion(item.id)}>
                            <Check className="mr-2 h-4 w-4" />
                            {item.completed ? "Mark as Pending" : "Mark as Completed"}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => deleteItem(item.id)} className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Item
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>  
  )
}
