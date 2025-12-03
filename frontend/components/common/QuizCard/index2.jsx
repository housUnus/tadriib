import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { StarRating } from "@/components/common/simples/StarRating";
import { GraduationCap  } from "lucide-react"; // Import Users icon
import Link from "next/link";

export default function CourseCard({ course = {} }) {
  const {
    image,
    title,
    instructor,
    rating,
    reviewCount,
    originalPrice,
    discountedPrice,
    percentOff,
    courseUrl,
    attendees=20, // New field for attendees count
  } = course;

  return (
    <Link href={courseUrl} className="block">
      <Card className="max-w-xs overflow-hidden transition-all duration-300 shadow-purple-200 hover:shadow-lg cursor-pointer">        
        {/* Course Image */}
        <div className="relative h-44 w-full">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="object-cover h-full w-full"
          />
          
          {/* Floating Discount Badge */}
          {percentOff > 0 && (
            <Badge className="absolute rounded-none top-0 left-0 bg-red-600 text-white text-xs font-bold px-4 py-1 shadow">
              -{percentOff}%
            </Badge>
          )}
        </div>

        {/* Course Details */}
        <CardContent className="py-2 px-3">
          <h3 className="line-clamp-2 font-bold text-lg">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{instructor}</p>
          
          {/* Rating & Attendees */}
          <div className="flex items-center justify-between mt-2 text-sm">
            <div className="flex items-center">
              <span className="text-green-500 font-bold mr-1">{rating}</span>
              <StarRating rating={rating} />
              <span className="text-xs text-green-900 ml-1">
                ({reviewCount.toLocaleString()})
              </span>
            </div>
            {/* Attendees Section */}
            {/* <div className="flex items-center text-xs text-muted-foreground">
              <GraduationCap className="w-4 h-4 mr-1 text-gray-500" />
              <span>{attendees.toLocaleString()} enrolled</span>
            </div> */}
          </div>
        </CardContent>

        {/* Pricing */}
        <CardFooter className="flex items-center p-4 pt-0">
          <div className="flex items-center">
            <span className="font-bold text-lg">${discountedPrice.toFixed(2)}</span>
            <span className="text-sm text-muted-foreground line-through ml-2">
              ${originalPrice.toFixed(2)}
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
