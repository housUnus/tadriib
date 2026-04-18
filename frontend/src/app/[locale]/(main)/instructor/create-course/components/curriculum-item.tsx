"use client"

import { useState } from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Play,
  FileText,
  HelpCircle,
  CheckCircle2,
  Circle,
  GripVertical,
  Pencil,
  Trash2,
  Plus,
  X,
  ChevronDown,
  ChevronRight,
  Paperclip,
  Video,
  Calendar,
} from "lucide-react"
import { cn } from "@/lib/utils/utils"
import { AttachmentsManager } from "./attachments-manager"
import { useCourseStore } from "@/stores/course"
import {
  LectureEditor,
  QuizEditor,
  WebinarEditor,
  ContentTypePicker,
} from "./curriculum"
import type { CurriculumItem, ContentType, Attachment } from "@/types/course"
import { useClientFetch } from "@/hooks/auth/use-client-fetch"
import { Field, FieldLabel } from "@/components/ui/field"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface CurriculumItemProps {
  item: CurriculumItem
  index: number
  sectionId: string
  onUpdate: (item: Partial<CurriculumItem>) => void
  onDelete: () => void
  onAddAttachment: (client: any, sectionId: string, itemId: string, attachment: Attachment) => void
  onDeleteAttachment: (client: any, sectionId: string, itemId: string, attachmentId: string) => void
}

