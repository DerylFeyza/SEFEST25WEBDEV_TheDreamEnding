import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { Item } from "@prisma/client";

export default function ItemLendersCard({ item }: { item: Item }) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-square relative">
        <Image
          src={item.image_url!}
          alt={item.name}
          width={300}
          height={300}
          className="max-h-96 h-96 object-contain"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="mb-1 text-lg font-semibold">{item.name}</h3>
        <p className="text-muted-foreground mb-2">{item.category}</p>
        <div className="flex items-center justify-between">
          <span className="text-primary font-bold">
            Rp. {item.rent_price.toFixed(2)}
          </span>
          <span className="text-muted-foreground text-sm">
            Total Items For Rent: {item.item_amount}
          </span>
        </div>
        <Button variant="outline" size="sm" className="w-full mt-4">
          <Edit className="w-4 h-4 mr-2" /> Edit
        </Button>
      </CardContent>
    </Card>
  );
}
