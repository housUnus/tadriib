"use client"

import { useRef, useCallback, useEffect, useState } from "react"
import { cn } from "@/lib/utils/utils"
import { Textarea } from "@/components/ui/textarea"
import { useDebounce } from "use-debounce"


interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function RichTextEditor({ value, onChange, placeholder, className }: RichTextEditorProps) {
  const quillRef = useRef<any>(null)

  
  const [innerValue, setInnerValue] = useState("")

  const [debouncedValue] = useDebounce(innerValue, 500)

  useEffect(() => {
    onChange(debouncedValue)
  }, [debouncedValue])

  return (
    <div className={cn("rich-text-editor", className)}>
      <Textarea
        ref={quillRef}
        value={innerValue}
        onChange={(e) => setInnerValue(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  )
}
