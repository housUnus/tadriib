"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Search, Clock, TrendingUp, ShoppingCart, Heart, Bell, Globe, X } from "lucide-react"
import { useDebounce } from "use-debounce"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

const SUGGESTIONS = [
  { id: 1, text: "React - The Complete Guide", category: "Course", students: "312K" },
  { id: 2, text: "React Hooks in Depth", category: "Course", students: "98K" },
  { id: 3, text: "React Native for Beginners", category: "Course", students: "145K" },
  { id: 4, text: "React Testing with Jest", category: "Course", students: "67K" },
  { id: 5, text: "React and TypeScript", category: "Course", students: "203K" },
  { id: 6, text: "Redux Toolkit Masterclass", category: "Course", students: "89K" },
  { id: 7, text: "Next.js Full Stack Development", category: "Course", students: "178K" },
  { id: 8, text: "JavaScript Advanced Concepts", category: "Course", students: "256K" },
  { id: 9, text: "Node.js REST API Design", category: "Course", students: "134K" },
  { id: 10, text: "Python for Data Science", category: "Course", students: "421K" },
]

const TRENDING = ["React", "Python", "JavaScript", "Web Development", "Machine Learning", "AWS"]

const RECENT = ["react hooks tutorial", "typescript generics", "next.js app router"]

export default function DesktopSearch() {
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const [debouncedQuery] = useDebounce(query, 300)
  const router = useRouter()

  const filtered: any[] = []

  const handleSelect = (value: string) => {
    setQuery(value)
    setOpen(false)
  }

  useEffect(() => {
    if (query.length > 0) {
      setOpen(true)
    }
  }, [query])

  return (

    <div className="hidden md:flex md:flex-1 md:justify-center md:px-4">
      <div className="relative w-full max-w-md">
        <Popover open={false} onOpenChange={setOpen}>
          {/* Change open to open to manage showing suggestions */}
          <PopoverTrigger asChild>
            <div className="relative flex-1">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  if (!query.trim()) return
                  router.push(`/courses?search=${encodeURIComponent(query.trim())}`)
                  setOpen(false)
                }}
              >
                <div className="flex items-center h-11 rounded-full border bg-muted">
                  <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    value={query}
                    onChange={(e: any) => {
                      setQuery(e.target.value)
                      setOpen(true)
                    }}
                    placeholder="Search for anything"
                    type="text"
                    name="search"
                    className="w-full pl-8 flex-1 bg-transparent px-4 outline-none text-sm"
                  />
                </div>
              </form>
            </div>
          </PopoverTrigger>

          <PopoverContent
            className="w-(--radix-popover-trigger-width) p-0"
            align="start"
            sideOffset={4}
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <Command shouldFilter={false}>
              <CommandList>
                {debouncedQuery.length > 0 ? (
                  <>
                    {filtered.length === 0 ? (
                      <CommandEmpty>No results found.</CommandEmpty>
                    ) : (
                      <CommandGroup>
                        {filtered?.map((item) => (
                          <CommandItem
                            key={item.id}
                            value={item.text}
                            onSelect={() => handleSelect(item.text)}
                            className="flex items-center justify-between gap-3 py-2.5"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <Search className="h-4 w-4 text-muted-foreground shrink-0" />
                              <span className="text-sm truncate">{item.text}</span>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-xs text-muted-foreground">{item.students}</span>
                              <Badge variant="secondary" className="text-[10px] px-1.5 py-0 font-normal">
                                {item.category}
                              </Badge>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    )}
                  </>
                ) : (
                  <>
                    {/* Recent */}
                    <CommandGroup heading="Recent searches">
                      {RECENT.map((term) => (
                        <CommandItem
                          key={term}
                          value={term}
                          onSelect={() => handleSelect(term)}
                        >
                          <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="text-sm">{term}</span>
                        </CommandItem>
                      ))}
                    </CommandGroup>

                    <CommandSeparator />

                    {/* Trending */}
                    <CommandGroup heading="Trending searches">
                      <div className="flex flex-wrap gap-1.5 px-2 py-2">
                        {TRENDING.map((term) => (
                          <button
                            key={term}
                            type="button"
                            onClick={() => handleSelect(term)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border bg-secondary/60 hover:bg-secondary transition-colors"
                          >
                            <TrendingUp className="h-3 w-3" />
                            {term}
                          </button>
                        ))}
                      </div>
                    </CommandGroup>
                  </>
                )}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

      </div>
    </div>

  )
}
