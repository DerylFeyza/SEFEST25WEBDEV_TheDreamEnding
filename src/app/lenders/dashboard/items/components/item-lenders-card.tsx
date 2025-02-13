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
					src={item.image_url}
					alt={item.name}
					layout="fill"
					objectFit="cover"
				/>
			</div>
			<CardContent className="p-4">
				<h3 className="font-semibold text-lg mb-1">{item.name}</h3>
				<p className="text-muted-foreground mb-2">{item.category}</p>
				<div className="flex justify-between items-center">
					<span className="font-bold text-primary">
						Rp. {item.rent_price.toFixed(2)}
					</span>
					<span className="text-sm text-muted-foreground">
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
