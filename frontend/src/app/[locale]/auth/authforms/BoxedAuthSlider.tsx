"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const SliderData = [
  {
    title: "Track Your Progress with Precision",
    desc: "Get detailed performance insights, identify weak areas, and focus your preparation where it matters most.",
  },
  {
    title: "Learn Through Courses & Expert Content",
    desc: "Strengthen your knowledge with structured courses and supporting materials aligned with your quiz preparation journey.",
  },
  {
    title: "Prepare with Realistic Exam Simulations",
    desc: "Experience timed quizzes and mock exams that simulate real fellowship conditions to build confidence and speed.",
  },
];

const BoxedAuthSlider = () => {
  const pathname = usePathname();

  const isSmall =
    pathname === "/auth/forgot-password" ||
    pathname === "/auth/two-steps";

  return (
    <div className="max-w-md mx-auto h-full flex flex-col justify-center items-center boxed-auth">
      <Image
        src="/images/backgrounds/login-side.png"
        alt="auth"
        width={300}
        height={300}
        className={isSmall ? "max-w-[200px]" : "max-w-[300px]"}
      />

      <Carousel
        className={isSmall ? "h-[150px]" : "my-4"}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}>
        <CarouselContent>
          {SliderData.map((item, index) => (
            <CarouselItem key={index}>
              <div className="text-center">
                <h5 className="text-22 my-6">{item.title}</h5>

                {!isSmall && (
                  <p className="text-15 my-6 mt-3 leading-6">{item.desc}</p>
                )}

                {/* <Button className="w-fit mx-auto">Learn More</Button> */}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Optional navigation arrows */}
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default BoxedAuthSlider;
