import { Input } from "@/components/ui/input"
import { useState, useEffect, useRef } from "react"

type DebouncedInputProps = {
  component?: any
  value?: any
  onChange: (value: any) => void
  delay?: number
  [key: string]: any
}

export function DebouncedInput({
  component: Component = Input,
  value = "",
  onChange,
  delay = 500,
  ...props
}: DebouncedInputProps) {
  const [innerValue, setInnerValue] = useState(value)
  const lastValueRef = useRef(value)

  useEffect(() => {
    setInnerValue(value)
  }, [value])

  useEffect(() => {
    const handler = setTimeout(() => {
      if (lastValueRef.current !== innerValue) {
        lastValueRef.current = innerValue
        onChange(innerValue)
      }
    }, delay)

    return () => clearTimeout(handler)
  }, [innerValue, delay, onChange])

  return (
    <Component
      {...props}
      value={innerValue}
      onChange={(e: any) =>
        setInnerValue(e?.target ? e.target.value : e)
      }
    />
  )
}