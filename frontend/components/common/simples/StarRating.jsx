import { Star, StarHalf } from "lucide-react";
export function StarRating({ rating }) {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => {
          if (i < Math.floor(rating)) {
            return <Star key={i} className="w-4 h-4 fill-green-500 text-green-500" />;
          } else if (i === Math.floor(rating) && rating % 1 >= 0.5) {
            return <StarHalf key={i} className="w-4 h-4 fill-green-500 text-green-500" />;
          } else {
            return <Star key={i} className="w-4 h-4 fill-muted text-muted" />;
          }
        })}
      </div>
    );
  }