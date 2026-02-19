import { Badge } from "@/components/ui/badge";

export default function ActiveFilters({ values, form }) {
  return (
    <>
      {/* Active Filters */}
      {Object.keys(values).length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {/* Pricing Filter */}
          {values.price?.map((price) => (
            <Badge key={price} variant="secondary" className="px-2 py-1">
              {price}
              <button
                type="button"
                className="relative z-50 cursor-pointer ms-2"
                onClick={() => {
                  const newPrice = values.price.filter((p) => p !== price);
                  form.setValue("price", newPrice);
                }}
              >
                ✕
              </button>
            </Badge>
          ))}
          {values.rating?.map((rating) => (
            <Badge key={rating} variant="secondary" className="px-2 py-1">
              {rating}+ stars
              <button
                type="button"
                className="relative z-50 cursor-pointer ms-2"
                onClick={() => {
                  const newRatings = values.rating.filter((r) => r !== rating);
                  form.setValue("rating", newRatings);
                }}
              >
                ✕
              </button>
            </Badge>
          ))}
          {values.level?.map((level) => (
            <Badge key={level} variant="secondary" className="px-2 py-1">
              {level}
              <button
                type="button"
                className="relative z-50 cursor-pointer ms-2"
                onClick={() => {
                  const newLevels = values.level.filter((l) => l !== level);
                  form.setValue("level", newLevels);
                }}
              >
                ✕
              </button>
            </Badge>
          ))}
          {values.duration?.map((duration) => (
            <Badge key={duration} variant="secondary" className="px-2 py-1">
              {duration === "short"
                ? "0-2 hours"
                : duration === "medium"
                  ? "2-3 hours"
                  : "3+ hours"}

              <button
                type="button"
                className="relative z-50 cursor-pointer ms-2"
                onClick={() => {
                  const newDuration = values.duration.filter(
                    (d) => d !== duration,
                  );
                  form.setValue("duration", newDuration);
                }}
              >
                ✕
              </button>
            </Badge>
          ))}
        </div>
      )}
    </>
  );
}
