"use client"

import type React from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Info, Clock, FileText, Award, Users } from "lucide-react"

interface AboutTestDialogProps {
  trigger?: React.ReactNode
}

export function AboutTestDialog({ trigger }: AboutTestDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="w-full justify-start bg-transparent">
            <Info className="mr-2 h-4 w-4" />
            About Test
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Info className="h-5 w-5 text-primary" />
            About This Test
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-semibold text-foreground">AFCAT Test Series 2023 I - Reasoning</h3>
            <p className="mt-1 text-sm text-muted-foreground">Air Force Common Admission Test preparation series</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-start gap-3 rounded-lg border p-3">
              <Clock className="mt-0.5 h-4 w-4 text-primary" />
              <div>
                <p className="text-sm font-medium">Duration</p>
                <p className="text-sm text-muted-foreground">3 Hours</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border p-3">
              <FileText className="mt-0.5 h-4 w-4 text-primary" />
              <div>
                <p className="text-sm font-medium">Total Questions</p>
                <p className="text-sm text-muted-foreground">100 Questions</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border p-3">
              <Award className="mt-0.5 h-4 w-4 text-primary" />
              <div>
                <p className="text-sm font-medium">Total Marks</p>
                <p className="text-sm text-muted-foreground">300 Marks</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border p-3">
              <Users className="mt-0.5 h-4 w-4 text-primary" />
              <div>
                <p className="text-sm font-medium">Attempts</p>
                <p className="text-sm text-muted-foreground">12,450 Students</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Sections</h4>
            <div className="space-y-1.5">
              {[
                { name: "Section A - General Awareness", questions: 25, marks: 75 },
                { name: "Section B - Verbal Ability", questions: 25, marks: 75 },
                { name: "Section C - Numerical Ability", questions: 25, marks: 75 },
                { name: "Section D - Reasoning & Military Aptitude", questions: 25, marks: 75 },
              ].map((section) => (
                <div
                  key={section.name}
                  className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2 text-sm"
                >
                  <span>{section.name}</span>
                  <span className="text-muted-foreground">
                    {section.questions} Qs • {section.marks} marks
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-900 dark:bg-amber-950/30">
            <p className="text-sm text-amber-800 dark:text-amber-200">
              <strong>Negative Marking:</strong> 1 mark will be deducted for each wrong answer. No marks deducted for
              unattempted questions.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
