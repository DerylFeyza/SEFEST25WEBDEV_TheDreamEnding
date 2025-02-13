import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface FilterReviewsProps {
  onFilterChange: (rating: number | null) => void;
}

export function FilterReviews({ onFilterChange }: FilterReviewsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-medium text-gray-700">Filter reviews:</span>
      {[5, 4, 3, 2, 1].map((rating) => (
        <Button
          key={rating}
          variant="outline"
          size="sm"
          className="flex items-center"
          onClick={() => onFilterChange(rating)}
        >
          {rating}{" "}
          <Star className="w-4 h-4 ml-1 text-yellow-400 fill-current" />
        </Button>
      ))}
      <Button variant="ghost" size="sm" onClick={() => onFilterChange(null)}>
        Clear filter
      </Button>
    </div>
  );
}
