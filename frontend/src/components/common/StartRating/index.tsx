import { Star } from "lucide-react";

type StarRatingProps = {
  rating: number;        // e.g. 4.3
  max?: number;          // default 5
  size?: number;         // icon size
  className?: string;
};

export function StarRating({
  rating,
  max = 5,
  size = 16,
  className = "",
}: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = max - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      {/* Full stars */}
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star
          key={`full-${i}`}
          size={size}
          className="fill-[#b4690e] text-[#b4690e]"
        />
      ))}

      {/* Half star */}
      {hasHalfStar && (
        <div className="relative">
          <Star size={size} className="text-[#b4690e]" />
          <Star
            size={size}
            className="absolute inset-0 fill-[#b4690e] text-[#b4690e]"
            style={{ clipPath: "inset(0 50% 0 0)" }}
          />
        </div>
      )}

      {/* Empty stars */}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star
          key={`empty-${i}`}
          size={size}
          className="text-neutral-300 fill-muted"
        />
      ))}
    </div>
  );
}
