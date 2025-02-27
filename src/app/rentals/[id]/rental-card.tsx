"use client"

import type React from "react"
import { MessageSquare, Heart, Share } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import type { Item, Review } from "@prisma/client"
import { handleCreateRental } from "@/app/utils/actions/rental"
import { useSession } from "next-auth/react"
import { getDaysDifference } from "@/helper/days-diff"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

export interface RentalCardProps {
  item: Item & { reviews?: Review[] }
  items: number
  setItems: React.Dispatch<React.SetStateAction<number>>
  user?: string
}

export function RentalCard({ item, items, setItems }: RentalCardProps) {
  const [layoutHeaderHeight, setLayoutHeaderHeight] = useState(0)
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [message, setMessage] = useState<{
    success: boolean
    message: string
  } | null>(null)
  const { data: session } = useSession()
  let duration = 1

  useEffect(() => {
    const layoutHeader = document.getElementById("layout-header")
    if (layoutHeader) {
      const height = layoutHeader.clientHeight + 32
      setLayoutHeaderHeight(height)
    }
  }, [])

  if (startDate && endDate) {
    duration = getDaysDifference(startDate, endDate)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    if (!session?.user?.id) {
      setMessage({ success: false, message: "Please log in to rent items" })
      return
    }

    formData.set("user_id", session.user.id)
    formData.set("rent_amount", items.toString())
    formData.set("item_id", item.id)
    formData.set("startDate", startDate ? startDate.toISOString() : "")
    formData.set("endDate", endDate ? endDate.toISOString() : "")

    const result = (await handleCreateRental(formData)) as {
      success: boolean
      message: string
    }
    setMessage(result)

    if (result.success) {
      setStartDate(undefined)
      setEndDate(undefined)
    }
  }

  return (
    <Card className={cn(" sticky")} style={{ top: layoutHeaderHeight }}>
      <CardHeader>
        <CardTitle>Rent This Item</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="hidden" name="item_id" value={item.id} />

          <div className="space-y-2">
            <div>
              <label className="block mb-1 text-sm font-medium">Start Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn("w-full justify-start text-left font-normal", !startDate && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">End Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn("w-full justify-start text-left font-normal", !endDate && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                    disabled={(date) => date < (startDate || new Date())}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <Button
              onClick={() => setItems(Math.max(1, items - 1))}
              variant="ghost"
              className="text-xl"
              disabled={item.available ? false : true || items <= 1}
            >
              -
            </Button>
            <span className="px-4">{items}</span>
            <Button
              onClick={() => setItems(Math.min(item.item_amount, items + 1))}
              disabled={item.available ? false : true || items >= item.item_amount}
              variant="ghost"
              className="text-xl"
            >
              +
            </Button>
          </div>
          <div>
            <p className="text-sm text-gray-600">Available: {item.available ? "Yes" : "No"}</p>
            <p className="text-sm text-gray-600">Stock: {item.item_amount}</p>
          </div>
          <p className="mb-4 text-lg font-bold">
            Total:{" "}
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(items * item.rent_price * duration)}
          </p>
          <div className="space-y-2">
            <Button disabled={item.available ? false : true} className=" w-full bg-green-600">
              {item.available ? "Rent Now" : "This Item Is Not Available"}
            </Button>
          </div>
          {message && (
            <p className={`text-sm ${message.success ? "text-green-600" : "text-red-600"}`}>{message.message}</p>
          )}
        </form>
      </CardContent>
      <CardFooter className="justify-between">
        <Button variant="ghost" size="sm">
          <MessageSquare className="w-4 h-4 mr-2" /> Chat
        </Button>
        <Button variant="ghost" size="sm">
          <Heart className="w-4 h-4 mr-2" /> Wishlist
        </Button>
        <Button variant="ghost" size="sm">
          <Share className="w-4 h-4 mr-2" /> Share
        </Button>
      </CardFooter>
    </Card>
  )
}
