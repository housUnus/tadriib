"use client";

import { format } from "date-fns";
import { GoDot } from "react-icons/go";
import { Icon } from "@iconify/react";
import { BlogPostType } from "@/app/[locale]/(main)/types/apps/blog";
import CardBox from "../../shared/CardBox";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Btype {
  post: BlogPostType;
  index?: number;
}

const BlogPageCard = ({ post }: Btype) => {
  const { coverImg, title, view, comments, category, author, createdAt }: any = post;

  const linkTo = title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

  return (
    <div className="lg:col-span-4 md:col-span-6 col-span-12">
      <CardBox className="p-0 overflow-hidden group card-hover">
        <div className="relative">
          <Link href={`/frontend-pages/blog/detail/${linkTo}`}>
            <div className="overflow-hidden h-60">
              <Image
                src={coverImg}
                alt="MatDash"
                height={240}
                width={500}
                className="w-full object-cover"
              />
            </div>

            {/* ✅ Badge (Shadcn) */}
            <Badge
              variant="secondary"
              className="absolute bottom-8 right-6 bg-white text-dark text-xs font-semibold shadow-sm"
            >
              2 min Read
            </Badge>
          </Link>

          {/* ✅ Avatar with Tooltip */}
          <div className="flex justify-between items-center -mt-6 px-6">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Avatar className="border border-white shadow-sm">
                    <AvatarImage src={author?.avatar} alt={author?.name} />
                    <AvatarFallback>{author?.name?.charAt(0) ?? "A"}</AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{author?.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* ✅ Card Body */}
        <div className="px-6 pb-6 ">
          <Badge
            variant="muted"
            className="mt-3"
          >
            {category}
          </Badge>

          <h5 className="text-xl py-6 group-hover:text-primary transition-colors">
            <Link
              href={`/frontend-pages/blog/detail/${linkTo}`}
              className="line-clamp-2"
            >
              {title}
            </Link>
          </h5>

          {/* ✅ Footer Meta Info */}
          <div className="flex gap-3">
            <div className="flex gap-2 items-center text-darklink dark:text-bodytext text-[15px]">
              <Icon icon="solar:eye-outline" height="18" className="text-ld" />
              {view}
            </div>

            <div className="flex gap-2 items-center text-darklink dark:text-bodytext text-[15px]">
              <Icon icon="solar:chat-line-outline" height="18" className="text-ld" />
              {comments?.length}
            </div>

            <div className="ml-auto flex gap-2 items-center text-darklink dark:text-bodytext text-[15px]">
              <GoDot size={16} className="text-ld" />
              <small>{format(new Date(createdAt), "E, MMM d")}</small>
            </div>
          </div>
        </div>
      </CardBox>
    </div>
  );
};

export default BlogPageCard;
