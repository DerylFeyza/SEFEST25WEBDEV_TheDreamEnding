"use client";

import { useState } from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ItemDetails } from "./item-details";
import { RentalCard } from "./rental-card";
import { ReviewSection } from "./review-section";
import { Item as rentItem, Review, User } from "@prisma/client";
type ReviewWithUser = Review & { user: User };

export default function RentPage({
  rentItems,
}: {
  rentItems: {
    reviews: ReviewWithUser[];
  } & rentItem;
}) {
  const [items, setItems] = useState(1);

  return (
    <div className="container p-4 mx-auto">
      <div className="md:grid-cols-3 grid grid-cols-1 gap-8">
        <div className="md:col-span-2">
          <div className="md:grid-cols-2 grid gap-6">
            <div className="aspect-square relative">
              <Image
                src={rentItems.image_url!}
                alt={rentItems.name}
                priority
                width={800}
                height={800}
                className="object-cover rounded-lg"
              />
            </div>
            <ItemDetails item={rentItems} />
          </div>

          <Tabs defaultValue="description" className="mt-8">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="rental-policy">Rental Policy</TabsTrigger>
            </TabsList>
            <TabsContent value="description">
              <p className="text-gray-600">{rentItems.description}</p>
            </TabsContent>
            <TabsContent value="specifications">
              <ul className="text-gray-600 list-disc list-inside">
                <li>Frame: Aluminum alloy</li>
                <li>Gears: 21-speed Shimano</li>
                <li>Brakes: Hydraulic disc brakes</li>
                <li>Tires: 29-inch all-terrain</li>
              </ul>
            </TabsContent>
            <TabsContent value="rental-policy">
              <p className="text-gray-600">
                Our rental policy ensures a smooth and enjoyable experience.
                Please return the item in the same condition as received. Late
                returns may incur additional charges.
              </p>
            </TabsContent>
          </Tabs>

          <ReviewSection reviews={rentItems.reviews!} />
        </div>

        <div className="md:col-span-1">
          <RentalCard item={rentItems} items={items} setItems={setItems} />
        </div>
      </div>
    </div>
  );
}
