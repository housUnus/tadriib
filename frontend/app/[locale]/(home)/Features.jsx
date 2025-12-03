import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Award,
  MessageCircle,
  Download,
  PlayCircle,
  Shield,
  ArrowRight,
  CheckCircle,
  Sparkles,
  TrendingUp,
  Clock,
  Users,
} from "lucide-react";

const features = [
  {
    title: "Personalized Learning",
    description:"AI-powered quizzes adapt to your skill level and learning pace",
    icon: Sparkles,
  },
  {
    title: "Progress Tracking",
    description: "Visual dashboards show your improvement and achievements over time",
    icon: TrendingUp,
  },
  {
    title: "24/7 Access",
    description:"Learn at your own pace, anytime and anywhere you want",
    icon: Clock,
  },
  {
    title: "Expert Content",
    description:"Curated by industry professionals and education specialists",
    icon: Users,
  },
];

export default function HowItWorksPage() {
  return (
    <div className="">
      {/* Platform Benefits */}
      <section className="py-10 sm:py-14 px-4 bg-gradient-to-b from-green-200/10 via-green-700/10 to-green-200/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Why Choose Our
              <span className="bg-gold bg-clip-text text-transparent">
                {" "}
                Platform?
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the most comprehensive and interactive online learning
              environment
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="group bg-white/80 dark:bg-gray-800/80 border-0 shadow-md p-1 md:p-2 text-center"
                >
                  <CardContent className="pb-2 pt-4 px-0">
                    {/* Icon */}
                    <div className="relative mb-6 flex justify-center">
                      <div
                        className={`w-14 h-14 bg-gold rounded-xl flex items-center justify-center shadow-md`}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      {/* Lighter glow, no blur */}
                      <div
                        className={`absolute inset-0 rounded-xl opacity-10`}
                      />
                    </div>

                    <h4 className="text-base md:text-xl font-bold text-gray-700 mb-3 group-hover:text-green-600 transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed p-0">
                      {feature.description}
                    </p>
                   
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
