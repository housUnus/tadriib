"use client"

import React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Share2, 
  Link2, 
  Check, 
  Twitter, 
  Facebook, 
  Linkedin,
  Mail,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface ShareDialogProps {
  title: string
  url?: string
  description?: string
  children?: React.ReactNode
  className?: string
}

const socialLinks = [
  { name: "Twitter", icon: Twitter, color: "bg-sky-500 hover:bg-sky-600", getUrl: (url: string, title: string) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}` },
  { name: "Facebook", icon: Facebook, color: "bg-blue-600 hover:bg-blue-700", getUrl: (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
  { name: "LinkedIn", icon: Linkedin, color: "bg-blue-700 hover:bg-blue-800", getUrl: (url: string, title: string) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
  { name: "Email", icon: Mail, color: "bg-neutral-600 hover:bg-neutral-700", getUrl: (url: string, title: string, desc: string) => `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(desc + "\n\n" + url)}` },
]

export function ShareDialog({ title, url, description = "", children, className }: ShareDialogProps) {
  const [copied, setCopied] = useState(false)
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "")

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const handleShare = (getUrl: (url: string, title: string, desc: string) => string) => {
    window.open(getUrl(shareUrl, title, description), "_blank", "noopener,noreferrer")
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || (
          <Button variant="ghost" size="icon" className={className}>
            <Share2 className="h-5 w-5" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Share this course</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="flex justify-center gap-3">
            {socialLinks.map((social) => (
              <button
                key={social.name}
                onClick={() => handleShare(social.getUrl)}
                className={cn(
                  "h-12 w-12 rounded-full flex items-center justify-center text-white transition-all hover:scale-110",
                  social.color
                )}
                title={`Share on ${social.name}`}
              >
                <social.icon className="h-5 w-5" />
              </button>
            ))}
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Or copy link</p>
            <div className="flex gap-2">
              <Input 
                value={shareUrl} 
                readOnly 
                className="bg-muted text-sm"
              />
              <Button 
                onClick={copyToClipboard} 
                variant="outline"
                className={cn(
                  "shrink-0 gap-2 transition-all",
                  copied && ""
                )}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Link2 className="h-4 w-4" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
