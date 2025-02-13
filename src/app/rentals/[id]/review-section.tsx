import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown, Star } from "lucide-react";
import { FilterReviews } from "./filter-reviews";

// Mock review data
const mockReviews = [
  {
    id: 1,
    author: "John Doe",
    rating: 5,
    date: "2 days ago",
    content:
      "Great mountain bike! It handled the trails perfectly and was very comfortable for long rides. Highly recommend renting this if you're planning a biking trip.",
    helpful: 12,
    notHelpful: 2,
    replies: 3,
  },
  {
    id: 2,
    author: "Jane Smith",
    rating: 4,
    date: "1 week ago",
    content:
      "Very good bike, but the seat was a bit uncomfortable for long rides. Otherwise, it performed well on various terrains.",
    helpful: 8,
    notHelpful: 1,
    replies: 1,
  },
  {
    id: 3,
    author: "Mike Johnson",
    rating: 3,
    date: "2 weeks ago",
    content:
      "Decent bike, but I've used better. The gears were a bit sticky, which made some climbs challenging.",
    helpful: 5,
    notHelpful: 3,
    replies: 2,
  },
  {
    id: 4,
    author: "Sarah Lee",
    rating: 5,
    date: "3 weeks ago",
    content:
      "Absolutely loved this bike! It made my mountain biking experience so much better. Will definitely rent again.",
    helpful: 15,
    notHelpful: 0,
    replies: 4,
  },
  {
    id: 5,
    author: "Chris Taylor",
    rating: 2,
    date: "1 month ago",
    content:
      "Disappointing experience. The bike had some mechanical issues that ruined my trip. Hope they improve their maintenance.",
    helpful: 7,
    notHelpful: 2,
    replies: 5,
  },
];

export function ReviewSection() {
  const [filteredRating, setFilteredRating] = useState<number | null>(null);

  const filteredReviews = filteredRating
    ? mockReviews.filter((review) => review.rating === filteredRating)
    : mockReviews;

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-2xl font-semibold">Customer Reviews</h2>
      <FilterReviews onFilterChange={setFilteredRating} />
      <div className="mt-4 space-y-4">
        {filteredReviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage
                      src={`https://i.pravatar.cc/150?u=${review.author}`}
                    />
                    <AvatarFallback>
                      {review.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{review.author}</p>
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
                <p className="text-sm text-gray-500">{review.date}</p>
              </div>
              <p className="mb-4 text-gray-600">{review.content}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="sm">
                    <ThumbsUp className="w-4 h-4 mr-2" /> Helpful (
                    {review.helpful})
                  </Button>
                  <Button variant="ghost" size="sm">
                    <ThumbsDown className="w-4 h-4 mr-2" /> Not Helpful (
                    {review.notHelpful})
                  </Button>
                </div>
                <Button variant="link">See Replies ({review.replies})</Button>
              </div>
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
