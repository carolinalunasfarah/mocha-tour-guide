import { StarIcon } from "lucide-react";
import { StarRatingProps } from "./types";

const StarRating = ({ rating }: StarRatingProps) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon
          key={star}
          className={`h-4 w-4 ${
            star <= rating ? "fill-accent text-accent" : "text-accent"
          }`}
        />
      ))}
      <p className="text-sm text-accent font-bold ml-1">{rating}</p>
    </div>
  );
};

export { StarRating };
