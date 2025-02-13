import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { FilterReviews } from "./filter-reviews";
import { Review, User } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";

type ReviewWithUser = Review & { user: User };

export function ReviewSection({ reviews }: { reviews: ReviewWithUser[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filteredRating, setFilteredRating] = useState<number | null>(null);

  const filteredReviews = filteredRating
    ? reviews.filter((review) => review.rating === filteredRating)
    : reviews;
  const handleFilterChange = (rating: number | null) => {
    setFilteredRating(rating);

    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (rating) {
      newSearchParams.set("rating", rating.toString());
    } else {
      newSearchParams.delete("rating");
    }

    router.push(`?${newSearchParams.toString()}`);
  };
  return (
    <div className="mt-8">
      <h2 className="mb-4 text-2xl font-semibold">Customer Reviews</h2>
      <FilterReviews onFilterChange={handleFilterChange} />
      <div className="mt-4 space-y-4">
        {filteredReviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage
                      src={`https://i.pravatar.cc/150?u=${review.user.name}`}
                    />
                    <AvatarFallback>
                      {review.user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{review.user.name}</p>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= review.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  {review.createdAt.toDateString()}
                </p>
              </div>
              <p className="mb-4 text-gray-600">{review.comment}</p>
              <div className="flex items-center justify-between"></div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Button className="mt-4" variant="outline">
        See All Reviews
      </Button>
    </div>
  );
}
