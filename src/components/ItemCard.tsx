import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Leaf } from "lucide-react"
import { formatToIDR } from "@/helper/formatToIDR" // Add this import (adjust the path as needed)

interface ItemProps {
    id: string
    name: string
    category: string
    image_url: string
    rent_price: number
}

export function ItemCard({ id, name, category, image_url, rent_price }: ItemProps) {
    return (
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105">
            <CardHeader className="p-0">
                <div className="relative h-48 w-full">
                    <Image
                        src={image_url || "/placeholder.svg"}
                        alt={name}
                        layout="fill"
                        objectFit="cover"
                        className="transition-all duration-300 hover:opacity-90"
                    />
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {formatToIDR(rent_price)}/day
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-4">
                <CardTitle className="text-lg font-semibold text-gray-800 mb-2">{name}</CardTitle>
                <p className="text-sm text-gray-600 mb-2">{category}</p>
                <div className="flex items-center text-green-600">
                    <Leaf className="w-4 h-4 mr-1" />
                    <span className="text-xs">Eco-friendly rental</span>
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <Link href={`/rentals/${id}`} className="w-full">
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white">View Details</Button>
                </Link>
            </CardFooter>
        </Card>
    )
}