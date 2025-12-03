"use client";

import { useEffect, useContext, useState } from "react";
import { usePathname } from "next/navigation";
import { FaQuoteLeft } from "react-icons/fa";
import { GoDot } from "react-icons/go";
import { Icon } from "@iconify/react";
import { format } from "date-fns";
import { uniqueId } from "lodash";
import type { BlogType } from "../../../../(main)/types/apps/blog";
import CardBox from "@/app/components/shared/CardBox";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import BlogComment from "./BlogCommnets";
import { BlogContext, BlogContextProps } from "../../../../context/BlogContext/index";
import { Badge } from "@/components/ui/badge";

const BlogDetailData = () => {
  const { posts, setLoading, addComment }: BlogContextProps =
    useContext(BlogContext);
  const pathName = usePathname();
  const getTitle: string | any = pathName.split("/").pop();
  const post = posts.find(
    (p) =>
      p.title
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "") === getTitle
  );

  const [replyTxt, setReplyTxt] = useState("");

  const onSubmit = () => {
    if (!post || !post.id) return;
    const newComment = {
      id: uniqueId("#comm_"),
      profile: {
        id: uniqueId("#USER_"),
        avatar: post.author?.avatar || "",
        name: post.author?.name || "",
        time: "Now",
      },
      comment: replyTxt,
      replies: [],
      postId: post.id,
    };
    addComment(post.id, newComment);
    setReplyTxt("");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, [setLoading]);

  return (
    <>
      {post ? (
        <>
          <CardBox className="p-0 overflow-hidden">
            <div className="relative">
              <div className="overflow-hidden max-h-[440px]">
                <Image
                  src={post?.coverImg}
                  alt="MatDash"
                  height={440}
                  width={1500}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <Badge
                variant="white"
                className="absolute bottom-8 right-6"
              >
                2 min Read
              </Badge>
            </div>

            <div className="flex justify-between items-center -mt-7 px-6">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={post?.author.avatar}
                        alt={post?.author.name}
                      />
                      <AvatarFallback>
                        {post?.author.name?.[0] || "A"}
                      </AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>{post?.author.name}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="px-6 pb-6">
              {/* Category Badge */}
              <Badge
                variant="muted"
                className="mt-3"
              >
                {post?.category}
              </Badge>


              <h2 className="md:text-4xl text-2xl my-6 font-semibold">
                {post?.title}
              </h2>

              {/* Meta */}
              <div className="flex gap-3">
                <div className="flex gap-2 items-center text-darklink dark:text-bodytext text-sm">
                  <Icon icon="solar:eye-outline" height="18" />
                  {post?.view}
                </div>
                <div className="flex gap-2 items-center text-darklink dark:text-bodytext text-sm">
                  <Icon icon="solar:chat-line-outline" height="18" />
                  {post?.comments?.length || 0}
                </div>
                <div className="ms-auto flex gap-2 items-center text-darklink dark:text-bodytext text-base">
                  <GoDot size="16" />
                  <small>
                    {post?.createdAt
                      ? format(new Date(post.createdAt), "E, MMM d")
                      : ""}
                  </small>
                </div>
              </div>
            </div>

            <hr className="my-0 mb-4 border-border" />

            {/* Body */}
            <div className="px-6 pb-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
              <h2 className="md:text-3xl text-2xl pb-3 font-semibold">
                Title of the paragraph
              </h2>
              <p className="text-darklink dark:text-bodytext">
                But you cannot figure out what it is or what it can do. MTA web
                directory is the simplest way in which one can bid on a link, or
                a few links if they wish to do so. The link directory on MTA
                displays all of the links it currently has, and does so in
                alphabetical order, which makes it much easier for someone to
                find what they are looking for if it is something specific and
                they do not want to go through all the other sites and links as
                well. It allows you to start your bid at the bottom and slowly
                work your way to the top of the list
              </p>
              <p className="text-darklink dark:text-bodytext">
                Figure out what it is or what it can do. MTA web directory is
                the simplest way in which one can bid on a link, or a few links
                if they wish to do so. The link directory on MTA displays all of
                the links it currently has, and does so in alphabetical order,
                which makes it much easier for someone to find what they are
                looking for if it is something specific and they do not want to
                go through all the other sites and links as well. It allows you
                to start your bid at the bottom and slowly work your way to the
                top of the
              </p>

              <p className="font-semibold text-foreground mb-0">
                This is strong text.
              </p>
              <i>This is italic text.</i>

              <hr className="my-8 h-px border-0 bg-gray-200 dark:bg-gray-700"/>

              {/* Unordered List */}
              <h3 className="text-xl mb-3 font-semibold">Unordered list</h3>
              <ul className="list-inside space-y-1 text-gray-500 dark:text-gray-400 list-disc">
                <li>Figure out what it is or</li>
                <li>The links it currently</li>
                <li>It allows you to start your bid</li>
              </ul>

              <hr className="my-8 h-px border-0 bg-gray-200 dark:bg-gray-700"/>

              {/* Ordered List */}
              <h3 className="text-xl mb-3 font-semibold">Ordered list</h3>
              <ol className="list-inside space-y-1 text-gray-500 dark:text-gray-400 list-decimal">
                <li>Figure out what it is or</li>
                <li>The links it currently</li>
                <li>It allows you to start your bid</li>
              </ol>

              <hr className="my-8 h-px border-0 bg-gray-200 dark:bg-gray-700"/>

              {/* Quote */}
              <h3 className="text-xl mb-3 font-semibold">Quotes</h3>
              <div className="pt-5 pb-4 px-4 rounded-md border-s-2 border-primary bg-muted dark:bg-darkmuted flex gap-1 items-start">
                <FaQuoteLeft size={20} className="text-ld -mt-1" />
                <h2 className="text-base font-bold">
                  Life is short, smile while you still have teeth!
                </h2>
              </div>
            </div>
          </CardBox>

          {/* Comments */}
          <CardBox className="mt-6">
            <h5 className="text-xl mb-2 font-semibold">Post Comments</h5>
            <Textarea
              rows={4}
              value={replyTxt}
              placeholder="Write your comment..."
              className="resize-none"
              onChange={(e) => setReplyTxt(e.target.value)}
            />
            <Button
              className="mt-3 w-fit"
              variant="default"
              onClick={onSubmit}
            >
              Post Comment
            </Button>

            <div className="mt-6">
              <div className="flex gap-3 items-center">
                <h5 className="text-xl font-semibold">Comments</h5>
                <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                  {post?.comments?.length || 0}
                </div>
              </div>

              <div>
                {post?.comments?.map((comment: BlogType | any) => (
                  <BlogComment key={comment.id} comment={comment} />
                ))}
              </div>
            </div>
          </CardBox>
        </>
      ) : (
        <p className="text-xl text-center py-6 font-bold">No Post Found</p>
      )}
    </>
  );
};

export default BlogDetailData;