export function CurriculumItemComponent({
  item,
  index,
  sectionId,
  onUpdate,
  onDelete,
  onAddAttachment,
  onDeleteAttachment
}: CurriculumItemProps) {
  console.log("🚀 ~ CurriculumItemComponent ~ sectionId:", sectionId)
  const [isEditing, setIsEditing] = useState(false)
  const [isExpanded, setIsExpanded] = useState(item.is_expanded || false)
  const [showAttachments, setShowAttachments] = useState((item.attachments?.length || 0) > 0)
  const [title, setTitle] = useState(item.title)
  const client = useClientFetch()

  const { addQuestion, updateQuestion, deleteQuestion } = useCourseStore()

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const handleSave = () => {
    onUpdate({ title })
    setIsEditing(false)
  }


  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const previewUrl = URL.createObjectURL(file)
      onUpdate({
        content: {
          file: file,
          preview: previewUrl,
          url: undefined,
        },
        asFormData: true,
        isComplete: true,
      })
    }
  }

  const handleVideoUrlChange = (videoUrl: string) => {
    onUpdate({
      content: {
        url: videoUrl,
        preview: undefined,
        file: null,
      },
      isComplete: !!videoUrl
    })
  }

  const handleArticleChange = (articleContent: string) => {
    onUpdate({ content: { text: articleContent }, isComplete: !!articleContent })
  }

  const handleAddQuestion = () => {
    addQuestion(client, sectionId, item.id)
    setIsExpanded(true)
  }

  const handleUpdateQuestion = (questionId: string, data: Record<string, unknown>) => {
    updateQuestion(client, sectionId, item.id, questionId, data)
  }

  const handleDeleteQuestion = (questionId: string) => {
    deleteQuestion(client, sectionId, item.id, questionId)
  }

  const Icon = item.type === "quiz" ? HelpCircle : item.type === "conference" ? Video : item.type === "article" ? FileText : Play
  const typeLabel = item.type === "quiz" ? "Quiz" : item.type === "conference" ? "Conference" : item.type === "article" ? "Article" : "Video"
  const hasContent = item.type === "quiz"
    ? (item.content?.questions?.length || 0) > 0
    : item.type === "conference"
      ? !!item.content?.webinarSchedule?.date || !!item.content?.webinarDescription
      : !!item.content?.url || !!item.content?.file || !!item.content?.text

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn("group relative", isDragging && "opacity-50")}
    >
      <div
        className={cn(
          "flex items-center gap-3 p-4 bg-background border rounded-lg transition-all",
          "hover:border-primary/30 hover:shadow-sm",
          (isExpanded) && "border-primary/50 rounded-b-none"
        )}
      >
        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-muted-foreground/50 hover:text-muted-foreground"
        >
          <GripVertical className="h-5 w-5" />
        </div>

        {/* Expand Toggle */}
        {(hasContent || showAttachments || item.type) && (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 shrink-0"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        )}

        {/* Completion Status */}
        {item.isComplete ? (
          <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
        ) : (
          <Circle className="h-5 w-5 text-muted-foreground/40 shrink-0" />
        )}

        {/* Type Badge */}
        <Badge variant="secondary" className="shrink-0 gap-1.5 font-normal">
          <Icon className="h-3.5 w-3.5" />
          {typeLabel} {index + 1}
        </Badge>

        {/* Title */}
        {isEditing ? (
          <div className="flex-1 flex items-center gap-2">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-8"
              placeholder="Enter title..."
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
            className="flex-1 text-sm cursor-pointer hover:text-primary"
            onClick={() => setIsEditing(true)}
          >
            {item.title || "Untitled"}
          </span>
        )}

        {/* Content Type Indicator */}
        {item.type && !isEditing && (
          <Badge variant="outline" className="text-xs font-normal capitalize">
            {item.type}
          </Badge>
        )}

        {/* Attachment Count */}
        {(item.attachments?.length || 0) > 0 && (
          <Badge variant="outline" className="text-xs font-normal gap-1">
            <Paperclip className="h-3 w-3" />
            {item.attachments?.length}
          </Badge>
        )}

        {/* Question Count */}
        {item.type === "quiz" && (item.content?.questions?.length || 0) > 0 && (
          <Badge variant="outline" className="text-xs font-normal">
            {item.content?.questions?.length} question(s)
          </Badge>
        )}

        {/* Actions */}
        {!isEditing && (
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {item.type === "quiz" && (
              <Button
                size="sm"
                variant="outline"
                className="h-8 gap-1.5 text-primary border-primary/50"
                onClick={handleAddQuestion}
              >
                <Plus className="h-3.5 w-3.5" />
                Questions
              </Button>
            )}
            {item.type === "conference" && (
              <Button
                size="sm"
                variant="outline"
                className="h-8 gap-1.5 text-violet-600 border-violet-300"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <Calendar className="h-3.5 w-3.5" />
                {isExpanded ? "Hide Details" : "Schedule"}
              </Button>
            )}
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

      {/* Expanded Content Editor */}
      {isExpanded && (
        <div className="p-4 bg-muted/20 border border-t-0 rounded-b-lg space-y-6">
          <Field orientation="horizontal">
            <div className="flex items-center gap-2">
              <Checkbox
                id="is_preview"
                name="is_preview"
                checked={item.is_preview}
                onCheckedChange={(checked) => onUpdate({ is_preview: !!checked })}
              />
              <FieldLabel htmlFor="is_preview" className="cursor-pointer mb-0">
                Can be previewed
              </FieldLabel>
            </div>
          </Field>

          {(item.type === "article" || item.type === "video") && (
            <LectureEditor
              item={item}
              onVideoUrlChange={handleVideoUrlChange}
              onVideoFileUpload={handleVideoUpload}
              onArticleChange={handleArticleChange}
              onUpdate={onUpdate}
            />
          )}

          {item.type === "quiz" && (
            <QuizEditor
              sectionId={sectionId}
              itemId={item.id}
              content={item.content || {}}
              onUpdateQuestion={handleUpdateQuestion}
              onDeleteQuestion={handleDeleteQuestion}
            />
          )}

          {item.type === "conference" && (
            <WebinarEditor
              schedule={item.content?.webinarSchedule}
              description={item.content?.webinarDescription}
              onScheduleChange={(schedule) => onUpdate({ content: { webinarSchedule: schedule } })}
              onDescriptionChange={(desc) => onUpdate({ content: { webinarDescription: desc } })}
            />
          )}

          {/* Attachments Section */}
          <Collapsible open={showAttachments} onOpenChange={setShowAttachments}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-muted-foreground hover:text-foreground w-full justify-start border-t"
              >
                <Paperclip className="h-4 w-4" />
                Attachments
                {(item.attachments?.length || 0) > 0 && (
                  <Badge variant="secondary" className="ml-auto">
                    {item.attachments?.length}
                  </Badge>
                )}
                <ChevronDown className={cn("h-4 w-4 ml-auto transition-transform", showAttachments && "rotate-180")} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-4">
              <AttachmentsManager
                attachments={item.attachments || []}
                onCreate={(attachment) => onAddAttachment(client, sectionId, item.id, attachment)}
                onDelete={(id) => onDeleteAttachment(client, sectionId, item.id, id)}
              />
            </CollapsibleContent>
          </Collapsible>
        </div>
      )}
    </div>
  )
}
