"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const benefits = [
  "Access 900+ expert-led courses",
  "Earn industry-recognized certifications",
  "Learn at your own pace, anytime, anywhere",
  "Join a community of 2M+ learners",
];

export default function CTA() {
  return (
    <section className="py-20 bg-green-800/80 text-white relative overflow-hidden">
      {/* Pattern overlay ABOVE background */}

      <div className="absolute inset-0 z-0 opacity-20 bg-[url('/images/saudi-background.png')] bg-cover bg-center" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Start Your Learning Journey Today
          </h2>

          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of students and professionals achieving their
            educational goals with our comprehensive quiz platform
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gold text-white hover:bg-gold/90 text-lg px-8 py-2 h-auto gap-2"
            >
              Create Free Account
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-primary text-lg hover:bg-white hover:text-primary px-8 py-2 h-auto transition-all duration-300"
            >
              Browse Quizzes
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
