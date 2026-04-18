"use client"

import { useState } from "react"
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
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ChevronDown,
  ChevronRight,
  FileText,
  GripVertical,
  HelpCircle,
  Pencil,
  Play,
  Plus,
  Trash2,
  Video,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils/utils"
import { CurriculumItemComponent } from "./curriculum-item"
import { useCourseStore } from "@/stores/course"
import type { ContentType, CurriculumItem, Section } from "@/types/course"
import { useClientFetch } from "@/hooks/auth/use-client-fetch"

interface SectionProps {
  section: Section
  index: number
  onUpdate: (section: Partial<Section>) => void
  onDelete: () => void
}

export function SectionComponent({ section, index, onUpdate, onDelete }: SectionProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(section.title)
  const client = useClientFetch()

  const { addItem, updateItem, deleteItem, reorderItems, addAttachment, removeAttachment } = useCourseStore()

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleSave = () => {
    onUpdate({ title })
    setIsEditing(false)
  }

  const toggleExpand = () => {
    onUpdate({ isExpanded: !section.isExpanded })
  }

  const handleAddItem = (type: ContentType) => {
    addItem(client, section.id, type)
  }

  const handleUpdateItem = (itemId: string, data: Partial<CurriculumItem>) => {
    updateItem(client, section.id, itemId, data)
  }

  const handleDeleteItem = (itemId: string) => {
    deleteItem(client, section.id, itemId)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oldIndex = section.items.findIndex((item) => item.id === active.id)
      const newIndex = section.items.findIndex((item) => item.id === over.id)
      reorderItems(client, section.id, oldIndex, newIndex)
    }
  }

  const completedCount = section.items.filter((item) => item.isComplete).length

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn("border rounded-xl bg-card overflow-hidden", isDragging && "opacity-50")}
    >
      {/* Section Header */}
      <div
        className={cn(
          "flex items-center gap-3 p-4 bg-muted/30",
          "border-b border-border/50"
        )}
      >
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-muted-foreground/50 hover:text-muted-foreground"
        >
          <GripVertical className="h-5 w-5" />
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0"
          onClick={toggleExpand}
        >
          {section.isExpanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>

        <div className="flex-1 flex items-center gap-3">
          <span className="text-sm font-semibold text-foreground">
            Section {index + 1}:
          </span>
          {isEditing ? (
            <div className="flex-1 flex items-center gap-2">
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="h-8 max-w-xs"
                placeholder="Enter section title..."
                autoFocus
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
              />
              <Button size="sm" variant="ghost" onClick={handleSave}>
                Save
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <span
              className="text-sm cursor-pointer hover:text-primary flex items-center gap-2"
              onClick={() => setIsEditing(true)}
            >
              <FileText className="h-4 w-4 text-muted-foreground" />
              {section.title || "Untitled Section"}
            </span>
          )}
        </div>

        {/* Section Stats */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span>
            {completedCount}/{section.items.length} items
          </span>
        </div>

        {!isEditing && (
          <div className="flex items-center gap-1">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8"
              onClick={() => setIsEditing(true)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-destructive hover:text-destructive"
              onClick={onDelete}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Section Content */}
      {section.isExpanded && (
        <div className="p-4 space-y-3">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={section.items.map((item) => item.id)}
              strategy={verticalListSortingStrategy}
            >
              {section.items.map((item, itemIndex) => (
                <CurriculumItemComponent
                  key={item.id}
                  item={item}
                  index={itemIndex}
                  sectionId={section.id}
                  onUpdate={(updated: Partial<CurriculumItem>) => handleUpdateItem(item.id, updated)}
                  onDelete={() => handleDeleteItem(item.id)}
                  onAddAttachment={addAttachment}
                  onDeleteAttachment={removeAttachment}
                />
              ))}
            </SortableContext>
          </DndContext>

          {section.items.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-6">
              No items yet. Add a lecture or quiz to get started.
            </p>
          )}

          {/* Add Curriculum Item */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 border-dashed"
              >
                <Plus className="h-4 w-4" />
                Curriculum item
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => handleAddItem("article")}>
                <FileText className="h-4 w-4 mr-2" />
                Article
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAddItem("video")}>
                <Play className="h-4 w-4 mr-2" />
                Video
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAddItem("quiz")}>
                <HelpCircle className="h-4 w-4 mr-2" />
                Quiz
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAddItem("conference")}>
                <Video className="h-4 w-4 mr-2" />
                Webinar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  )
}
