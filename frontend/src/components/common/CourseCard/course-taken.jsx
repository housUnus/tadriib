import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { Progress } from "@/components/ui/progress";

function CourseCard({ item }) {
  const t = useTranslations("home");
  const enrollment = item;
  return (
    <div className="w-full">
      <Card
        className={`p-0! group transition-all duration-300 hover:-translate-y-1 border-0 bg-white/80 h-full`}
      >
        <CardContent className="p-0 h-full flex flex-col relative">
          {/* Image */}
          <div className="relative h-36 sm:h-43 bg-linear-to-br from-gray-100 to-gray-200 rounded-t-xl overflow-hidden">
            <img
              src={enrollment?.course.poster || "https://picsum.photos/200/300"}
              alt={enrollment?.course.title}
              className="w-full h-full object-cover transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
          </div>

          <div className="p-2 sm:p-3 flex-1 flex flex-col">
            {/* Category & Availability */}

            {/* Title & Description */}
            <h3 className="text-base line-clamp-2 group-hover:text-primary h-14">
              {enrollment?.course.title}
            </h3>
            <span className="text-sm text-gray-500 mb-2 block">
              by {enrollment?.course.instructor_name}
            </span>

            {/* Progress */}
            <div className="my-2.5">
              <Progress value={enrollment?.course_progress?.progress_percent || 0} className="h-1" />
              <div className="flex items-center justify-between mt-1.5">
                <span className="text-xs text-muted-foreground">
                  {enrollment?.course_progress?.progress_percent || 0}% complete
                </span>
                {/* {course.progress === 100 && course.rating === 0 && (
                  <span className="text-xs text-primary font-medium">
                    Leave a rating
                  </span>
                )} */}
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-auto flex gap-4"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default CourseCard;
