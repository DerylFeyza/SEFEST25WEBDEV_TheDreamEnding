import type React from "react";
import { MessageSquare, Heart, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Item, Review } from "@prisma/client";

interface RentalCardProps {
  item: Item & { reviews?: Review[] };
  items: number;
  setItems: React.Dispatch<React.SetStateAction<number>>;
}

export function RentalCard({ item, items, setItems }: RentalCardProps) {
  const [layoutHeaderHeight, setLayoutHeaderHeight] = useState(0);
  useEffect(() => {
    const layoutHeader = document.getElementById("layout-header");
    if (layoutHeader) {
      const height = layoutHeader.clientHeight;
      setLayoutHeaderHeight(height);
    }
  }, []);

  return (
    <Card className={cn(" sticky")} style={{ top: layoutHeaderHeight }}>
      <CardHeader>
        <CardTitle>Rent This Item</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <p className="font-semibold">{item.name}</p>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center border rounded-md">
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
              disabled={
                item.available ? false : true || items >= item.item_amount
              }
              variant="ghost"
              className="text-xl"
            >
              +
            </Button>
          </div>
          <div>
            <p className="text-sm text-gray-600">
              Available: {item.available ? "Yes" : "No"}
            </p>
            <p className="text-sm text-gray-600">Stock: {item.item_amount}</p>
          </div>
        </div>
        <p className="mb-4 text-lg font-bold">
          Total:{" "}
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(items * item.rent_price)}
        </p>
        <div className="space-y-2">
          <Button
            disabled={item.available ? false : true}
            className=" w-full bg-green-600"
          >
            {item.available ? "Rent Now" : "This Item Is Not Available"}
          </Button>
          <Button
            disabled={item.available ? false : true}
            className="w-full"
            variant="outline"
          >
            Add To Cart
          </Button>
        </div>
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
  );
}
