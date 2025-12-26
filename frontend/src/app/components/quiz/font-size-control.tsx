"use client"

import { Button } from "@/components/ui/button"
import { Minus, Plus, Type } from "lucide-react"

interface FontSizeControlProps {
  fontSize: number
  onFontSizeChange: (size: number) => void
  minSize?: number
  maxSize?: number
}

export function FontSizeControl({ fontSize, onFontSizeChange, minSize = 12, maxSize = 24 }: FontSizeControlProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border bg-muted/30 p-2">
      <div className="flex items-center gap-2">
        <Type className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Font Size</span>
      </div>
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={() => onFontSizeChange(Math.max(minSize, fontSize - 2))}
          disabled={fontSize <= minSize}
        >
          <Minus className="h-3 w-3" />
        </Button>
        <span className="w-8 text-center text-sm font-medium">{fontSize}</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={() => onFontSizeChange(Math.min(maxSize, fontSize + 2))}
          disabled={fontSize >= maxSize}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
    </div>
  )
}
