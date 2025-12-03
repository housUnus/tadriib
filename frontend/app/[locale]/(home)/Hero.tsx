'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden min-h-[100vh] flex items-center">
      <div className="relative max-w-7xl mx-auto w-full pt-22 pb-8 px-4 sm:px-6">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-[-1]">
          <img
            src="/images/man-learning.jpg"
            alt="Professional Saudi man using learning platform"
            className="h-full w-full object-cover"
          />
          {/* Soft green overlay */}
          <div className="absolute inset-0 bg-green-900/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/60 via-green-900/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />
        </div>

        <div className='text-center w-full z-20 '>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-medium text-white">
            <Sparkles className="h-4 w-4" />
            <span>Professional Learning Platform</span>
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl text-balance drop-shadow-lg">
            Transform Your Career with
            <br />
            <span className="text-accent">World-Class Learning</span>
          </h1>

          <p className="mb-4 text-lg text-white/95 leading-relaxed drop-shadow-md max-w-2xl mx-auto">
            Unlock your full potential with our comprehensive platform designed for ambitious professionals.
            Master in-demand skills through expertly crafted courses
          </p>

           <div className="people-enrolled hidden md:flex items-center justify-center gap-4 text-white mb-3">
            <div className="img w-22">
              <img
                src="/images/enrolled-people-colored-white.png"
                alt="Enrolled People"
              />
            </div>
            <div className="desc">
              <p className="font-semibold">50K+ Students</p>
              <p className="">Already Enrolled</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row justify-center">
            <Button size="lg" className="bg-white text-green-800 hover:bg-white/90 gap-2 shadow-xl">
              Start Learning Today
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-white/40 bg-accent backdrop-blur-sm text-green-900 hover:bg-white/20">
              Explore Quizzes
            </Button>
          </div>
        </div>

        {/* Decorative gradient overlays */}
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-mint-light/20 blur-3xl -z-10" />
      </div>
    </section>
  )
}
