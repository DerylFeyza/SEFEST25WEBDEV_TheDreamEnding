"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
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
  const { data: session } = useSession();
  const [items, setItems] = useState(1);

  return (
    <div className=" p-4 mx-auto">
      <div className="md:grid-cols-3 grid grid-cols-1 gap-8">
        <div className="md:col-span-2">
          <div className="md:grid-cols-2 grid gap-6">
            <div className="aspect-square relative flex justify-center">
              <Image
                src={rentItems.image_url!}
                alt={rentItems.name}
                priority
                width={800}
                height={400}
                className="object-cover w-auto max-h-full rounded-lg"
              />
            </div>
            <ItemDetails item={rentItems} />
          </div>
          <ReviewSection reviews={rentItems.reviews!} />
        </div>

        <div className="md:col-span-1">
          <RentalCard 
            item={rentItems} 
            items={items} 
            setItems={setItems}
            // user={session?.user?.id}
          />        
        </div>
      </div>
    </div>
  );
}
