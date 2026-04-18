"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Plus, X, Wrench, GraduationCap } from "lucide-react"
import { useCourseStore } from "@/stores/course"
import { useClientFetch } from "@/hooks/auth/use-client-fetch"

const skillLevels = [
  { value: "beginner", label: "Beginner", description: "No prior experience required" },
  { value: "intermediate", label: "Intermediate", description: "Some foundational knowledge needed" },
  { value: "advanced", label: "Advanced", description: "Significant experience required" },
  { value: "all", label: "All Levels", description: "Content for everyone" },
] as const

export function RequirementsSection() {
  const { course, updateCourseMetadata } = useCourseStore()
  const [newRequirement, setNewRequirement] = useState("")
  const [newTool, setNewTool] = useState("")
  const client = useClientFetch()

  const requirements = course.requirements

  const updateRequirements = (field: string, value: unknown) => {
    updateCourseMetadata(client,
      {
        requirements: { ...requirements, [field]: value },
      })
  }

  const addRequirement = () => {
    if (newRequirement.trim()) {
      updateRequirements("requirements", [...requirements.requirements, newRequirement.trim()])
      setNewRequirement("")
    }
  }

  const removeRequirement = (index: number) => {
    updateRequirements("requirements", requirements.requirements.filter((_, i) => i !== index))
  }


  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Requirements</h2>
        <p className="text-muted-foreground text-sm mt-1">
          Specify what students need to take your course
        </p>
      </div>

      {/* Skill Level */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">Skill Level</CardTitle>
          </div>
          <CardDescription>What experience level is this course designed for?</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={requirements.skillLevel}
            onValueChange={(value) => updateRequirements("skillLevel", value)}
            className="grid grid-cols-2 gap-3"
          >
            {skillLevels.map((level) => (
              <label
                key={level.value}
                className={`flex items-start gap-3 p-3 border rounded-lg cursor-pointer transition-all ${requirements.skillLevel === level.value
                    ? "border-primary bg-primary/5"
                    : "hover:border-primary/50"
                  }`}
              >
                <RadioGroupItem value={level.value} className="mt-0.5" />
                <div>
                  <div className="font-medium text-sm">{level.label}</div>
                  <div className="text-xs text-muted-foreground">{level.description}</div>
                </div>
              </label>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Knowledge Requirements */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Knowledge Requirements</CardTitle>
          <CardDescription>What should students know before starting?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {requirements.map((req, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input value={req} readOnly className="flex-1" />
              <Button variant="ghost" size="icon" onClick={() => removeRequirement(index)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <Input
              value={newRequirement}
              onChange={(e) => setNewRequirement(e.target.value)}
              placeholder="e.g., Basic understanding of HTML and CSS"
              onKeyDown={(e) => e.key === "Enter" && addRequirement()}
              className="flex-1"
            />
            <Button variant="outline" size="icon" onClick={addRequirement}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tools & Software */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Wrench className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">Tools & Software</CardTitle>
          </div>
          <CardDescription>What tools or software will students need?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {requirements.tools.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {requirements.tools.map((tool, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-full text-sm"
                >
                  <span>{tool}</span>
                  <button
                    onClick={() => removeTool(index)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="flex items-center gap-2">
            <Input
              value={newTool}
              onChange={(e) => setNewTool(e.target.value)}
              placeholder="e.g., VS Code, Node.js, Figma"
              onKeyDown={(e) => e.key === "Enter" && addTool()}
              className="flex-1"
            />
            <Button variant="outline" size="icon" onClick={addTool}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
