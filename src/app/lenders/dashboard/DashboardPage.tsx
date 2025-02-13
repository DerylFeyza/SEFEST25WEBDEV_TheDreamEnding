"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ArrowUpRight,
  Users,
  Filter,
  ClipboardList,
  DollarSign,
  Plus,
  List,
} from "lucide-react";
import Link from "next/link";

const chartdata = [
  { date: "2 Dec", Revenue: 15 },
  { date: "3 Dec", Revenue: 25 },
  { date: "4 Dec", Revenue: 35 },
  { date: "5 Dec", Revenue: 50 },
  { date: "6 Dec", Revenue: 30 },
  { date: "7 Dec", Revenue: 65 },
];

const products = [
  {
    name: "Wooden Chair",
    price: "$29.99",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-K9sHCbV1qaTz1Ej6SulIBpovyb7PVk.png",
  },
  {
    name: "Dinning Chair",
    price: "$35.99",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-K9sHCbV1qaTz1Ej6SulIBpovyb7PVk.png",
  },
  {
    name: "Eames Chairs",
    price: "$42.99",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-K9sHCbV1qaTz1Ej6SulIBpovyb7PVk.png",
  },
];

export default function DashboardPage() {
  return (
    <div className="bg-background min-h-screen p-6 space-y-6">
      {/* Stats Cards */}
      <div className="md:grid-cols-4 grid grid-cols-1 gap-4">
        <Card className="bg-primary text-primary-foreground p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="opacity-80 text-sm">Total sales</p>
              <p className="text-2xl font-bold">321k</p>
            </div>
            <DollarSign className="opacity-80" />
          </div>
        </Card>
        <Card className="bg-primary text-primary-foreground p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="opacity-80 text-sm">Visitor</p>
              <p className="text-2xl font-bold">678k</p>
            </div>
            <Users className="opacity-80" />
          </div>
        </Card>
        <Card className="bg-primary text-primary-foreground p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="opacity-80 text-sm">Cvr</p>
              <p className="text-2xl font-bold">7.89</p>
            </div>
            <Filter className="opacity-80" />
          </div>
        </Card>
        <Card className="bg-primary text-primary-foreground p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="opacity-80 text-sm">Total orders</p>
              <p className="text-2xl font-bold">211k</p>
            </div>
            <ClipboardList className="opacity-80" />
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <div className="md:grid-cols-2 grid gap-6">
        {/* Chart */}
        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold">Summary Revenue</h2>
              <p className="text-muted-foreground text-sm">
                Last update last week
              </p>
            </div>
            <div className="flex gap-2">
              <span className="text-primary flex items-center gap-1 text-sm">
                <ArrowUpRight className="w-4 h-4" /> 23.22%
              </span>
              <span className="text-destructive text-sm">3.31%</span>
            </div>
          </div>
          <div className="h-[200px] mt-4"></div>
        </Card>

        {/* Right Side Content */}
        <div className="space-y-6">
          {/* Product Actions */}
          <Card className="bg-accent p-6">
            <div className="space-y-4">
              <h3 className="text-accent-foreground text-lg font-semibold">
                Product Management
              </h3>
              <div className="flex gap-4">
                <Button className="flex-1">
                  <Plus className="w-4 h-4 mr-2" /> Add New Product
                </Button>
                <Button variant="outline" className="flex-1" asChild>
                  <Link href="/lenders/dashboard/items">
                    <List className="w-4 h-4 mr-2" /> View All Products
                  </Link>
                </Button>
              </div>
            </div>
          </Card>

          {/* Best Seller */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Best Seller</h3>
              <ArrowRight className="text-muted-foreground w-5 h-5" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {products.map((product, index) => (
                <div key={index} className="space-y-2">
                  <div className="aspect-square bg-muted rounded-lg"></div>
                  <h4 className="text-sm font-medium">{product.name}</h4>
                  <p className="text-muted-foreground text-sm">
                    {product.price}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
