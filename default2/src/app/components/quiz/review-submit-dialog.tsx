"use client"

import type React from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Send, AlertTriangle, CheckCircle2, XCircle, Bookmark, Flag } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState } from "react"

interface ReviewSubmitDialogProps {
  trigger?: React.ReactNode
  stats: {
    total: number
    answered: number
    notAnswered: number
    marked: number
    visited: number
  }
  onSubmit?: () => void
}

export function ReviewSubmitDialog({ trigger, stats, onSubmit }: ReviewSubmitDialogProps) {
  const [confirmStep, setConfirmStep] = useState(false)

  const handleSubmit = () => {
    if (!confirmStep) {
      setConfirmStep(true)
      return
    }
    onSubmit?.()
    setConfirmStep(false)
  }

  return (
    <Dialog onOpenChange={(open) => !open && setConfirmStep(false)}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Review and Submit
            <Send className="ml-2 h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Send className="h-5 w-5 text-primary" />
            {confirmStep ? "Confirm Submission" : "Review Your Test"}
          </DialogTitle>
        </DialogHeader>

        {!confirmStep ? (
          <ScrollArea className="max-h-[60vh]">
            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-3 rounded-lg border bg-emerald-50 p-3 dark:bg-emerald-950/30">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  <div>
                    <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">{stats.answered}</p>
                    <p className="text-sm text-emerald-600 dark:text-emerald-500">Answered</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border bg-red-50 p-3 dark:bg-red-950/30">
                  <XCircle className="h-5 w-5 text-red-600" />
                  <div>
                    <p className="text-2xl font-bold text-red-700 dark:text-red-400">{stats.notAnswered}</p>
                    <p className="text-sm text-red-600 dark:text-red-500">Not Answered</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border bg-blue-50 p-3 dark:bg-blue-950/30">
                  <Flag className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">{stats.marked}</p>
                    <p className="text-sm text-blue-600 dark:text-blue-500">Marked for Review</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Section Summary</h4>
                <div className="space-y-1.5">
                  {[
                    { name: "Section A", answered: 18, total: 25 },
                    { name: "Section B", answered: 20, total: 25 },
                    { name: "Section C", answered: 12, total: 25 },
                    { name: "Section D", answered: 5, total: 25 },
                  ].map((section) => (
                    <div
                      key={section.name}
                      className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2"
                    >
                      <span className="text-sm font-medium">{section.name}</span>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full bg-primary transition-all"
                            style={{ width: `${(section.answered / section.total) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {section.answered}/{section.total}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {stats.notAnswered > 0 && (
                <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-900 dark:bg-amber-950/30">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="mt-0.5 h-4 w-4 text-amber-600" />
                    <div>
                      <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                        You have {stats.notAnswered} unanswered questions
                      </p>
                      <p className="mt-1 text-sm text-amber-700 dark:text-amber-300">
                        Consider reviewing them before submitting.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        ) : (
          <div className="space-y-4 py-4">
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="rounded-full bg-amber-100 p-3 dark:bg-amber-900/30">
                <AlertTriangle className="h-8 w-8 text-amber-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Are you sure?</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Once submitted, you cannot change your answers. This action is irreversible.
                </p>
              </div>
            </div>
          </div>
        )}

        <DialogFooter className="gap-2 sm:gap-0">
          {confirmStep && (
            <Button variant="outline" onClick={() => setConfirmStep(false)}>
              Go Back
            </Button>
          )}
          <Button onClick={handleSubmit} className={confirmStep ? "bg-emerald-600 hover:bg-emerald-700" : ""}>
            {confirmStep ? "Yes, Submit Test" : "Proceed to Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
