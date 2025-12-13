"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { LogOut, AlertTriangle } from "lucide-react"

interface ExitDialogProps {
  stats: {
    total: number
    answered: number
    notAnswered: number
  }
  onConfirmExit: () => void
}

export function ExitDialog({ stats, onConfirmExit }: ExitDialogProps) {
  const [open, setOpen] = useState(false)

  const handleExit = () => {
    setOpen(false)
    onConfirmExit()
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          <LogOut className="mr-2 h-4 w-4" />
          <span className="hidden md:block">Exit</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
            <AlertTriangle className="h-6 w-6 text-amber-600" />
          </div>
          <AlertDialogTitle className="text-center">Exit Quiz?</AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            Are you sure you want to exit? Your progress will be lost.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="my-4 rounded-lg border bg-muted/50 p-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Answered</span>
              <span className="font-medium text-green-600">{stats.answered}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Unanswered</span>
              <span className="font-medium text-amber-600">{stats.notAnswered}</span>
            </div>
            <div className="flex justify-between col-span-2">
              <span className="text-muted-foreground">Total Questions</span>
              <span className="font-medium">{stats.total}</span>
            </div>
          </div>
        </div>

        <AlertDialogFooter className="sm:justify-center gap-3">
          <AlertDialogCancel className="sm:w-32">Continue Quiz</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleExit}
            className="sm:w-32 bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Exit Quiz
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
