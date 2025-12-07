import { Zap } from "lucide-react";
import CoursesCore from "./CoursesCore";

export default function Courses() {
  return (
    <section className="bg-lightgray dark:bg-darkgray lg:py-20 py-10 px-4 sm:px-6 lg:px-8">
      <div className="">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-darklink dark:text-white mb-3 sm:mb-4">
            Featured Courses
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4 sm:px-0">
            Challenge yourself with expertly crafted assessments designed to
            validate and enhance your skills
          </p>
        </div>

        {/* Upcoming Webinars */}
        <CoursesCore />
      </div>
    </section>
  );
}
