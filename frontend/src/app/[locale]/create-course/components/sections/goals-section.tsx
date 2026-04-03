"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Plus, X, GripVertical, Lightbulb } from "lucide-react"
import { useCourseStore } from "@/stores/course"
import { useClientFetch } from "@/hooks/auth/use-client-fetch"

interface ListEditorProps {
  title: string
  description: string
  placeholder: string
  items: string[]
  onChange: (items: string[]) => void
  minItems?: number
  maxItems?: number
}

function ListEditor({ title, description, placeholder, items, onChange, minItems = 1, maxItems = 10 }: ListEditorProps) {
  const [newItem, setNewItem] = useState("")

  const addItem = () => {
    if (newItem.trim() && items.length < maxItems) {
      onChange([...items, newItem.trim()])
      setNewItem("")
    }
  }

  const removeItem = (index: number) => {
    if (items.length > minItems) {
      onChange(items.filter((_, i) => i !== index))
    }
  }

  const updateItem = (index: number, value: string) => {
    const updated = [...items]
    updated[index] = value
    onChange(updated)
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <GripVertical className="h-4 w-4 text-muted-foreground shrink-0 cursor-grab" />
            <Input
              value={item}
              onChange={(e) => updateItem(index, e.target.value)}
              placeholder={placeholder}
              className="flex-1"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeItem(index)}
              disabled={items.length <= minItems}
              className="shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}

        {items.length < maxItems && (
          <div className="flex items-center gap-2">
            <div className="w-4" />
            <Input
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder={`Add ${placeholder.toLowerCase()}`}
              onKeyDown={(e) => e.key === "Enter" && addItem()}
              className="flex-1"
            />
            <Button variant="outline" size="icon" onClick={addItem} className="shrink-0">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        )}

        <p className="text-xs text-muted-foreground">
          {items.length}/{maxItems} items
        </p>
      </CardContent>
    </Card>
  )
}

export function GoalsSection() {
  const { course, updateCourseMetadata } = useCourseStore()
  const client = useClientFetch()

  const goals = course.goals || {
    learningObjectives: [""],
    prerequisites: [""],
    targetAudience: [""],
  }

  const updateGoals = (field: keyof typeof goals, items: string[]) => {
    updateCourseMetadata(client,
      {
        goals: { ...goals, [field]: items },
      })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Course Goals</h2>
        <p className="text-muted-foreground text-sm mt-1">
          Define what students will learn and who should take this course
        </p>
      </div>

      <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4 flex gap-3">
        <Lightbulb className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="font-medium text-amber-900 dark:text-amber-100">Why goals matter</p>
          <p className="text-amber-800 dark:text-amber-200 mt-1">
            Clear learning objectives help students understand what they&apos;ll gain from your course
            and help your course appear in relevant searches.
          </p>
        </div>
      </div>

      <ListEditor
        title="Learning Objectives"
        description="What will students be able to do after completing your course?"
        placeholder="Students will be able to..."
        items={goals.learningObjectives}
        onChange={(items) => updateGoals("learningObjectives", items)}
        minItems={1}
        maxItems={8}
      />

      <ListEditor
        title="Target Audience"
        description="Who is this course for?"
        placeholder="This course is for..."
        items={goals.targetAudience}
        onChange={(items) => updateGoals("targetAudience", items)}
        minItems={1}
        maxItems={6}
      />

      <ListEditor
        title="Prerequisites"
        description="What should students know or have before starting?"
        placeholder="Basic knowledge of..."
        items={goals.prerequisites}
        onChange={(items) => updateGoals("prerequisites", items)}
        minItems={0}
        maxItems={6}
      />
    </div>
  )
}
