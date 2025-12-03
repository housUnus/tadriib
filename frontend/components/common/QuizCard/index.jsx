import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  Users,
  Clock,
  ArrowRight,
  Star,
} from "lucide-react";


function getAvailabilityStatus(available, total) {
  const percentage = (available / total) * 100
  if (percentage <= 10) return { status: "Almost Full", color: "text-red-500", bgColor: "bg-red-50" }
  if (percentage <= 30) return { status: "Filling Fast", color: "text-orange-500", bgColor: "bg-orange-50" }
  return { status: "Available", color: "text-green-500", bgColor: "bg-green-50" }
}

function formatDate(dateString) {
  const date = new Date(dateString)
  return {
    day: date.getDate(),
    month: date.toLocaleDateString("en-US", { month: "short" }),
    weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
  }
}

function CourseCard({ item }) {
  const webinar = item
  const dateInfo = formatDate(webinar.date)
  const availability = getAvailabilityStatus(webinar.availablePlaces, webinar.totalPlaces)
  return (
    <div className="w-full">
      <Card
        className={`pt-0 pb-1 group transition-all duration-300 hover:-translate-y-1 border-0 bg-white/80 h-full ${
          webinar.featured ? "ring-1 ring-orange-300" : ""
        }`}
      >
        <CardContent className="p-0 h-full flex flex-col relative">
          {/* Featured Badge */}  
          {webinar.featured && (
            <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10">
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 text-xs">
                <Star className="w-2.5 sm:w-3 h-2.5 sm:h-3 mr-1" />
                Featured
              </Badge>
            </div>
          )}

          {/* Image */}
          <div className="relative h-40 sm:h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-xl overflow-hidden">
            <img
              src={webinar.image || "https://picsum.photos/200/300"}
              alt={webinar.title}
              className="w-full h-full object-cover transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          <div className="p-2 sm:p-4 flex-1 flex flex-col">
            {/* Category & Availability */}
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <Badge
                className={`${webinar.categoryColor} text-white border-0 text-xs`}
              >
                {webinar.category}
              </Badge>
              <div
                className={`px-2 py-1 rounded-full text-xs font-medium ${availability.bgColor} ${availability.color}`}
              >
                {availability.status}
              </div>
            </div>

            {/* Title & Description */}
            <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 h-14">
              {webinar.title}
            </h3>
            <p className="text-gray-700 font-medium text-xs sm:text-sm mb-3 sm:mb-4">
              by {webinar.instructor}
            </p>

            {/* Date & Time */}
            <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-3">
              <div className="flex items-center gap-2 text-gray-600">
                <div className="bg-blue-50 p-1.5 sm:p-2 rounded-lg">
                  <Calendar className="w-3 sm:w-4 h-3 sm:h-4 text-blue-600" />
                </div>
                <div className="text-xs sm:text-sm">
                  <div className="font-semibold text-gray-900">
                    {dateInfo.weekday}, {dateInfo.month} {dateInfo.day}
                  </div>
                  <div className="text-gray-500 flex items-center gap-1">
                    <Clock className="w-2.5 sm:w-3 h-2.5 sm:h-3" />
                    {webinar.time}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="flex items-center gap-2 text-gray-600">
                <div className="bg-green-50 p-1 sm:p-1.5 rounded-lg">
                  <Users className="w-3 sm:w-4 h-3 sm:h-4 text-green-600" />
                </div>
                <span className="text-xs sm:text-sm">
                  <span className="font-semibold text-gray-900">
                    {webinar.availablePlaces}
                  </span>
                  <span className="text-gray-500">
                    /{webinar.totalPlaces} spots
                  </span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="bg-purple-50 p-1 sm:p-1.5 rounded-lg"></div>
                <span className="text-base sm:text-lg font-bold text-gray-900">
                  ${webinar.price}
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-auto">
              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 group/btn text-sm sm:text-base py-2 sm:py-3"
                disabled={webinar.availablePlaces === 0}
              >
                {webinar.availablePlaces === 0 ? (
                  "Sold Out"
                ) : (
                  <>
                    Reserve Your Spot
                    <ArrowRight className="w-3 sm:w-4 h-3 sm:h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default CourseCard;
