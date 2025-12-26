"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Heart, PenTool, LayoutGrid, Award, Star, Lightbulb } from "lucide-react"
import { useTranslations } from "next-intl"

const stats = [
  { value: "11", labelKey: "states.certifications" },
  { value: "128", labelKey: "states.courses" },
  { value: "18016", labelKey: "states.students" },
  { value: "1123", labelKey: "states.successStories" },
]

export function StatsSection() {
  const t = useTranslations("home")
  return (
    <section className="w-full py-16 md:py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          {/* Left Content */}
          <div className="flex-7 space-y-10">
            {/* Headline */}
            <motion.h2
              initial={{ opacity: 1, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl lg:text-[42px] text-primary max-w-lg"
            >
              {t('buildProfessionalCareer')}
            </motion.h2>

            <motion.div
              initial={{ opacity: 1, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10"
            >
              {stats.map((stat) => (
                <div key={stat.labelKey} className="text-left">
                  <p className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">{stat.value}</p>
                  <p className="text-xs md:text-sm text-muted-foreground font-medium tracking-wide mt-1 uppercase">
                    {t(stat.labelKey)}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 1, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-4"
            >
              <Button size="lg">
                {t('browseAllCertificates')}
              </Button>
              <Button
                variant="outline"
                size="lg"
              >
                {t('browseAllCourses')}
                <ArrowRight className="ml-2 h-4 w-4 rtl:rotate-180" />
              </Button>
            </motion.div>
          </div>

          {/* Right Illustration */}
          <motion.div
            initial={{ opacity: 1, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex-5 flex items-center justify-center relative"
          >
            {/* Dashed circle */}
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#4F6BF2]/30" />

              {/* Gray circle background */}
              <div className="absolute inset-6 md:inset-10 rounded-full bg-linear-to-br from-slate-100 to-slate-200" />

              {/* Woman illustration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src="/images/front-pages/background/girl-with-laptop.svg"
                  alt="Woman focused on learning"
                  className="w-52 h-52 md:w-72 md:h-72 object-contain"
                />
              </div>

              {/* Floating icons */}

              {/* Top */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white rounded-full p-2.5 shadow-lg border border-pink-100"
              >
                <Heart className="w-5 h-5 md:w-6 md:h-6 text-pink-500 fill-pink-500" />
              </motion.div>

              {/* Top-right */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-6 -right-2 md:right-2 bg-white rounded-full p-2.5 shadow-lg border border-pink-100"
              >
                <PenTool className="w-4 h-4 md:w-5 md:h-5 text-pink-400" />
              </motion.div>

              {/* Right */}
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 2.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
                className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-2 bg-yellow-400 rounded-full p-2.5 shadow-lg"
              >
                <Star className="w-4 h-4 md:w-5 md:h-5 text-white fill-white" />
              </motion.div>

              {/* Bottom-right */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.3 }}
                className="absolute bottom-6 -right-2 md:right-2 bg-white rounded-full p-2.5 shadow-lg border border-purple-100"
              >
                <LayoutGrid className="w-4 h-4 md:w-5 md:h-5 text-purple-500" />
              </motion.div>

              {/* Bottom */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1.2 }}
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md"
              >
                <div className="w-8 h-2 bg-slate-300 rounded" />
              </motion.div>

              {/* Bottom-left */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2.9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.6 }}
                className="absolute bottom-6 -left-2 md:left-2 bg-pink-100 rounded-xl p-2 shadow-md"
              >
                <Award className="w-4 h-4 md:w-5 md:h-5 text-pink-500" />
              </motion.div>

              {/* Left */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2.7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.8 }}
                className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-2 bg-white rounded-full p-2.5 shadow-lg border border-blue-100"
              >
                <Lightbulb className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
              </motion.div>

              {/* Top-left */}
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 3.1, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1.5 }}
                className="absolute top-6 -left-2 md:left-2 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1.5 shadow-md"
              >
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-[#4F6BF2] rounded-full" />
                  <div className="w-2 h-2 bg-pink-400 rounded-full" />
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
