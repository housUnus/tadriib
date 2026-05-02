"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils/utils"
import { RotateCcw, ArrowRight, Flag, Lightbulb, Check, X } from "lucide-react"
import type { Question, QuizOption } from "@/lib/data/quiz-data"
import { useState } from "react"
import { useDebounce } from "use-debounce"
import { useUpdateEffect } from "@/hooks/use-update-effect"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react";
import CardBox from "@/app/components/shared/CardBox";
import { Textarea } from "@/components/ui/textarea"

const getAlphabet = (locale: string) => {
  if (locale === "ar") return ["أ", "ب", "ج", "د", "هـ"]
  return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
}

function fixImageStyles(html: string) {
  return html.replace(
    /containerstyle="([^"]*)"/g,
    (_, styles) => {
      const match = styles.match(/width:\s*(\d+px)/);
      return match ? `style="width: ${match[1]};"` : "";
    }
  );
}

type OptionState = {
  isSelected: boolean | null;
  isCorrect: boolean | null;
  showCorrectAnswer: boolean | null;
};

function getOptionStyles({ isSelected, isCorrect, showCorrectAnswer }: OptionState) {
  // BEFORE submission (no correctness yet)
  if (!showCorrectAnswer) {
    if (isSelected) {
      return "border-primary bg-primary/10 text-foreground hover:border-primary/50 hover:bg-primary/10";
    }
    return "border-black bg-card text-card-foreground hover:border-primary/50 hover:bg-muted/50";
  }

  // AFTER submission
  if (isCorrect) {
    return "border-green-500 bg-green-500 text-white";
  }

  if (isSelected && !isCorrect) {
    return "border-red-500 bg-red-500 text-white";
  }

  return "border-black bg-muted text-muted-foreground";
}

type AnswerValue =
  | number
  | string[]
  | string
  | boolean
  | File
  | null

interface QuestionDisplayProps {
  question: Question
  selectedAnswer?: AnswerValue
  isFlagged: boolean
  isCorrect?: boolean
  correctAnswer?: string | string[]
  fontSize: number
  isReadOnly?: boolean
  showAnswers?: boolean
  isPaused?: boolean
  isLastQuestion?:boolean
  onSelectAnswer: (answer: AnswerValue) => void
  onClearAnswer: () => void
  onToggleFlag: () => void
  onSaveAndNext: () => void
}

function getFileName(file: File | string | null) {
  if (!file) return "No file selected"

  if (file instanceof File) return file.name

  const name = file.split("/").pop() || ""
  return decodeURIComponent(name)
}

