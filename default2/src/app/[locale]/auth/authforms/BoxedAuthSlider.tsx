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

const SliderData = [
  {
    title: "Feature Rich 3D Charts",
    desc: "Donec justo tortor, malesuada vitae faucibus ac, tristique sit amet massa. Aliquam dignissim nec felis quis imperdiet.",
  },
  {
    title: "Feature Rich 2D Charts",
    desc: "Donec justo tortor, malesuada vitae faucibus ac, tristique sit amet massa. Aliquam dignissim nec felis quis imperdiet.",
  },
  {
    title: "Feature Rich 1D Charts",
    desc: "Donec justo tortor, malesuada vitae faucibus ac, tristique sit amet massa. Aliquam dignissim nec felis quis imperdiet.",
  },
];

const BoxedAuthSlider = () => {
  const pathname = usePathname();

  const isSmall =
    pathname === "/auth/auth2/forgot-password" ||
    pathname === "/auth/auth2/two-steps";

  return (
    <div className="max-w-md mx-auto h-full flex flex-col justify-center items-center boxed-auth">
      <Image
        src="/images/backgrounds/login-side.png"
        alt="auth"
        width={300}
        height={300}
        className={isSmall ? "max-w-[200px]" : "max-w-[300px]"}
      />

      <Carousel className={isSmall ? "h-[150px]" : "-mt-8"}>
        <CarouselContent>
          {SliderData.map((item, index) => (
            <CarouselItem key={index}>
              <div className="text-center">
                <h5 className="text-22 my-6">{item.title}</h5>

                {!isSmall && (
                  <p className="text-15 my-6 mt-3 leading-6">{item.desc}</p>
                )}

                <Button className="w-fit mx-auto">Learn More</Button>
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
