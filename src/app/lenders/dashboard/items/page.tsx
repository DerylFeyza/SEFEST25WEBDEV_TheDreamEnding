"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search, Plus, Edit } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Sample product data
const products = [
  {
    id: 1,
    name: "Wooden Chair",
    price: 29.99,
    stock: 15,
    category: "Furniture",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-K9sHCbV1qaTz1Ej6SulIBpovyb7PVk.png",
  },
  {
    id: 2,
    name: "Dining Chair",
    price: 35.99,
    stock: 8,
    category: "Furniture",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-K9sHCbV1qaTz1Ej6SulIBpovyb7PVk.png",
  },
  {
    id: 3,
    name: "Eames Chair",
    price: 42.99,
    stock: 12,
    category: "Furniture",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-K9sHCbV1qaTz1Ej6SulIBpovyb7PVk.png",
  },
  {
    id: 4,
    name: "Coffee Table",
    price: 89.99,
    stock: 5,
    category: "Furniture",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-K9sHCbV1qaTz1Ej6SulIBpovyb7PVk.png",
  },
  {
    id: 5,
    name: "Bookshelf",
    price: 129.99,
    stock: 3,
    category: "Furniture",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-K9sHCbV1qaTz1Ej6SulIBpovyb7PVk.png",
  },
  {
    id: 6,
    name: "Desk Lamp",
    price: 24.99,
    stock: 20,
    category: "Lighting",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-K9sHCbV1qaTz1Ej6SulIBpovyb7PVk.png",
  },
  {
    id: 7,
    name: "Floor Lamp",
    price: 79.99,
    stock: 7,
    category: "Lighting",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-K9sHCbV1qaTz1Ej6SulIBpovyb7PVk.png",
  },
  {
    id: 8,
    name: "Throw Pillow",
    price: 19.99,
    stock: 25,
    category: "Decor",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-K9sHCbV1qaTz1Ej6SulIBpovyb7PVk.png",
  },
  {
    id: 9,
    name: "Area Rug",
    price: 149.99,
    stock: 4,
    category: "Decor",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-K9sHCbV1qaTz1Ej6SulIBpovyb7PVk.png",
  },
  {
    id: 10,
    name: "Wall Clock",
    price: 39.99,
    stock: 10,
    category: "Decor",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-K9sHCbV1qaTz1Ej6SulIBpovyb7PVk.png",
  },
];

function ProductCard({ product }) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-square relative">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
        <p className="text-muted-foreground mb-2">{product.category}</p>
        <div className="flex justify-between items-center">
          <span className="font-bold text-primary">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-sm text-muted-foreground">
            Stock: {product.stock}
          </span>
        </div>
        <Button variant="outline" size="sm" className="w-full mt-4">
          <Edit className="w-4 h-4 mr-2" /> Edit
        </Button>
      </CardContent>
    </Card>
  );
}

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Products</CardTitle>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Button variant="outline" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </CardContent>
      </Card>
      <Button variant="outline" asChild>
        <Link href="/lenders/dashboard">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Link>
      </Button>
    </div>
  );
}
