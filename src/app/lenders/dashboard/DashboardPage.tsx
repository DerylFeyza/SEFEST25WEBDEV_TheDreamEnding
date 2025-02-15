"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Users,
  Filter,
  ClipboardList,
  DollarSign,
  Plus,
  List,
  Clock,
  CalendarDays,
  HandCoins,
  BaggageClaim,
} from "lucide-react"
import Link from "next/link"
import type { Item, Review, User, Rental } from "@prisma/client"
import Image from "next/image"
import { formatToIDR } from "@/helper/formatToIDR"
import { format } from "date-fns"
import { getDaysDifference } from "@/helper/days-diff"
import { Badge } from "@/components/ui/badge"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { useState } from "react"
import { handleUpdateRental } from "@/app/utils/actions/rental"
import { toast } from "sonner"

interface bestSeller {
  bestSeller: Item[] & { reviews: Review[] & { user: User }[] }[]
}

interface DashboardStats {
  totalRevenue: string
  totalOngoingRent: number
  totalItems: number
  totalOrders: number
}

interface LatestPendingRental extends Rental {
  User: User
  item: Item
}

interface DashboardPageProps extends bestSeller, DashboardStats {
  latestPendingRental: LatestPendingRental | null
}

export default function DashboardPage({
  bestSeller,
  totalRevenue,
  totalOngoingRent,
  totalItems,
  totalOrders,
  latestPendingRental,
}: DashboardPageProps) {
  const [loading, setLoading] = useState(false)

  const handleUpdate = async (status: "CONFIRMED" | "CANCELLED") => {
    if (!latestPendingRental) return

    setLoading(true)
    const loadingToast = toast.loading("Updating Request...")
    const formData = new FormData()
    formData.append("status", status)
    const result = await handleUpdateRental(latestPendingRental.id, formData)
    if (result.success) {
      setLoading(false)
      toast.success("Rent request updated successfully", { id: loadingToast })
    } else {
      setLoading(false)
      toast.error("Rent request update failed!", { id: loadingToast })
    }
  }
  return (
    <div className="bg-background min-h-screen p-6 space-y-6">
      {/* Stats Cards */}
      <div className="md:grid-cols-4 grid grid-cols-1 gap-4">
        <Card className="bg-primary text-primary-foreground p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="opacity-80 text-sm">Total sales</p>
              <p className="text-2xl font-bold">{formatToIDR(Number(totalRevenue))}</p>
            </div>
            <DollarSign className="opacity-80" />
          </div>
        </Card>
        <Card className="bg-primary text-primary-foreground p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="opacity-80 text-sm">Ongoing Rent</p>
              <p className="text-2xl font-bold">{totalOngoingRent}</p>
            </div>
            <Users className="opacity-80" />
          </div>
        </Card>
        <Card className="bg-primary text-primary-foreground p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="opacity-80 text-sm">Total Items</p>
              <p className="text-2xl font-bold">{totalItems}</p>
            </div>
            <Filter className="opacity-80" />
          </div>
        </Card>
        <Card className="bg-primary text-primary-foreground p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="opacity-80 text-sm">Total orders</p>
              <p className="text-2xl font-bold">{totalOrders}</p>
            </div>
            <ClipboardList className="opacity-80" />
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <div className="md:grid-cols-2 grid gap-6">
        {/* Latest Pending Rental Request */}
        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold">Latest Pending Rental Request</h2>
              <p className="text-muted-foreground text-sm">Most recent rental request awaiting your confirmation</p>
            </div>
          </div>
          {latestPendingRental ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{latestPendingRental.User.name}</h3>
                <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <AspectRatio ratio={16 / 9} className="bg-muted">
                  <Image
                    src={latestPendingRental.item.image_url || "/placeholder.svg"}
                    alt={latestPendingRental.item.name}
                    fill
                    className="rounded-md object-cover"
                  />
                </AspectRatio>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Duration:</span>
                    </div>
                    <span>
                      {getDaysDifference(latestPendingRental.start_date, latestPendingRental.finished_date)} Days
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center space-x-2">
                      <CalendarDays className="h-4 w-4 text-muted-foreground" />
                      <span>Dates:</span>
                    </div>
                    <span className="text-sm">
                      {format(new Date(latestPendingRental.start_date), "dd MMM")} -{" "}
                      {format(new Date(latestPendingRental.finished_date), "dd MMM")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center space-x-2">
                      <BaggageClaim className="h-4 w-4 text-muted-foreground" />
                      <span>Amount:</span>
                    </div>
                    <span>{latestPendingRental.rent_amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center space-x-2">
                      <HandCoins className="h-4 w-4 text-muted-foreground" />
                      <span>Revenue:</span>
                    </div>
                    <span>{formatToIDR(latestPendingRental.paid_amount)}</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <Button variant="outline" onClick={() => handleUpdate("CANCELLED")} disabled={loading}>
                  Reject
                </Button>
                <Button onClick={() => handleUpdate("CONFIRMED")} disabled={loading}>
                  Confirm
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground">No pending rental requests at the moment.</p>
          )}
        </Card>

        {/* Right Side Content */}
        <div className="space-y-6">
          {/* Product Actions */}
          <Card className="bg-accent p-6">
            <div className="space-y-4">
              <h3 className="text-accent-foreground text-lg font-semibold">Product Management</h3>
              <div className="lg:flex-row flex flex-col gap-4">
                <Button className="flex-1">
                  <Plus className="w-4 h-4 mr-2" />
                  <Link href="/lenders/dashboard/items/add">Add New Product</Link>
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
              {bestSeller.map((product, index) => (
                <div key={index} className="space-y-2">
                  <div className="aspect-square bg-muted rounded-lg">
                    <Image
                      src={product.image_url || "/placeholder.svg"}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="h-[200px] w-[200px] rounded-lg object-cover"
                    />
                  </div>
                  <h4 className="text-sm font-medium">{product.name}</h4>
                  <p className="text-muted-foreground text-sm">{formatToIDR(product.rent_price)}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
