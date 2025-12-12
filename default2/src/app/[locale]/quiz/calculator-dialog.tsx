"use client"

import { useState, useCallback } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Calculator, Delete } from "lucide-react"

interface CalculatorDialogProps {
  variant?: "button" | "icon"
}

export function CalculatorDialog({ variant = "button" }: CalculatorDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [expression, setExpression] = useState("0")
  const [lastResult, setLastResult] = useState<string | null>(null)

  const clear = useCallback(() => {
    setExpression("0")
    setLastResult(null)
  }, [])

  const appendToExpression = useCallback((value: string) => {
    setExpression((prev) => {
      // If starting fresh after result or from zero
      if (prev === "0" && ![".", "+", "-", "×", "÷", ")"].includes(value)) {
        return value
      }
      // Prevent multiple operators in a row
      const lastChar = prev.slice(-1)
      const isOperator = ["+", "-", "×", "÷"].includes(value)
      const lastIsOperator = ["+", "-", "×", "÷"].includes(lastChar)
      if (isOperator && lastIsOperator) {
        return prev.slice(0, -1) + value
      }
      // Prevent multiple decimals in current number
      if (value === ".") {
        const parts = prev.split(/[+\-×÷()]/)
        const currentNumber = parts[parts.length - 1]
        if (currentNumber.includes(".")) return prev
      }
      return prev + value
    })
  }, [])

  const backspace = useCallback(() => {
    setExpression((prev) => {
      if (prev.length === 1) return "0"
      return prev.slice(0, -1)
    })
  }, [])

  const safeEvaluate = useCallback((expr: string): number => {
    // Replace display operators with JS operators
    let sanitized = expr.replace(/×/g, "*").replace(/÷/g, "/")
    // Only allow numbers, operators, parentheses, decimal points
    if (!/^[\d+\-*/().%\s]+$/.test(sanitized)) {
      throw new Error("Invalid expression")
    }
    // Handle percentage
    sanitized = sanitized.replace(/(\d+(?:\.\d+)?)%/g, "($1/100)")
    // Evaluate using Function constructor (safer than eval)
    const result = new Function(`return (${sanitized})`)()
    return result
  }, [])

  const calculate = useCallback(() => {
    try {
      const result = safeEvaluate(expression)
      const resultStr = String(Number.parseFloat(result.toFixed(10)))
      setLastResult(expression)
      setExpression(resultStr)
    } catch {
      setExpression("Error")
    }
  }, [expression, safeEvaluate])

  const toggleSign = useCallback(() => {
    setExpression((prev) => {
      if (prev.startsWith("-")) return prev.slice(1)
      if (prev.startsWith("(-")) return prev.slice(2)
      return "(-" + prev
    })
  }, [])

  const inputPercent = useCallback(() => {
    setExpression((prev) => prev + "%")
  }, [])

  const buttons = [
    { label: "C", action: clear, className: "bg-destructive/10 text-destructive hover:bg-destructive/20" },
    { label: "(", action: () => appendToExpression("("), className: "bg-muted" },
    { label: ")", action: () => appendToExpression(")"), className: "bg-muted" },
    {
      label: "÷",
      action: () => appendToExpression("÷"),
      className: "bg-primary text-primary-foreground hover:bg-primary/90",
    },
    { label: "7", action: () => appendToExpression("7") },
    { label: "8", action: () => appendToExpression("8") },
    { label: "9", action: () => appendToExpression("9") },
    {
      label: "×",
      action: () => appendToExpression("×"),
      className: "bg-primary text-primary-foreground hover:bg-primary/90",
    },
    { label: "4", action: () => appendToExpression("4") },
    { label: "5", action: () => appendToExpression("5") },
    { label: "6", action: () => appendToExpression("6") },
    {
      label: "-",
      action: () => appendToExpression("-"),
      className: "bg-primary text-primary-foreground hover:bg-primary/90",
    },
    { label: "1", action: () => appendToExpression("1") },
    { label: "2", action: () => appendToExpression("2") },
    { label: "3", action: () => appendToExpression("3") },
    {
      label: "+",
      action: () => appendToExpression("+"),
      className: "bg-primary text-primary-foreground hover:bg-primary/90",
    },
    { label: "±", action: toggleSign, className: "bg-muted" },
    { label: "0", action: () => appendToExpression("0") },
    { label: ".", action: () => appendToExpression(".") },
    { label: "=", action: calculate, className: "bg-primary text-primary-foreground hover:bg-primary/90" },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {variant === "icon" ? (
          <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent" title="Calculator">
            <Calculator className="h-4 w-4" />
          </Button>
        ) : (
          <Button variant="outline" className="w-full justify-start bg-transparent">
            <Calculator className="mr-2 h-4 w-4" />
            Calculator
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[320px] p-4">
        <div className="space-y-3">
          {/* Display */}
          <div className="bg-muted rounded-lg p-4">
            <div className="text-right">
              {lastResult && <div className="text-xs text-muted-foreground mb-1 truncate">{lastResult} =</div>}
              <div className="text-3xl font-semibold tracking-tight truncate">{expression}</div>
            </div>
          </div>

          {/* Backspace and percent */}
          <div className="flex justify-between items-center">
            <Button variant="ghost" size="sm" onClick={inputPercent} className="h-8 px-3 text-muted-foreground">
              %
            </Button>
            <Button variant="ghost" size="sm" onClick={backspace} className="h-8 px-3 text-muted-foreground">
              <Delete className="h-4 w-4 mr-1" />
              Back
            </Button>
          </div>

          {/* Buttons grid */}
          <div className="grid grid-cols-4 gap-2">
            {buttons.map((btn) => (
              <Button
                key={btn.label}
                variant="outline"
                onClick={btn.action}
                className={`h-12 text-lg font-medium ${btn.className || "bg-background hover:bg-muted"}`}
              >
                {btn.label}
              </Button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
