"use client"

import { Loader2 } from "lucide-react";
import { createPortal } from "react-dom";

export default function ContentLoader({
  title = "Loading...",
  description,
  fullScreen = false,
}: {
  title?: string;
  description?: string;
  fullScreen?: boolean;
}) {
  const content = (
    <div
      className={`flex flex-col items-center justify-center gap-4 ${
        fullScreen
          ? "fixed inset-0 z-100 min-h-screen w-screen bg-background"
          : "py-16"
      }`}
    >
      {/* Spinner */}
      <Loader2 className="h-8 w-8 animate-spin text-primary" />

      {/* Text */}
      <div className="space-y-1 text-center">
        <p className="text-sm font-medium">{title}</p>

        {description && (
          <p className="text-xs text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </div>
  );

  if (fullScreen && typeof window !== "undefined") {
    return createPortal(content, document.body);
  }

  return content;
}