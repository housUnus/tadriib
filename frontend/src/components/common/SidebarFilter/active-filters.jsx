import { Badge } from "@/components/ui/badge";
import { countActiveFilters } from "./utils";

export default function ActiveFilters({ values, form }) {
  const active_filters = countActiveFilters(values);
  return (
    <>
      {/* Active Filters */}
      {active_filters > 0 && (
        <div className="flex flex-wrap gap-2 my-4">
          {/* Pricing Filter */}
          {values.price?.map((price, idx) => (
            <Badge key={idx} variant="secondary" className="px-2 py-1">
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
          {values.rating?.map((rating, idx) => (
            <Badge key={idx} variant="secondary" className="px-2 py-1">
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
          {values.level?.map((level, idx) => (
            <Badge key={idx} variant="secondary" className="px-2 py-1">
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
          {values.duration?.map((duration, idx) => (
            <Badge key={idx} variant="secondary" className="px-2 py-1">
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
