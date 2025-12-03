import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Users, Clock, ArrowRight, Star, Info, LucideFileQuestionMark } from "lucide-react";


function CourseCard({ item }) {
  const quiz = item;
  return (
    <div className="w-full">
      <Card
        className={`pt-0 pb-1 group transition-all duration-300 hover:-translate-y-1 border-0 bg-white/80 h-full ${
          quiz.featured ? "ring-1 ring-orange-300" : ""
        }`}
      >
        <CardContent className="p-0 h-full flex flex-col relative">
          {/* Featured Badge */}
          <div className="absolute top-2 sm:top-3 left-3 sm:left-4 z-10">
            <Badge className={`${quiz.categoryColor} text-white border-0 text-xs`}>
              {quiz.category}
            </Badge>
          </div>

          {/* Image */}
          <div className="relative h-40 sm:h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-xl overflow-hidden">
            <img
              src={quiz.image || "https://picsum.photos/200/300"}
              alt={quiz.title}
              className="w-full h-full object-cover transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          <div className="p-2 sm:p-4 flex-1 flex flex-col">
            {/* Category & Availability */}
            <div className="flex items-center justify-between mb-1 sm:mb-2">
              <Badge
                className={`border-1 border-gray-300 bg-white text-gray-500 text-xs`}
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
            <h3 className="font-bold text-sm sm:text-base text-green-800 mb-2 group-hover:text-green-900 transition-colors line-clamp-2 h-14">
              {quiz.title}
            </h3>
            <div className="flex items-center justify-between mb-3 sm:mb-4 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1">
                  <Clock className="w-2.5 sm:w-3 h-2.5 sm:h-3" />
                  {quiz.duration} minutes
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-muted-foreground">
                <span className="flex items-center gap-1">
                  <LucideFileQuestionMark className="w-2.5 sm:w-3 h-2.5 sm:h-3" />
                  {quiz.questions} questions
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between mb-3 sm:mb-4 text-xs text-gray-500">
              <div className="flex items-center gap-2 ">
                {quiz.total_taken} students
              </div>

              <div className="flex items-center gap-1.5 text-muted-foreground">
                <span className="text-xs">({quiz.reviews})</span>
                <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                <span className="text-amber-500">{quiz.rating}</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-auto">
              <Button
                className="w-full bg-primary text-white border-0 group/btn text-sm sm:text-base py-2 sm:py-3"
                disabled={quiz.availablePlaces === 0}
              >
                <span>Take Quiz</span>
                <ArrowRight className="w-3 sm:w-4 h-3 sm:h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default CourseCard;
