"use client"

import { useState } from "react"
import { ItemCard } from "@/components/ItemCard"
import { Item } from "@/types/item"

interface RentalsPageProps {
  initialItems: Item[]
}

export default function RentalsPage({ initialItems }: RentalsPageProps) {
  const [items] = useState<Item[]>(initialItems)

  return (
    <div className=" from-green-50 to-green-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-green-800 text-center">Eco-Friendly Rentals</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <ItemCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  )
}

