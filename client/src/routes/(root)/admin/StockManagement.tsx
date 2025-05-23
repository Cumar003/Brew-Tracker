"use client";

import { useState } from "react";
import {
  AlertCircle,
  ArrowDownUp,
  ArrowUpDown,
  BarChart3,
  Box,
  ChevronDown,
  Download,
  FileText,
  Filter,
  History,
  MoreHorizontal,
  PackageOpen,
  PackagePlus,
  RefreshCw,
  Search,
  ShoppingCart,
  Truck,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample product data
const products = [
  {
    id: "p_001",
    name: "Arabica Coffee Beans",
    sku: "COF-ARA-1KG",
    category: "Coffee Beans",
    inStock: 45,
    minStock: 20,
    maxStock: 100,
    unitPrice: 24.99,
    supplier: "Premium Coffee Co.",
    lastUpdated: "Today, 9:15 AM",
    imageUrl: "https://placehold.co/100x100",
  },
  {
    id: "p_002",
    name: "Robusta Coffee Beans",
    sku: "COF-ROB-1KG",
    category: "Coffee Beans",
    inStock: 12,
    minStock: 15,
    maxStock: 80,
    unitPrice: 19.99,
    supplier: "Premium Coffee Co.",
    lastUpdated: "Yesterday, 2:30 PM",
    imageUrl: "https://placehold.co/100x100",
  },
  {
    id: "p_003",
    name: "Ceramic Coffee Mug",
    sku: "ACC-MUG-001",
    category: "Accessories",
    inStock: 78,
    minStock: 30,
    maxStock: 150,
    unitPrice: 12.5,
    supplier: "Kitchenware Ltd.",
    lastUpdated: "May 22, 8:45 AM",
    imageUrl: "https://placehold.co/100x100",
  },
  {
    id: "p_004",
    name: "French Press",
    sku: "EQP-FRP-001",
    category: "Equipment",
    inStock: 0,
    minStock: 5,
    maxStock: 30,
    unitPrice: 34.99,
    supplier: "Kitchenware Ltd.",
    lastUpdated: "May 21, 7:20 AM",
    imageUrl: "https://placehold.co/100x100",
  },
  {
    id: "p_005",
    name: "Vanilla Syrup",
    sku: "SYR-VAN-500",
    category: "Syrups",
    inStock: 8,
    minStock: 10,
    maxStock: 50,
    unitPrice: 8.99,
    supplier: "Flavor Essentials",
    lastUpdated: "May 20, 9:00 AM",
    imageUrl: "https://placehold.co/100x100",
  },
  {
    id: "p_006",
    name: "Caramel Syrup",
    sku: "SYR-CAR-500",
    category: "Syrups",
    inStock: 15,
    minStock: 10,
    maxStock: 50,
    unitPrice: 8.99,
    supplier: "Flavor Essentials",
    lastUpdated: "May 19, 3:15 PM",
    imageUrl: "https://placehold.co/100x100",
  },
  {
    id: "p_007",
    name: "Coffee Grinder",
    sku: "EQP-GRD-001",
    category: "Equipment",
    inStock: 7,
    minStock: 5,
    maxStock: 20,
    unitPrice: 59.99,
    supplier: "Kitchenware Ltd.",
    lastUpdated: "May 18, 11:30 AM",
    imageUrl: "https://placehold.co/100x100",
  },
  {
    id: "p_008",
    name: "Paper Coffee Filters",
    sku: "ACC-FLT-100",
    category: "Accessories",
    inStock: 120,
    minStock: 50,
    maxStock: 300,
    unitPrice: 4.99,
    supplier: "Kitchenware Ltd.",
    lastUpdated: "May 17, 8:15 AM",
    imageUrl: "https://placehold.co/100x100",
  },
];

// Sample stock movements
const stockMovements = [
  {
    id: "m_001",
    productId: "p_001",
    productName: "Arabica Coffee Beans",
    type: "Received",
    quantity: 20,
    date: "Today, 9:15 AM",
    user: "Alex Johnson",
    notes: "Regular supplier delivery",
  },
  {
    id: "m_002",
    productId: "p_002",
    productName: "Robusta Coffee Beans",
    type: "Adjustment",
    quantity: -3,
    date: "Yesterday, 2:30 PM",
    user: "Sarah Williams",
    notes: "Inventory count correction",
  },
  {
    id: "m_003",
    productId: "p_004",
    productName: "French Press",
    type: "Sold",
    quantity: -5,
    date: "May 22, 8:45 AM",
    user: "System",
    notes: "Sales order #5789",
  },
  {
    id: "m_004",
    productId: "p_001",
    productName: "Arabica Coffee Beans",
    type: "Sold",
    quantity: -10,
    date: "May 21, 7:20 AM",
    user: "System",
    notes: "Sales order #5782",
  },
  {
    id: "m_005",
    productId: "p_005",
    productName: "Vanilla Syrup",
    type: "Received",
    quantity: 15,
    date: "May 20, 9:00 AM",
    user: "Alex Johnson",
    notes: "Regular supplier delivery",
  },
];

export default function StockManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStockStatus, setSelectedStockStatus] = useState("all");
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("inventory");

  // Handle sort
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" ||
        product.category.toLowerCase() === selectedCategory.toLowerCase();

      let matchesStockStatus = true;
      if (selectedStockStatus === "in-stock") {
        matchesStockStatus = product.inStock > 0;
      } else if (selectedStockStatus === "low-stock") {
        matchesStockStatus =
          product.inStock > 0 && product.inStock <= product.minStock;
      } else if (selectedStockStatus === "out-of-stock") {
        matchesStockStatus = product.inStock === 0;
      } else if (selectedStockStatus === "overstock") {
        matchesStockStatus = product.inStock > product.maxStock;
      }

      return matchesSearch && matchesCategory && matchesStockStatus;
    })
    .sort((a, b) => {
      if (sortField === "inStock" || sortField === "unitPrice") {
        const fieldA = a[sortField as keyof typeof a] as number;
        const fieldB = b[sortField as keyof typeof b] as number;

        return sortDirection === "asc" ? fieldA - fieldB : fieldB - fieldA;
      } else {
        const fieldA = a[sortField as keyof typeof a] as string;
        const fieldB = b[sortField as keyof typeof b] as string;

        return sortDirection === "asc"
          ? fieldA.localeCompare(fieldB)
          : fieldB.localeCompare(fieldA);
      }
    });

  // Handle select all
  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map((product) => product.id));
    }
  };

  // Handle select product
  const handleSelectProduct = (productId: string) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  // Clear filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedStockStatus("all");
  };

  // Get stock status badge
  const getStockStatusBadge = (product: (typeof products)[0]) => {
    if (product.inStock === 0) {
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
          Out of Stock
        </Badge>
      );
    } else if (product.inStock <= product.minStock) {
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
          Low Stock
        </Badge>
      );
    } else if (product.inStock > product.maxStock) {
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
          Overstock
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          In Stock
        </Badge>
      );
    }
  };

  // Get stock level percentage
  const getStockLevelPercentage = (product: (typeof products)[0]) => {
    if (product.inStock === 0) return 0;
    if (product.maxStock === 0) return 100;
    const percentage = (product.inStock / product.maxStock) * 100;
    return Math.min(percentage, 100);
  };

  // Get movement type badge
  const getMovementTypeBadge = (type: string, quantity: number) => {
    switch (type.toLowerCase()) {
      case "received":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            +{quantity}
          </Badge>
        );
      case "sold":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            {quantity}
          </Badge>
        );
      case "adjustment":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            {quantity > 0 ? `+${quantity}` : quantity}
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            {quantity > 0 ? `+${quantity}` : quantity}
          </Badge>
        );
    }
  };

  // Calculate summary metrics
  const totalProducts = products.length;
  const lowStockProducts = products.filter(
    (p) => p.inStock > 0 && p.inStock <= p.minStock
  ).length;
  const outOfStockProducts = products.filter((p) => p.inStock === 0).length;
  const totalInventoryValue = products.reduce(
    (sum, product) => sum + product.inStock * product.unitPrice,
    0
  );

  return (
    <div className="">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Stock Management</h1>
          <p className="text-muted-foreground">
            Manage your inventory, stock levels and orders
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-9">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm" className="h-9">
            <PackagePlus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Box className="h-4 w-4" />
              Total Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-xs text-muted-foreground">
              Across {new Set(products.map((p) => p.category)).size} categories
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-yellow-500" />
              Low Stock Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {lowStockProducts}
            </div>
            <p className="text-xs text-muted-foreground">
              Items below minimum stock level
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <PackageOpen className="h-4 w-4 text-red-500" />
              Out of Stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {outOfStockProducts}
            </div>
            <p className="text-xs text-muted-foreground">
              Items requiring immediate reorder
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-green-500" />
              Inventory Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ${totalInventoryValue.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              Total value of current stock
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="inventory">
            <Box className="h-4 w-4 mr-2" />
            Inventory
          </TabsTrigger>
          <TabsTrigger value="movements">
            <History className="h-4 w-4 mr-2" />
            Stock Movements
          </TabsTrigger>
          <TabsTrigger value="orders">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Purchase Orders
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="mt-4">
          <div className="flex flex-col gap-3 mb-6">
            <CardHeader className="pb-3 p-0">
              <CardTitle className="text-base">Filters and Search</CardTitle>
              <CardDescription>
                Find and filter products by name, SKU, category or stock status
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by product name or SKU..."
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
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {Array.from(new Set(products.map((p) => p.category))).map(
                        (category) => (
                          <SelectItem
                            key={category}
                            value={category.toLowerCase()}
                          >
                            {category}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                  <Select
                    value={selectedStockStatus}
                    onValueChange={setSelectedStockStatus}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by stock status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Stock Status</SelectItem>
                      <SelectItem value="in-stock">In Stock</SelectItem>
                      <SelectItem value="low-stock">Low Stock</SelectItem>
                      <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                      <SelectItem value="overstock">Overstock</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={clearFilters}
                    disabled={
                      !searchTerm &&
                      selectedCategory === "all" &&
                      selectedStockStatus === "all"
                    }
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </div>

          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base">Products</CardTitle>
              <div className="flex items-center text-sm text-muted-foreground">
                {selectedProducts.length > 0 && (
                  <div className="flex items-center mr-4">
                    <span className="mr-2">
                      {selectedProducts.length} selected
                    </span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          Actions <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <PackagePlus className="mr-2 h-4 w-4" /> Add Stock
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Truck className="mr-2 h-4 w-4" /> Create Purchase
                          Order
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileText className="mr-2 h-4 w-4" /> Export Selected
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
                <span>
                  Showing {filteredProducts.length} of {products.length}{" "}
                  products
                </span>
              </div>
            </div>
          </CardHeader>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">
                    <Checkbox
                      checked={
                        selectedProducts.length === filteredProducts.length &&
                        filteredProducts.length > 0
                      }
                      onCheckedChange={handleSelectAll}
                      aria-label="Select all"
                    />
                  </TableHead>
                  <TableHead className="w-[250px]">
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={() => handleSort("name")}
                    >
                      Product
                      {sortField === "name" ? (
                        sortDirection === "asc" ? (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        ) : (
                          <ArrowUpDown className="ml-1 h-4 w-4" />
                        )
                      ) : (
                        <ArrowDownUp className="ml-1 h-4 w-4 opacity-30" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="w-[120px]">
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={() => handleSort("sku")}
                    >
                      SKU
                      {sortField === "sku" ? (
                        sortDirection === "asc" ? (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        ) : (
                          <ArrowUpDown className="ml-1 h-4 w-4" />
                        )
                      ) : (
                        <ArrowDownUp className="ml-1 h-4 w-4 opacity-30" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="w-[120px]">
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={() => handleSort("category")}
                    >
                      Category
                      {sortField === "category" ? (
                        sortDirection === "asc" ? (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        ) : (
                          <ArrowUpDown className="ml-1 h-4 w-4" />
                        )
                      ) : (
                        <ArrowDownUp className="ml-1 h-4 w-4 opacity-30" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="w-[120px]">
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={() => handleSort("inStock")}
                    >
                      Stock Level
                      {sortField === "inStock" ? (
                        sortDirection === "asc" ? (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        ) : (
                          <ArrowUpDown className="ml-1 h-4 w-4" />
                        )
                      ) : (
                        <ArrowDownUp className="ml-1 h-4 w-4 opacity-30" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="w-[120px]">Status</TableHead>
                  <TableHead className="w-[100px]">
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={() => handleSort("unitPrice")}
                    >
                      Unit Price
                      {sortField === "unitPrice" ? (
                        sortDirection === "asc" ? (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        ) : (
                          <ArrowUpDown className="ml-1 h-4 w-4" />
                        )
                      ) : (
                        <ArrowDownUp className="ml-1 h-4 w-4 opacity-30" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="w-[150px]">
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={() => handleSort("lastUpdated")}
                    >
                      Last Updated
                      {sortField === "lastUpdated" ? (
                        sortDirection === "asc" ? (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        ) : (
                          <ArrowUpDown className="ml-1 h-4 w-4" />
                        )
                      ) : (
                        <ArrowDownUp className="ml-1 h-4 w-4 opacity-30" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="w-[80px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="h-24 text-center">
                      No products found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id} className="group">
                      <TableCell>
                        <Checkbox
                          checked={selectedProducts.includes(product.id)}
                          onCheckedChange={() =>
                            handleSelectProduct(product.id)
                          }
                          aria-label={`Select ${product.name}`}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-md border bg-muted flex items-center justify-center overflow-hidden">
                            <img
                              src={product.imageUrl || "/placeholder.svg"}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="font-medium">{product.name}</div>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {product.sku}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{product.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">
                              {product.inStock}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              Min: {product.minStock} | Max: {product.maxStock}
                            </span>
                          </div>
                          <Progress
                            value={getStockLevelPercentage(product)}
                            className="h-2"
                          />
                        </div>
                      </TableCell>
                      <TableCell>{getStockStatusBadge(product)}</TableCell>
                      <TableCell>${product.unitPrice.toFixed(2)}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {product.lastUpdated}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <PackagePlus className="mr-2 h-4 w-4" /> Add Stock
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Filter className="mr-2 h-4 w-4" /> Adjust Stock
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <History className="mr-2 h-4 w-4" /> View History
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Truck className="mr-2 h-4 w-4" /> Create Order
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end py-4">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="movements" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-base">
                  Recent Stock Movements
                </CardTitle>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">Product</TableHead>
                      <TableHead className="w-[120px]">Type</TableHead>
                      <TableHead className="w-[100px]">Quantity</TableHead>
                      <TableHead className="w-[150px]">Date</TableHead>
                      <TableHead className="w-[150px]">User</TableHead>
                      <TableHead>Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stockMovements.map((movement) => (
                      <TableRow key={movement.id}>
                        <TableCell className="font-medium">
                          {movement.productName}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              movement.type === "Received"
                                ? "bg-green-100 text-green-800"
                                : movement.type === "Sold"
                                ? "bg-red-100 text-red-800"
                                : "bg-blue-100 text-blue-800"
                            }
                          >
                            {movement.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {getMovementTypeBadge(
                            movement.type,
                            movement.quantity
                          )}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {movement.date}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {movement.user}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {movement.notes}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <CardFooter className="flex justify-center py-4">
                <Button variant="outline">Load More</Button>
              </CardFooter>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="mt-4">
          <Card className="h-[400px] flex items-center justify-center">
            <div className="text-center">
              <Truck className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">Purchase Orders</h3>
              <p className="text-muted-foreground mb-4">
                Manage your purchase orders and supplier deliveries
              </p>
              <Button>Create Purchase Order</Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
