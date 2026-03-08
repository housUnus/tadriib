"use client"

import type React from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { BookOpen, CheckCircle2, AlertCircle, Clock, MousePointer } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface InstructionsDialogProps {
  trigger?: React.ReactNode
}

export function InstructionsDialog({ trigger }: InstructionsDialogProps) {
  const instructions = [
    {
      icon: Clock,
      title: "Time Management",
      items: [
        "Total duration of the test is 3 hours (180 minutes)",
        "Timer will start as soon as you begin the test",
        "Test will auto-submit when time expires",
      ],
    },
    {
      icon: MousePointer,
      title: "Navigation",
      items: [
        "Click on question numbers in the left panel to navigate",
        "Use 'Save and Next' to save your answer and move forward",
        "Use 'Clear Response' to deselect your answer",
        "You can bookmark questions to review later",
      ],
    },
    {
      icon: CheckCircle2,
      title: "Answering Questions",
      items: [
        "Click on an option to select your answer",
        "You can change your answer anytime before submission",
        "Green indicates answered, Blue indicates marked for review",
        "Yellow indicates bookmarked questions",
      ],
    },
    {
      icon: AlertCircle,
      title: "Important Notes",
      items: [
        "Each correct answer carries 3 marks",
        "1 mark will be deducted for each wrong answer",
        "No negative marking for unattempted questions",
        "Review all answers before final submission",
      ],
    },
  ]

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="w-full justify-start bg-transparent">
            <BookOpen className="mr-2 h-4 w-4" />
            Read Instructions
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Test Instructions
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-6 pt-2">
            {instructions.map((section) => (
              <div key={section.title} className="space-y-3">
                <div className="flex items-center gap-2">
                  <section.icon className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold">{section.title}</h3>
                </div>
                <ul className="ml-6 space-y-2">
                  {section.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="space-y-3 pt-2">
              <h3 className="font-semibold">Question Status Legend</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { color: "bg-muted", border: "border", label: "Not Visited" },
                  { color: "bg-muted", border: "border-2 border-primary", label: "Visited (Not Answered)" },
                  { color: "bg-emerald-500", border: "", label: "Answered" },
                  { color: "bg-blue-500", border: "", label: "Marked for Review" },
                  { color: "bg-amber-500", border: "", label: "Bookmarked" },
                ].map((status) => (
                  <div key={status.label} className="flex items-center gap-2">
                    <div className={`h-6 w-6 rounded ${status.color} ${status.border}`} />
                    <span className="text-sm">{status.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950/30">
              <h4 className="font-medium text-blue-800 dark:text-blue-200">Before You Begin</h4>
              <ul className="mt-2 space-y-1 text-sm text-blue-700 dark:text-blue-300">
                <li>• Ensure stable internet connection</li>
                <li>• Do not refresh or close the browser during the test</li>
                <li>• Keep your ID card ready for verification</li>
              </ul>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
