import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CourseCard from "../CourseCard/index2";

export default function _Carousel({courses}) {
  return (
    <Carousel className="w-full" opts={{
        align: "start",
        slidesToScroll: 1,    
        loop: true,
      }}>
      <CarouselContent className="-ml-2 md:-ml-4">
        {courses?.map((course, index) => (
          <CarouselItem key={index} className="basis-1/4">
              <CourseCard course={course} />
          </CarouselItem>
        ))}
        
      </CarouselContent>
      <CarouselPrevious className="absolute p-6 -left-5 top-1/2 transform -translate-y-1/2 z-10 shadow-md border border-zinc-300 font-semibold" />
      <CarouselNext className="absolute p-6 -right-5 top-1/2 transform -translate-y-1/2 z-10 shadow-md border border-zinc-300" />
    </Carousel>
  );
}
