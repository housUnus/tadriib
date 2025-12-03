import { Zap } from "lucide-react";
import QuizzesCore from "./QuizzesCore";

export default function Quizzes() {
  return (
    <section className="py-5 sm:py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-green-600/10 to-white">
      <div className="">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-l from-green-100 to-blue-100 text-green-700  px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            <Zap className="w-3 sm:w-4 h-3 sm:h-4" />
            Live Learning Experience
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Featured Quizzes
            {/* <span class="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-300 bg-clip-text text-transparent">
              {" "}
              Webinars
            </span> */}
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
            Challenge yourself with expertly crafted assessments designed to
            validate and enhance your skills
          </p>
        </div>

        {/* Upcoming Webinars */}
        <QuizzesCore />
      </div>
    </section>
  );
}
