"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import {
  BookOpen,
  HelpCircle,
  Video,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Sparkles,
  CheckCircle2,
} from "lucide-react"
import { cn } from "@/lib/utils/utils"
import { useCourseWizardStore } from "@/stores/course-wizard"
import type { CourseType, CourseCategory, CourseWizardData } from "@/types/course"
import { useClientFetch } from "@/hooks/auth/use-client-fetch"
import { useQuery } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { RHFForm } from "@/components/common/forms/RHFForm"
import InputField from "@/components/common/forms/generic/InputField"
import Select2Field from "@/components/common/forms/generic/SelectField"
import CustomField from "@/components/common/forms/generic/CustomField"

const courseTypes: { value: CourseType; label: string; description: string; icon: React.ElementType }[] = [
  {
    value: "course",
    label: "Course",
    description: "A structured learning experience with videos, articles, and resources",
    icon: BookOpen,
  },
  {
    value: "quiz",
    label: "Practice Test",
    description: "A quiz or practice test to assess knowledge",
    icon: HelpCircle,
  },
  {
    value: "webinar",
    label: "Live Session",
    description: "A live interactive session or webinar with students",
    icon: Video,
  },
]

const steps = [
  { id: 1, title: "Course Type", description: "What kind of content will you create?" },
  { id: 2, title: "Course Title", description: "Give your course a compelling title" },
  { id: 3, title: "Category", description: "Help students find your course" },
]

export function CourseWizard() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    step,
    setStep,
    submitWizard,
  } = useCourseWizardStore()

  const { data } = useQuery({
    queryKey: ["nested_categories"],
    queryFn: async () => client.get("/categories/as_nested").then((res: any) => res?.data?.results)
  });
  const categories = data || [] as CourseCategory[]

  const { data: languages } = useQuery({
    queryKey: ["supported_languages"],
    queryFn: async () => client.get("/courses/supported_languages").then((res: any) => res?.data)
  });

  const form = useForm({
    defaultValues: {
      type: "course",
      title: "",
      level: "",
      category: "",
      sub_category: "",
      language: "ar",
    },
  });

  const { watch, handleSubmit } = form
  const watchedCategory = watch("category")
  const title = watch("title")
  const type = watch("type")

  const currentCategory : CourseCategory | undefined = categories?.find((c: CourseCategory) => c.id === watchedCategory)
  const client = useClientFetch()

  const canProceed = () => {
    switch (step) {
      case 1: return !!type
      case 2: return title.trim().length >= 5
      case 3: return !!watchedCategory
      default: return false
    }
  }

  const onSubmit = async (data: any) => {
    setIsSubmitting(true)

    const courseId = await submitWizard(client, data)

    setIsSubmitting(false)

    if (courseId) {
      router.push(`/instructor/create-course/${courseId}`)
    }
  }

  const handleNext = handleSubmit(async (data: any) => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      await onSubmit(data)
    }
  })

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/30 flex flex-col">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="font-semibold">Create New Course</span>
          </div>
          <div className="flex items-center gap-2">
            {steps.map((s, i) => (
              <div key={s.id} className="flex items-center">
                <div
                  className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                    step > s.id
                      ? "bg-primary text-primary-foreground"
                      : step === s.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                  )}
                >
                  {step > s.id ? <CheckCircle2 className="h-4 w-4" /> : s.id}
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={cn(
                      "w-12 h-0.5 mx-1",
                      step > s.id ? "bg-primary" : "bg-muted"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <RHFForm form={form} className="mt-2" >
        <main className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl shadow-lg">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl">{steps[step - 1].title}</CardTitle>
              <CardDescription className="text-base">
                {steps[step - 1].description}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {/* Step 1: Course Type */}
              {step === 1 && (
                <CustomField
                  name={`type`}
                  Component={({ target, value, onChange }) => (
                    <RadioGroup
                      value={value}
                      onValueChange={onChange}
                      className="grid gap-4"
                    >
                      {courseTypes.map((courseType) => {
                        const Icon = courseType.icon
                        return (
                          <label
                            key={courseType.value}
                            className={cn(
                              "flex items-start gap-4 p-4 border rounded-xl cursor-pointer transition-all",
                              value === courseType.value
                                ? "border-primary bg-primary/5 ring-1 ring-primary"
                                : "border-border hover:border-primary/50 hover:bg-muted/50"
                            )}
                          >
                            <RadioGroupItem value={courseType.value} className="mt-1" />
                            <div
                              className={cn(
                                "h-10 w-10 rounded-lg flex items-center justify-center shrink-0",
                                value === courseType.value
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted"
                              )}
                            >
                              <Icon className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{courseType.label}</div>
                              <div className="text-sm text-muted-foreground">
                                {courseType.description}
                              </div>
                            </div>
                          </label>
                        )
                      })}
                    </RadioGroup>
                  )}
                />

              )}

              {/* Step 2: Title */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <InputField
                      name="title"
                      type="text"
                      placeholder="e.g., Complete Web Development Bootcamp"
                      label="Course Title"
                      autoFocus
                      helperText="A good title is specific, descriptive, and includes keywords students might search for."
                    />
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                    <p className="text-sm font-medium">Tips for a great title:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                        Include the main topic or skill students will learn
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                        Add the year if the content is time-sensitive
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                        Keep it under 60 characters for best display
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Step 3: Category */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Select2Field
                      name="language"
                      label="Language"
                      placeholder="Select a language"
                      simpleValue
                      options={(languages as { value: string; label: string }[])?.map((lang: { value: string; label: string }) => ({
                        value: lang.value,
                        label: lang.label,
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Select2Field
                      name="category"
                      label="Category"
                      placeholder="Select a category"
                      simpleValue
                      options={categories.map((cat: CourseCategory) => ({
                        value: cat.id,
                        label: cat.name,
                      }))}
                    />
                  </div>

                  {currentCategory && currentCategory?.children.length > 1 && (
                    <div className="space-y-2">
                      <Select2Field
                        name="subcategory"
                        label="Subcategory (Optional)"
                        placeholder="Select a subcategory"
                        simpleValue
                        options={currentCategory.children.map((sub: CourseCategory) => ({
                          value: sub.id,
                          label: sub.name,
                        }))}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t">
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  disabled={step === 1}
                  className="gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!canProceed() || isSubmitting}
                  className="gap-2 min-w-[140px]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : step === 3 ? (
                    <>
                      Create Course
                      <Sparkles className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </RHFForm>

    </div >
  )
}
