"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  CheckCircle2,
  Trash2,
  Plus,
  X,
  Lightbulb,
  MessageSquare,
} from "lucide-react"
import { cn } from "@/lib/utils/utils"
import { RichTextEditor } from "../rich-text-editor"
import type { QuizQuestion, QuestionType } from "@/types/course"
import { DebouncedInput } from "@/components/common/forms/generic/DebounceInput"

interface QuestionEditorProps {
  question: QuizQuestion
  index: number
  onUpdate: (question: Partial<QuizQuestion>) => void
  onDelete: () => void
}

const questionTypes: { value: QuestionType; label: string }[] = [
  { value: "multiple_choice", label: "Multiple Choice" },
  { value: "true_false", label: "True / False" },
  { value: "fill_blank", label: "Fill in the Blank" },
]

export function QuestionEditor({ question, index, onUpdate, onDelete }: QuestionEditorProps) {
  const [showHint, setShowHint] = useState(!!question.answer_hint)
  const [showAnswerDetails, setShowAnswerDetails] = useState(!!question.answer_explanation)

  const handleTypeChange = (type: QuestionType) => {
    const updated: Partial<QuizQuestion> = {
      type,
      options: type === "multiple_choice" ? question.options || ["", "", "", ""] : undefined,
      allow_multiple_answers: type === "multiple_choice" ? false : undefined,
      correct_answer: type === "multiple_choice" ? [0] : (type === "true_false" ? true : (type === "fill_blank" ? "" : undefined)),
    }
    onUpdate(updated)
  }

  const toggleCorrectAnswer = (optionIndex: number) => {
    if (question.allow_multiple_answers) {
      const current = question.correct_answer || []
      const updated = (current as number[]).includes(optionIndex)
        ? (current as number[]).filter(i => i !== optionIndex)
        : [...(current as number[]), optionIndex]
      onUpdate({ correct_answer: updated.length > 0 ? updated : [0] })
    } else {
      onUpdate({ correct_answer: [optionIndex] })
    }
  }

  const addOption = () => {
    onUpdate({ options: [...(question.options || []), ""] })
  }

  const removeOption = (optionIndex: number) => {
    const newOptions = (question.options || []).filter((_, i) => i !== optionIndex)
    const new_correct_answer = ((question.correct_answer as number[]) || [])
      .filter(i => i !== optionIndex)
      .map(i => i > optionIndex ? i - 1 : i)
    onUpdate({ 
      options: newOptions,
      correct_answer: new_correct_answer.length > 0 ? new_correct_answer : [0]
    })
  }

  const updateOption = (optionIndex: number, value: string) => {
    const newOptions = [...(question.options || [])]
    newOptions[optionIndex] = value
    onUpdate({ options: newOptions })
  }

  return (
    <div className="p-4 bg-background border rounded-lg space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-primary">Q{index + 1}</span>
            <Select value={question.type} onValueChange={(v) => handleTypeChange(v as QuestionType)}>
              <SelectTrigger className="w-[180px] h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {questionTypes.map(qt => (
                  <SelectItem key={qt.value} value={qt.value}>{qt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Rich Text Editor for Question */}
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">Question (supports formatting and images)</label>
            <RichTextEditor
              value={question.question}
              onChange={(value) => onUpdate({ question: value })}
              placeholder="Enter your question..."
            />
          </div>
        </div>
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8 text-destructive hover:text-destructive shrink-0"
          onClick={onDelete}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Multiple Choice Options */}
      {question.type === "multiple_choice" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Answer Options</label>
            <div className="flex items-center gap-2">
              <Switch
                id={`multi-${question.id}`}
                checked={question.allow_multiple_answers || false}
                onCheckedChange={(checked) => onUpdate({ allow_multiple_answers: checked, correct_answer: [0] })}
              />
              <Label htmlFor={`multi-${question.id}`} className="text-xs text-muted-foreground">
                Allow multiple correct
              </Label>
            </div>
          </div>
          
          {(question.options || []).map((option, oIndex) => (
            <div key={oIndex} className="flex items-center gap-2">
              {question.allow_multiple_answers ? (
                <input
                  type="checkbox"
                  checked={((question.correct_answer as number[]) || []).includes(oIndex)}
                  onChange={() => toggleCorrectAnswer(oIndex)}
                  className="h-4 w-4 rounded"
                />
              ) : (
                <input
                  type="radio"
                  name={`correct-${question.id}`}
                  checked={((question.correct_answer as number[]) || []).includes(oIndex)}
                  onChange={() => toggleCorrectAnswer(oIndex)}
                  className="h-4 w-4"
                />
              )}
              <DebouncedInput
                component={Input}
                value={option}
                onChange={(value) => updateOption(oIndex, value)}
                placeholder={`Option ${oIndex + 1}`}
                className={cn(
                  "flex-1",
                  ((question.correct_answer as number[]) || []).includes(oIndex) && "border-emerald-500 bg-emerald-50/50"
                )}
              />
              {(question.options?.length || 0) > 2 && (
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 shrink-0"
                  onClick={() => removeOption(oIndex)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          
          <Button variant="outline" size="sm" onClick={addOption} className="gap-1">
            <Plus className="h-3.5 w-3.5" />
            Add Option
          </Button>
          
          <p className="text-xs text-muted-foreground">
            {question.allow_multiple_answers 
              ? "Check all correct answers" 
              : "Select the correct answer"}
          </p>
        </div>
      )}

      {/* True/False */}
      {question.type === "true_false" && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Correct Answer</label>
          <div className="flex gap-3">
            <Button
              variant={(question.correct_answer as boolean) === true ? "default" : "outline"}
              size="sm"
              onClick={() => onUpdate({ correct_answer: true })}
              className={(question.correct_answer as boolean) === true ? "bg-emerald-600 hover:bg-emerald-700" : ""}
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              True
            </Button>
            <Button
              variant={(question.correct_answer as boolean) === false ? "default" : "outline"}
              size="sm"
              onClick={() => onUpdate({ correct_answer: false })}
              className={(question.correct_answer as boolean) === false ? "bg-red-600 hover:bg-red-700" : ""}
            >
              <X className="h-4 w-4 mr-2" />
              False
            </Button>
          </div>
        </div>
      )}

      {/* Fill in the Blank */}
      {question.type === "fill_blank" && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Correct Answer</label>
          <Input
            value={(question.correct_answer as string) || ""}
            onChange={(e) => onUpdate({ correct_answer: e.target.value })}
            placeholder="Enter the correct answer..."
          />
          <p className="text-xs text-muted-foreground">
            Use [blank] in your question to indicate where the answer goes
          </p>
        </div>
      )}

      {/* Optional: Hint & Answer Details */}
      <div className="flex gap-2 pt-2 border-t">
        {!showHint && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowHint(true)}
            className="gap-1.5 text-muted-foreground"
          >
            <Lightbulb className="h-3.5 w-3.5" />
            Add Hint
          </Button>
        )}
        {!showAnswerDetails && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAnswerDetails(true)}
            className="gap-1.5 text-muted-foreground"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            Add Answer Details
          </Button>
        )}
      </div>

      {showHint && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium flex items-center gap-1.5">
              <Lightbulb className="h-4 w-4 text-amber-500" />
              Hint
            </label>
            <Button
              size="icon"
              variant="ghost"
              className="h-6 w-6"
              onClick={() => {
                setShowHint(false)
                onUpdate({ answer_hint: undefined })
              }}
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>
          <DebouncedInput
            value={question.answer_hint || ""}
            onChange={(value) => onUpdate({ answer_hint: value })}
            placeholder="Give a hint to help students..."
          />
        </div>
      )}

      {showAnswerDetails && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium flex items-center gap-1.5">
              <MessageSquare className="h-4 w-4 text-blue-500" />
              Answer Details
            </label>
            <Button
              size="icon"
              variant="ghost"
              className="h-6 w-6"
              onClick={() => {
                setShowAnswerDetails(false)
                onUpdate({ answer_explanation: undefined })
              }}
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>
          <DebouncedInput
            component={Textarea}
            value={question.answer_explanation || ""}
            onChange={(value) => onUpdate({ answer_explanation: value})}
            placeholder="Explain why this is the correct answer..."
            rows={3}
          />
        </div>
      )}
    </div>
  )
}
