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

interface RentalCardProps {
  item: {
    name: string;
    price: number;
    stock: number;
  };
  items: number;
  setItems: React.Dispatch<React.SetStateAction<number>>;
}

export function RentalCard({ item, items, setItems }: RentalCardProps) {
  const layoutHeader = document.getElementById("layout-header");
  const [layoutHeaderHeight, setLayoutHeaderHeight] = useState(0);
  useEffect(() => {
    if (layoutHeader) {
      setLayoutHeaderHeight(layoutHeader.offsetHeight);
    }
  }, []);

  return (
    <Card className={cn("sticky", `top-${layoutHeaderHeight}`)}>
      <CardHeader>
        <CardTitle>Rent This Item</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <p className="font-semibold">{item.name}</p>
          <p className="text-sm text-gray-600">Stock: {item.stock}</p>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center border rounded-md">
            <Button
              onClick={() => setItems(Math.max(1, items - 1))}
              variant="ghost"
              className="text-xl"
            >
              -
            </Button>
            <span className="px-4">{items}</span>
            <Button
              onClick={() => setItems(Math.min(item.stock, items + 1))}
              variant="ghost"
              className="text-xl"
            >
              +
            </Button>
          </div>
        </div>
        <p className="mb-4 text-lg font-bold">
          Total:{" "}
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(items * item.price)}
        </p>
        <div className="space-y-2">
          <Button className=" w-full bg-green-600">Rent Now</Button>
          <Button className="w-full" variant="outline">
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
