"use client"

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core"
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { Button } from "@/components/ui/button"
import { Plus, Loader2 } from "lucide-react"
import { SectionComponent } from "./section"
import { useCourseStore } from "@/stores/course"
import { useClientFetch } from "@/hooks/auth/use-client-fetch"

export function CurriculumBuilder() {
  const {
    sections,
    status,
    addSection,
    updateSection,
    deleteSection,
    reorderSections,
  } = useCourseStore()
  console.log("🚀 ~ CurriculumBuilder ~ sections:", sections)

  const client = useClientFetch()

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  // Initialize course on mount
  // useEffect(() => {
  //   initCourse(client)
  // }, [initCourse])

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oldIndex = sections.findIndex((s) => s.id === active.id)
      const newIndex = sections.findIndex((s) => s.id === over.id)
      if (oldIndex !== -1 && newIndex !== -1) {
        reorderSections(client, oldIndex, newIndex)
      }
    }
  }

  const totalItems = sections.reduce((acc, s) => acc + s.items.length, 0)
  const completedItems = sections.reduce(
    (acc, s) => acc + s.items.filter((i) => i.isComplete).length,
    0
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Curriculum</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Build your course structure with sections, lectures, and quizzes
          </p>
        </div>
        <div className="flex items-center gap-3">
          {status.isSaving && (
            <span className="text-sm text-muted-foreground flex items-center gap-1.5">
              <Loader2 className="h-3 w-3 animate-spin" />
              Saving...
            </span>
          )}
          {!status.isSaving && status.lastSaved && (
            <span className="text-sm text-muted-foreground">
              Saved
            </span>
          )}
          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{completedItems}</span>/{totalItems} items complete
          </div>
        </div>
      </div>

      {/* Error display */}
      {status.error && (
        <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg">
          {status.error}
        </div>
      )}

      {/* Sections with Drag and Drop */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={sections.map((s) => s.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4">
            {sections.map((section, index) => (
              <SectionComponent
                key={section.id}
                section={section}
                index={index}
                onUpdate={(updated) => updateSection(client, section.id, updated)}
                onDelete={() => deleteSection(client, section.id)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {sections.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground mb-4">No sections yet. Add your first section to get started.</p>
        </div>
      )}

      {/* Add Section Button */}
      <Button variant="outline" className="gap-2 border-dashed w-full" onClick={() => addSection(client)}>
        <Plus className="h-4 w-4" />
        Add Section
      </Button>

      {/* Tips Card */}
      <div className="p-4 bg-muted/30 rounded-lg border border-dashed">
        <h3 className="font-medium text-sm mb-2">Tips for a great curriculum</h3>
        <ul className="text-sm text-muted-foreground space-y-1.5">
          <li>Start with an introduction section to set expectations</li>
          <li>Break content into digestible 5-15 minute lectures</li>
          <li>Add quizzes to reinforce learning</li>
          <li>End each section with a summary or action items</li>
        </ul>
      </div>
    </div>
  )
}
