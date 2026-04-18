"use client"

import { useRef, useCallback, useEffect, useState } from "react"
import { cn } from "@/lib/utils/utils"
import { Textarea } from "@/components/ui/textarea"
import { useDebounce } from "use-debounce"
import RichText from "@/components/common/forms/generic/RichText"


interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function RichTextEditor({ value, onChange, placeholder, className }: RichTextEditorProps) {
  const quillRef = useRef<any>(null)

  const [innerValue, setInnerValue] = useState(value)
  
  const [debouncedValue] = useDebounce(innerValue, 500)

  useEffect(() => {
    if(debouncedValue !== value) {
      onChange(debouncedValue)
    }
  }, [debouncedValue])

  return (
    <div className={cn("rich-text-editor", className)}>
      
      <RichText
        value={innerValue}
        onChange={(value) => setInnerValue(value)}
        placeholder={placeholder}
      />
    </div>
  )
}
