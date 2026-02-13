"use client"

import { useState, useMemo, useEffect } from "react"
import debounce from "lodash/debounce"

export default function TableSearch({ dt }: { dt: any }) {
  // Local state for immediate typing (no lag)
  const [value, setValue] = useState(dt.globalFilter ?? "")

  // Keep local state in sync if globalFilter changes externally
  useEffect(() => {
    setValue(dt.globalFilter ?? "")
  }, [dt.globalFilter])

  // Debounced function (stable)
  const debouncedSearch = useMemo(
    () =>
      debounce((val: string) => {
        dt.setPagination((p: any) => ({ ...p, pageIndex: 0 }))
        dt.setGlobalFilter(val)
      }, 500),
    [dt]
  )

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel()
    }
  }, [debouncedSearch])

  return (
    <input
      placeholder="Search..."
      value={value}
      onChange={(e) => {
        const val = e.target.value
        setValue(val)          // instant UI update
        debouncedSearch(val)   // delayed backend/filter update
      }}
      className="border rounded-md px-3 py-2 w-full"
    />
  )
}
