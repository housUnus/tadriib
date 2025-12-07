"use client";

import  { useState } from "react";
import { Icon } from "@iconify/react";
import { BlogType } from "../../../../[locale]/(main)/types/apps/blog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const BlogComment = ({ comment }: BlogType | any) => {
  const [showReply, setShowReply] = useState(false);

  return (
    <>
      {/* Comment Box */}
      <div className="mt-5 p-5 bg-muted dark:bg-darkmuted rounded-lg">
        <div className="flex gap-3 items-center">
          <Avatar className="h-8 w-8">
            <AvatarImage src={comment?.profile.avatar} alt={comment?.profile.name} />
            <AvatarFallback>{comment?.profile.name?.[0]}</AvatarFallback>
          </Avatar>
          <h6 className="text-base font-medium">{comment?.profile.name}</h6>
          <span className="h-2 w-2 rounded-full bg-zinc-700 dark:bg-white opacity-40 block" />
          <p className="text-sm text-muted-foreground">{comment?.profile.time}</p>
        </div>

        <div className="py-4">
          <p className="text-sm text-foreground">{comment?.comment}</p>
        </div>

        <div className="relative w-fit">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  onClick={() => setShowReply(!showReply)}
                  className="rounded-full"
                >
                  <Icon icon="solar:undo-left-linear" height="18" className="shrink-0" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Reply</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Replies */}
      {comment?.replies?.length > 0 && (
        <>
          {comment.replies.map((reply: BlogType | any) => (
            <div className="ps-8" key={reply.comment}>
              <div className="mt-5 p-5 bg-muted dark:bg-darkmuted rounded-lg">
                <div className="flex gap-3 items-center">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={reply.profile.avatar} alt={reply.profile.name} />
                    <AvatarFallback>{reply.profile.name?.[0]}</AvatarFallback>
                  </Avatar>
                  <h6 className="text-base font-medium">{reply.profile.name}</h6>
                  <span className="h-2 w-2 rounded-full bg-zinc-700 dark:bg-white opacity-40 block" />
                  <p className="text-sm text-muted-foreground">{reply.profile.time}</p>
                </div>

                <div className="py-4">
                  <p className="text-sm text-foreground">{reply.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </>
      )}

      {/* Reply Input */}
      {showReply && (
        <div className="py-5 px-5">
          <div className="flex gap-3 items-center">
            <Avatar className="h-8 w-8">
              <AvatarImage src={comment?.profile.avatar} alt={comment?.profile.name} />
              <AvatarFallback>{comment?.profile.name?.[0]}</AvatarFallback>
            </Avatar>
            <Input
              placeholder="Write a reply..."
              className="flex-1"
            />
            <Button>Reply</Button>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogComment;
