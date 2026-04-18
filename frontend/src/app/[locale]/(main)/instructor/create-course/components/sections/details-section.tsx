"use client"

import { CourseMetadata, useCourseStore } from "@/stores/course"
import { useClientFetch } from "@/hooks/auth/use-client-fetch"
import { CourseCategory, CourseLearningOutcomes, CourseRequirements } from "@/types/course"
import { Separator } from "@/components/ui/separator"
import { useQuery } from "@tanstack/react-query"
import Select2Field from "@/components/common/forms/generic/SelectField"
import { useForm, useWatch } from "react-hook-form"
import { RHFForm } from "@/components/common/forms/RHFForm"
import InputField from "@/components/common/forms/generic/InputField"
import { useUpdateEffect } from "@/hooks/use-update-effect"
import { description } from "@/app/components/shadcn-charts/area/Axes"
import RichTextField from "@/components/common/forms/generic/RichTextField"
import FileField from "@/components/common/forms/generic/FileField"

export function SectionDetails() {
  const { course, updateCourseMetadata } = useCourseStore()
  const client = useClientFetch()


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
      title: course.title || "",
      description: course.description || "",
      level: course.level || "",
      category: course.category || "",
      sub_category: course.sub_category || "",
      language: course.language || "ar",
      poster: course.poster || null,
    },
  });

  const values = useWatch({ control: form.control });
  const currentCategory: CourseCategory | undefined = categories?.find((c: CourseCategory) => c.id === values.category)

  useUpdateEffect(() => {
    updateCourseMetadata(client, (values as Partial<CourseMetadata>))
  }, [values])


  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Course Goals</h2>
        <p className="text-muted-foreground text-sm mt-1">
          Define what students will learn and who should take this course
        </p>
      </div>
 
      <Separator />
      <RHFForm form={form} className="mt-2" >
        <div className="space-y-6">
          <div className="space-y-2">
            <InputField
              name="title"
              type="text"
              placeholder="e.g., Complete Web Development Bootcamp"
              label="Course Title"
              helperText="A good title is specific, descriptive, and includes keywords students might search for."
            />
          </div>
          <div className="space-y-2">
            <RichTextField
              name="description"
              label="Description"
              placeholder="Describe your course in a few sentences"
              helperText="A good description is specific, descriptive, and includes keywords students might search for."
            />
          </div>
          <div className="space-y-2">
            <Select2Field
              name="language"
              label="Language"
              placeholder="Select a language"
              menuPlacement="top"
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
              menuPlacement="top"
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
                name="sub_category"
                label="Subcategory (Optional)"
                menuPlacement="top"
                placeholder="Select a subcategory"
                simpleValue
                options={currentCategory.children.map((sub: CourseCategory) => ({
                  value: sub.id,
                  label: sub.name,
                }))}
              />
            </div>
          )}

          <FileField name="poster" label="Course Poster" accept={{"image/*": []}} />
        </div>
      </RHFForm>
    </div>
  )
}
