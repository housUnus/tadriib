import _Carousel from "@/components/common/Carousel";
import { ReviewCard } from "@/components/common/ReviewCard";

const testimonials = [
  {
    id: 1,
    name: "أحمد القحطاني",
    role: "محلل نظم",
    company: "شركة أرامكو",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "منصة الاختبارات هذه ساعدتني أتعرف على نقاط ضعفي قبل التقديم على الوظيفة. التحليلات دقيقة جدًا وتعطيك تصور واضح عن مستواك الحقيقي.",
    featured: true,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Software Engineer",
    company: "Google",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "The assessments are incredibly well-designed. I used them to practice for technical interviews and the difficulty level was exactly right.",
    featured: false,
  },
  {
    id: 3,
    name: "ريم الحارثي",
    role: "متخصصة تجربة المستخدم",
    company: "هيئة الحكومة الرقمية",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "اختبارات UX هنا مميزة جدًا وتعتمد على سيناريوهات واقعية. ساعدتني كثير في تحسين مهاراتي قبل الترقيات.",
    featured: true,
  },
  {
    id: 4,
    name: "David Park",
    role: "Senior UX Designer",
    company: "Meta",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "The design quizzes here are fantastic. They prepared me well for portfolio reviews and practical design challenges.",
    featured: false,
  },
  {
    id: 5,
    name: "ليان الشمري",
    role: "مديرة تسويق",
    company: "شركة Noon",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "استخدمنا المنصة لتقييم فريق التسويق عندنا. النتائج ساعدتنا نحدد المهارات المطلوبة ونرفع الإنتاجية بنسبة كبيرة.",
    featured: false,
  },
  {
    id: 6,
    name: "Michael Chen",
    role: "Product Manager",
    company: "Microsoft",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "The reporting system is top tier. The skill breakdowns helped me map out an actual improvement plan.",
    featured: true,
  }
];


export default function Testimonial() {
  return (
    <section className="py-14 px-6 sm:px-6 lg:px-8 bg-gradient-to-br from-white  to-green-700/10">
      <div className="max-w-7xl mx-auto">
        {/* Testimonials Section */}
        <div className="mb-0">
          <div className="text-start mb-6 px-1 md:px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
              Success Stories
            </h2>
            <p className="text-base text-gray-600 max-w-3xl">
              Hear from professionals who transformed their careers through our
              platform
            </p>
          </div>

          {/* Horizontal Scrollable Testimonials */}
          <_Carousel
            items={testimonials}
            Component={ReviewCard}
            contentClassName="-ml-0 sm:-ml-0 md:-ml-4 py-5"
            ItemClassName="basis-[97%] sm:basis-[55%] md:basis-[30%] md:pl-6 pl-2"
          />
        </div>
      </div>
    </section>
  );
}