export function QuestionDisplay({
  question,
  selectedAnswer,
  isFlagged,
  isCorrect,
  correctAnswer,
  fontSize,
  onSelectAnswer,
  onClearAnswer,
  onToggleFlag,
  onSaveAndNext,
  isReadOnly = false,
  showAnswers = true,
  isPaused,
  isLastQuestion,
}: QuestionDisplayProps) {
  console.log("🚀 ~ QuestionDisplay ~ correctAnswer:", correctAnswer)

  const [value, setValue] = useState((selectedAnswer as string) || "")
  console.log("🚀 ~ QuestionDisplay ~ selectedAnswer:", selectedAnswer)
  const [showHint, setShowHint] = useState(false)

  const [debouncedValue] = useDebounce(value, 500)

  useUpdateEffect(() => {
    if (selectedAnswer === debouncedValue) return
    onSelectAnswer(debouncedValue)
  }, [debouncedValue])

  const renderAnswerInput = () => {
    switch (question.answer_type) {

      case "multiple_choice": {
        const isMultiple = question.allow_multiple_answers

        return (
          <div className="space-y-3">

            {isMultiple && (
              <p className="text-sm text-muted-foreground">
                Select all correct answers
              </p>
            )}

            {question.options?.map((option: QuizOption, index: number) => {
              const label = getAlphabet('en')[index]
              const isSelected = Array.isArray(selectedAnswer)
                ? selectedAnswer.includes(option.id)
                : selectedAnswer === option.id
              const isCorrectAnswer = Array.isArray(correctAnswer)
                ? correctAnswer.includes(option.id)
                : correctAnswer === option.id

              const handleClick = () => {

                if (isMultiple) {

                  const current = Array.isArray(selectedAnswer)
                    ? selectedAnswer
                    : []

                  const updated = current.includes(option.id)
                    ? current.filter((label) => label !== option.id)
                    : [...current, option.id]

                  onSelectAnswer(updated)

                } else {
                  onSelectAnswer([option.id])
                }
              }

              return (
                <Button
                  // variant={'ghost'}
                  disabled={isReadOnly}
                  key={option.id}
                  onClick={handleClick}
                  className={cn(
                    "disabled:opacity-100 disabled:pointer-events-none flex w-full justify-start items-center gap-4 rounded-lg border p-2 h-auto text-left transition-all",
                    getOptionStyles({
                      isSelected,
                      isCorrect: !!isCorrectAnswer,
                      showCorrectAnswer: !!showAnswers && isReadOnly,
                    })
                  )}
                >

                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-medium",
                      isSelected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-muted text-muted-foreground",
                    )}
                  >
                    {label}
                  </span>

                  <span style={{ fontSize: `${fontSize}px` }}>
                    {option.text}
                  </span>

                </Button>
              )
            })}
          </div>
        )
      }

      case "true_false": {
        console.log("🚀 ~ renderAnswerInput ~ selectedAnswer:", selectedAnswer)
        return (
          <div className="flex gap-4">
            <Button
              disabled={isReadOnly}
              onClick={() => onSelectAnswer(true)}
              className={
                cn(
                  "disabled:opacity-100 disabled:pointer-events-none border",
                  getOptionStyles({
                    isSelected: selectedAnswer === true,
                    isCorrect: !!correctAnswer === true,
                    showCorrectAnswer: !!showAnswers && isReadOnly
                  })
                )
              }
            >
              True
            </Button>

            <Button
              disabled={isReadOnly}
              onClick={() => onSelectAnswer(false)}
              className={
                cn(
                  "disabled:opacity-100 disabled:pointer-events-none border",
                  getOptionStyles({
                    isSelected: selectedAnswer === false,
                    isCorrect: !!correctAnswer === false,
                    showCorrectAnswer: !!showAnswers && isReadOnly
                  })
                )
              }
            >
              False
            </Button>
          </div>
        )
      }

      case "fill_blank":
        return (
          <Input
            disabled={isReadOnly}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full border border-black rounded-md p-3 bg-white! dark:bg-white/10!"
            placeholder="Type your answer..."
          />
        )

      case "essay":
        return (
          <Textarea
            value={value}
            disabled={isReadOnly}
            onChange={(e) => setValue(e.target.value)}
            className="w-full border rounded-md p-3 min-h-[150px]"
            placeholder="Write your answer..."
          />
        )

      case "file_upload":
        return (
          <div className="space-y-2">
            <h6>Upload the file Below</h6>
            <CardBox className="p-0 shadow-none!">
              <div className='flex w-full items-center justify-center'>
                <Label
                  htmlFor='dropzone-file'
                  className='flex h-32 w-full cursor-pointer flex-col items-center mb-0 justify-center rounded-lg border border-dashed border-primary bg-lightprimary dark:bg-darkprimary'>
                  <div className='flex flex-col items-center justify-center pb-6 pt-5'>
                    <Icon
                      icon='solar:cloud-upload-outline'
                      height={32}
                      className='mb-3 text-ld'
                    />
                    <p className='mb-2 text-sm text-ld'>
                      <span className='font-semibold'>Click to upload</span> or drag
                      and drop
                    </p>
                    <p className='text-xs text-ld uppercase'>
                      {question.file_upload?.allowed_extensions.map((ext: string) => `.${ext}`).join(", ")}
                    </p>
                  </div>
                  <Input type="file" id='dropzone-file' className='hidden'
                    disabled={isReadOnly}
                    onChange={(e) =>
                      onSelectAnswer(e.target.files?.[0] || null)
                    } />
                </Label>
              </div>
            </CardBox >
            <p className="text-xs text-ld mt-2 text-center">
              {selectedAnswer instanceof File ? (
                selectedAnswer.name
              ) : typeof selectedAnswer === "string" ? (
                <a
                  href={`${process.env.NEXT_PUBLIC_API_SERVER_BASE_URL}${selectedAnswer}`}
                  download
                  target="_blank"
                  className="underline text-blue-600 hover:text-blue-800"
                >
                  {getFileName(selectedAnswer)}
                </a>
              ) : (
                "No file selected"
              )}
            </p>
          </div>
        )

      default:
        return null
    }

  }

  if (isPaused) {
    return (
      <div className="flex flex-col gap-6">
        <Card className="border shadow-md bg-muted/50">
          <CardContent className="p-2 mt-0">
            <div className="leading-relaxed [&_p]:mb-2">
              The Quiz is paused, please resume it to continue your progress
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (<div className="flex flex-col gap-6">
    <div className="">
      <div className="qs-container mb-4">
        <span className="font-bold text-black">Question {question.order + 1}: </span>
        <div className="bg-muted p-3 border border-gray-200 my-4 rounded-md">
          <div
            className={cn("leading-relaxed [&_p]:mb-2 [&_img]:max-w-full [&_img]:h-auto text-black mt-2 first-letter:capitalize",
              `${isReadOnly ? "text-muted/50" : ""} ${isReadOnly && isCorrect !== undefined && (isCorrect ? "text-green-500" : "text-red-500")}`
            )}
            dangerouslySetInnerHTML={{
              __html: fixImageStyles(question.text),
            }}
          />
        </div>
      </div>

      <div className="my-8">
      {renderAnswerInput()}
      </div>

      {!isReadOnly && question.answer_hint && (
        <div className="flex flex-col gap-2">
          <Button
            variant="ghostwarning"
            size="sm"
            className="w-fit"
            onClick={() => setShowHint(!showHint)}
          >
            <Lightbulb className="mr-2 h-4 w-4" /> {showHint ? "Hide hint" : "Show hint"}
          </Button>

          {showHint && (
            <div className="p-3 rounded-lg border bg-amber-50 text-amber-800 text-sm">
              {question.answer_hint}
            </div>
          )}

        </div>
      )}

      {isReadOnly && showAnswers && isCorrect !== undefined &&
        <div className="mb-4 my">
          <span className={`text-sm font-semibold ${isCorrect ? "text-green-500" : "text-red-500"}`} >
            {isCorrect ?
              <span className="flex items-center">
                <Check className="mr-2 h-4 w-4" /> Correct
              </span> :
              <span className="flex items-center">
                <X className="mr-2 h-4 w-4" /> Incorrect:
                {correctAnswer !== null &&
                  correctAnswer !== undefined &&
                  correctAnswer !== "" && (
                    <span className="text-sm text-muted-foreground ms-1">
                      Correct answer:{" "}
                      <span>
                        {(Array.isArray(correctAnswer)
                          ? correctAnswer
                          : [correctAnswer]
                        )
                          .filter((ans) => ans !== null && ans !== "")
                          .map((ans, i) => (
                            <span
                              key={i}
                              className="px-1 py-0.5 font-extrabold"
                            >
                              {typeof ans === "boolean"
                                ? ans
                                  ? "True"
                                  : "False"
                                : (question.answer_type === "multiple_choice" ? question?.options?.find((opt: QuizOption) => opt.id === ans)?.text: ans)}
                            </span>
                          ))}
                      </span>
                    </span>
                  )}
              </span>
            }
          </span>
        </div>
      }

      {isReadOnly && showAnswers && question.answer_explanation && (
        <div
          className="mt-0 rounded-lg border border-green-200 bg-green-50 p-4 text-sm
             dark:border-green-900/40 dark:bg-green-950/30"
        >
          <div className="flex items-center gap-2 mb-2 text-green-700 dark:text-green-400">
            <span className="font-semibold">Answer explanation</span>
          </div>

          <div
            className="leading-relaxed [&_p]:mb-2 [&_strong]:text-green-700 dark:[&_strong]:text-green-400"
            dangerouslySetInnerHTML={{ __html: question.answer_explanation }}
          />
        </div>
      )}
    </div>
    <div className="flex items-center justify-between border-t pt-4">

      {<div className="flex gap-2">
        <Button
          variant={isFlagged ? "error" : "outlineerror"}
          size="sm"
          onClick={onToggleFlag}
          disabled={isReadOnly}
        >
          <Flag className="mr-2 h-4 w-4" />
          {isFlagged ? "Unflag" : "Flag"}
        </Button>

        <Button
          variant="outline"
          size="sm"
          disabled={isReadOnly}
          onClick={() => {
            setValue("")
            onClearAnswer()
          }}
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Clear
        </Button>
      </div>}

      <Button onClick={onSaveAndNext} disabled={isLastQuestion}>
        Next
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>

    </div>

  </div>

  )
}
