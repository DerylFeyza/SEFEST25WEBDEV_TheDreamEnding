"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search, Plus } from "lucide-react";
import ItemLendersCard from "./components/item-lenders-card";
import Link from "next/link";
import { Item } from "@prisma/client";

export default function ItemsPage({
	search,
	items,
}: {
	search?: string;
	items: Item[];
}) {
	const router = useRouter();
	const [searchTerm, setSearchTerm] = useState(search ?? "");
	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newSearchTerm = e.target.value;
		setSearchTerm(newSearchTerm);

		const params = new URLSearchParams();
		if (newSearchTerm) {
			params.set("search", newSearchTerm);
		} else {
			params.delete("search");
		}

		router.push(`?${params.toString()}`);
	};

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
							onChange={handleSearchChange}
							className="max-w-sm"
						/>
						<Button variant="outline" size="icon">
							<Search className="h-4 w-4" />
						</Button>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{items.map((product) => (
							<ItemLendersCard key={product.id} item={product} />
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
