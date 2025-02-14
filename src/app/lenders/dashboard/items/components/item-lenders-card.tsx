import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Edit } from "lucide-react";
import { Item } from "@prisma/client";
import { formatToIDR } from "@/helper/formatToIDR";

export default function ItemLendersCard({ item }: { item: Item }) {
	return (
		<Card className="flex flex-col overflow-hidden">
			<div className="aspect-square relative flex justify-center">
				<Image
					src={item.image_url}
					alt={item.name}
          width={320}
          height={320}
          className="size-80 object-contain"
				/>
			</div>
			<CardContent className="grid grid-cols-2 p-4 flex-grow grid-rows-[auto_1fr_auto]">
				<h3 className="mb-1 text-lg font-semibold">{item.name}</h3>

				<p className="text-muted-foreground mb-2">{item.category}</p>

				<span className="text-primary self-center font-bold">
					{formatToIDR(item.rent_price)}
				</span>
				<span className="text-muted-foreground self-center text-sm">
					Total Items For Rent: {item.item_amount}
				</span>

				<Link
					href={`/lenders/dashboard/items/edit/${item.id}`}
					className="hover:bg-gray-100 flex items-center justify-center w-full col-span-2 px-4 py-2 mt-4 text-sm font-medium border rounded-md"
				>
					<Edit className="w-4 h-4 mr-2" /> Edit
				</Link>
			</CardContent>
		</Card>
	);
}
