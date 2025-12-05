import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Users, Clock, ArrowRight, Star, Info, LucideFileQuestionMark } from "lucide-react";


function CourseCard({ item }) {
  const course = item;
  return (
    <div className="w-full">
      <Card
        className={`p-0! group transition-all duration-300 hover:-translate-y-1 border-0 bg-white/80 h-full ${
          course.featured ? "ring-1 ring-orange-300 rounded-xl!" : ""
        }`}
      >
        <CardContent className="p-0 h-full flex flex-col relative">
          {/* Featured Badge */}
          <div className="absolute top-2 sm:top-3 left-3 sm:left-4 z-10">
            <Badge className={`bg-success text-white border-0 text-xs`}>
              FREE
            </Badge>
          </div>

          {/* Image */}
          <div className="relative h-40 sm:h-48 bg-linear-to-br from-gray-100 to-gray-200 rounded-t-xl overflow-hidden">
            <img
              src={course.image || "https://picsum.photos/200/300"}
              alt={course.title}
              className="w-full h-full object-cover transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
          </div>

          <div className="p-2 sm:p-4 flex-1 flex flex-col">
            {/* Category & Availability */}
            <div className="flex items-center justify-between mb-1 sm:mb-2">
              <Badge
                className={`border border-gray-300 bg-white text-gray-500 text-xs`}
              >
                Most Taken
              </Badge>
              {/* <div
                className={`px-2 py-1 rounded-full text-xs font-medium ${availability.bgColor} ${availability.color}`}
              >
                {availability.status}
              </div> */}
            </div>

            {/* Title & Description */}
            <h3 className="text-base line-clamp-2 group-hover:text-primary h-14">
              {course.title}
            </h3>
            <h3 className="font-bold mb-2">
              {course.price} SAR 
              <span className="line-through font-normal text-gray-500 text-xs mx-1"> {course.originalPrice} SAR</span>
            </h3>
            <div className="flex items-center justify-between mb-3 sm:mb-4 text-sm text-gray-500">
              <div className="flex items-center gap-2 ">
                {course.total_taken} students
              </div>

              <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                <span className="">({course.reviews})</span>
                <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                <span className="text-amber-500">{course.rating}</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-auto flex gap-4">
              <Button
                className="w-full bg-secondary text-white border-0 group/btn text-sm sm:text-base py-2 sm:py-3"
                disabled={course.availablePlaces === 0}
              >
                <span>Details</span>
              </Button>
              <Button
                className="w-full bg-primary text-white border-0 group/btn text-sm sm:text-base py-2 sm:py-3"
                disabled={course.availablePlaces === 0}
              >
                <span>Buy Now</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default CourseCard;
