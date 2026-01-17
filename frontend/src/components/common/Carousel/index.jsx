import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CourseCard from "../CourseCard/index";
import Autoplay from "embla-carousel-autoplay";
import { useLocale } from "next-intl";

export default function _Carousel({
  items,
  Component = CourseCard,
  contentClassName = "-ml-2 md:-ml-0 py-4",
  ItemClassName = "basis-[80%] md:basis-80 pl-4 md:pl-4",
}) {
  const locale = useLocale();
  const isRTL = locale === "ar";
  
  return (
    <Carousel
      className="w-full"
      opts={{
        align: "start",
        loop: true,
        direction: isRTL ? "rtl" : "ltr",
      }}
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
    >
      <CarouselContent className={contentClassName}>
        {items?.map((item, index) => (
          <CarouselItem key={index} className={ItemClassName}>
            <Component item={item} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute p-6 -left-5 top-1/2 transform -translate-y-1/2 z-10 shadow-md border border-zinc-300 font-semibold" />
      <CarouselNext className="absolute p-6 -right-5 top-1/2 transform -translate-y-1/2 z-10 shadow-md border border-zinc-300" />
    </Carousel>
  );
}
