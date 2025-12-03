import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Sparkles } from 'lucide-react';

export function ReviewCard({ item }) {
  const testimonial = item;
  return (
    <Card
      className={`bg-white border border-gray-200 py-4 shadow-sm hover:shadow-md transition-all duration-300 relative ${
        testimonial.featured ? "ring-2 ring-primary" : ""
      }`}
    >
      <CardContent className="p-4">
        {/* Featured Badge */}
        {testimonial.featured && (
          <div className="absolute -top-2 right-4 z-10">
            <Badge className="bg-primary text-white border-0 text-xs px-2 py-0.5">
              <Sparkles className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          </div>
        )}

        <div className="flex gap-4">
          {/* Author Info - Left Side */}
          <div className="flex flex-col items-center justify-center gap-2 min-w-[80px]">
            <Avatar className="w-16 h-16 border-2 border-gray-200">
              <AvatarImage
                src={testimonial.avatar || "/placeholder.svg"}
                alt={testimonial.name}
              />
              <AvatarFallback className="bg-gray-100 text-foreground">
                {testimonial.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            
            {/* Rating - using gold color */}
            <div className="flex items-center gap-0.5">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-600 text-amber-600" />
              ))}
            </div>
          </div>

          {/* Content - Right Side */}
          <div className="flex-1">
            {/* Author Name & Role */}
            <div className="mb-2">
              <h4 className="font-semibold text-sm text-foreground">{testimonial.name}</h4>
              <p className="text-xs text-muted-foreground line-clamp-1">
                {testimonial.role} • {testimonial.company}
              </p>
            </div>

            {/* Testimonial Text */}
            <p className="text-foreground/70 leading-relaxed text-sm line-clamp-3">
              "{testimonial.text}"
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ReviewCard;
