"use client"

import { useForm, useWatch } from "react-hook-form"
import { QuestionEditor } from "./question-editor"
import type { Data, QuizQuestion } from "@/types/course"
import { RHFForm } from "@/components/common/forms/RHFForm"
import TextAreaField from "@/components/common/forms/generic/TextAreaField"
import InputField from "@/components/common/forms/generic/InputField"
import CheckboxField from "@/components/common/forms/generic/CheckboxField"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useCourseStore } from "@/stores/course"
import { useUpdateEffect } from "@/hooks/use-update-effect"
import { useClientFetch } from "@/hooks/auth/use-client-fetch"
interface QuizEditorProps {
  sectionId: string
  itemId: string
  content: Data
  onUpdateQuestion: (questionId: string, data: Partial<QuizQuestion>) => void
  onDeleteQuestion: (questionId: string) => void
}

export function QuizEditor({ sectionId, itemId, content, onUpdateQuestion, onDeleteQuestion }: QuizEditorProps) {
console.log("🚀 ~ QuizEditor ~ itemId:", itemId)
console.log("🚀 ~ QuizEditor ~ sectionId:", sectionId)

  const { updateItem } = useCourseStore()

  const questions = content.questions || []
  const client = useClientFetch()

  const form = useForm({
    defaultValues: {
      description: content.description || "",
      show_correct_answers: content.show_correct_answers ?? false,
      show_final_score: content.show_final_score ?? false,
      max_attempts: content.max_attempts || null,
      can_pause: content.can_pause ?? false,
      require_review: content.require_review ?? false,
      time_limit_minutes: content.time_limit_minutes || null,
    },
  });

    const values = useWatch({ control: form.control });
    console.log("🚀 ~ QuizEditor ~ values:", values)
  
    useUpdateEffect(() => {
      updateItem(client, sectionId, itemId, {content: values})
    }, [values])

  return (
    <div className="space-y-4">
      <Collapsible >
        <div className="border rounded-2xl p-4">
          <CollapsibleTrigger className="flex w-full items-center justify-between font-medium">
            Results Settings
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>

          <CollapsibleContent className="mt-4 space-y-3">
            <RHFForm form={form} className="mt-2">
              <div className="space-y-6">

                {/* Description */}
                <TextAreaField
                  debounceTime={1000}
                  name="description"
                  label="Quiz Description"
                  placeholder="Optional instructions or details about the quiz"
                />

                {/* Attempts */}
                <InputField
                  debounceTime={1000}
                  name="max_attempts"
                  type="number"
                  label="Max Attempts"
                  positiveOnly
                  placeholder="Leave empty for unlimited"
                />
                {/* Time Limit */}
                <InputField
                  debounceTime={1000}
                  name="time_limit_minutes"
                  type="number"
                  positiveOnly
                  label="Time Limit (minutes)"
                  placeholder="Leave empty for no time limit"
                />

                {/* Results Settings */}
                <div className="space-y-3">
                  <p className="text-sm font-medium text-gray-700">Results Settings</p>

                  <CheckboxField
                    name="show_correct_answers"
                    label="Show Correct Answers"
                  />

                  <CheckboxField
                    name="show_final_score"
                    label="Show Final Score"
                  />
                </div>

                {/* Behavior Settings */}
                <div className="space-y-3">
                  <p className="text-sm font-medium text-gray-700">Behavior Settings</p>

                  <CheckboxField
                    name="can_pause"
                    label="Allow Pause"
                  />

                  <CheckboxField
                    name="require_review"
                    label="Require Review Before Submission"
                  />
                </div>
              </div>
            </RHFForm>
          </CollapsibleContent>
        </div>
      </Collapsible>
      <div className="space-y-3">
        <p className="text-sm font-medium text-gray-700">Questions</p>
        {questions.map((q, qIndex) => (
          <QuestionEditor
            key={q._id || qIndex}
            question={q}
            order={q.order}
            onUpdate={(updated) => onUpdateQuestion(q._id, updated)}
            onDelete={() => onDeleteQuestion(q._id)}
          />
        ))}
      </div>
    </div>
  )
}
