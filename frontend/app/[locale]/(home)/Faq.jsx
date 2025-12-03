"use client"
import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { HelpCircle, Star, ChevronRight } from 'lucide-react'

const faqs = [
  {
    question: "How do I start taking quizzes?",
    answer:
      "Create a free account, browse our quiz categories, and click on any quiz to start. Most quizzes are free, and you can track your progress through your personal dashboard. Simply select your answers and submit when complete.",
    category: "General",
    popular: true,
  },
  {
    question: "Are the quizzes available in Arabic and English?",
    answer:
      "Yes! All our quizzes are available in both Arabic and English. You can switch languages anytime from your account settings or directly on the quiz page.",
    category: "General",
    popular: true,
  },
  {
    question: "Do I get a certificate after completing a quiz?",
    answer:
      "Yes! You'll receive a digital certificate for each quiz you pass. Certificates include your name, quiz title, score, and completion date. You can download them as PDF or share them on LinkedIn.",
    category: "Certificates",
    popular: true,
  },
  {
    question: "Can I retake a quiz if I don't pass?",
    answer:
      "You can retake any quiz as many times as you need. We recommend reviewing the feedback from your previous attempts to improve your score.",
    category: "Quizzes",
    popular: true,
  },
  {
    question: "How is my score calculated?",
    answer:
      "Your score is based on the number of correct answers divided by total questions. Some quizzes may have time bonuses. You'll see detailed feedback showing which questions you answered correctly and incorrectly.",
    category: "Quizzes",
    popular: true,
  },
  {
    question: "Is there a time limit for quizzes?",
    answer:
      "Most quizzes have a time limit displayed before you start. The duration varies by difficulty level and topic. Don't worry - you'll see a timer during the quiz so you can manage your time effectively.",
    category: "Quizzes",
    popular: true,
  },
  {
    question: "Can I pause a quiz and continue later?",
    answer:
      "It depends on the quiz type. Some practice quizzes allow pausing, while certification quizzes must be completed in one session. Check the quiz details before starting.",
    category: "Technical",
  },
  {
    question: "How do I track my progress?",
    answer:
      "Your dashboard shows all completed quizzes, scores, certificates earned, and time spent learning. You can also see your progress by category and compare your performance over time.",
    category: "Account",
  },
  {
    question: "Are there different difficulty levels?",
    answer:
      "Yes! Each quiz is marked as Beginner, Intermediate, or Advanced. We recommend starting with beginner-level quizzes and progressing as you build confidence and knowledge.",
    category: "Quizzes",
  },
  {
    question: "Can I create my own quizzes?",
    answer:
      "We're currently developing this feature for educators and organizations. If you're interested in creating custom quizzes for your team or students, contact our support team to join the early access program.",
    category: "General",
  },
  {
    question: "What happens if I experience technical issues during a quiz?",
    answer:
      "If you encounter any technical problems, your progress is automatically saved. Contact our support team immediately, and we'll help you resume from where you left off without losing your answers.",
    category: "Technical",
  },
  {
    question: "How often are new quizzes added?",
    answer:
      "We add new quizzes weekly across various categories. Follow us on social media or enable notifications in your account settings to get alerts about new content.",
    category: "General",
  },
]

const categories = ["All", "General", "Quizzes", "Certificates", "Technical", "Account"]

export default function FAQSection() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const popularFaqs = faqs.filter((faq) => faq.popular)
  const filteredFaqs = selectedCategory === "All" ? popularFaqs : faqs.filter((faq) => faq.category === selectedCategory)

  return (
    <section className="py-5 md:py-8 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm font-medium mb-4 md:mb-6">
            <HelpCircle className="w-4 h-4" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Got Questions? We've Got Answers
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
            Find quick answers to common questions about our quiz platform and features
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12 px-4">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`rounded-lg text-xs md:text-sm transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-[oklch(0.45_0.20_152)] text-white hover:bg-[oklch(0.40_0.20_152)] shadow-md"
                  : "hover:bg-gray-100 hover:text-gray-900 border-gray-300"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <Card className="border border-gray-200 shadow-sm bg-white overflow-hidden py-0">
          <Accordion type="single" collapsible className="w-full">
            {filteredFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200 last:border-0">
                <AccordionTrigger className="hover:no-underline py-3 md:py-4 px-3 md:px-8 text-left group hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-3 md:gap-4 w-full pr-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-sm md:text-base lg:text-lg font-semibold text-gray-900 group-hover:text-[oklch(0.45_0.20_152)] transition-colors">
                          {faq.question}
                        </span>
                        {faq.popular && (
                          <Badge className="bg-[oklch(0.83_0.17_83)] text-gray-900 text-xs hover:bg-[oklch(0.83_0.17_83)] flex-shrink-0 border-0">
                            <Star className="w-3 h-3 mr-1 fill-[oklch(0.83_0.17_83)]" />
                            Popular
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 md:px-8 pb-4 md:pb-6 text-sm md:text-base text-gray-600 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>

        {/* Contact Support CTA */}
        <div className="mt-8 md:mt-12 text-center">
          <Button
            variant="outline"
            className="group hover:bg-gray-100 hover:text-gray-900 border-gray-300 transition-all duration-300 rounded-lg px-8 md:px-12 py-4 md:py-5 text-sm md:text-base font-semibold hover:shadow-md"
          >
            <span>Contact Support</span>
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  )
}
