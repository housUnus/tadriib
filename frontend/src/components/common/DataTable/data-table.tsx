"use client"

import * as React from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  PaginationState,
  ColumnFiltersState,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useClientFetch } from "@/hooks/auth/use-client-fetch"

interface FetchParams {
  pageIndex: number
  pageSize: number
  globalFilter?: string
  columnFilters?: ColumnFiltersState
}

interface FetchResult<TData> {
  rows: TData[]
  pageCount?: number
  total?: number
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]

  /** Initial data (SSR or prefetched) */
  initialData?: TData[]

  /** Static data (no fetching) */
  data?: TData[]

  /** If provided will fetch using this URL */
  url?: string

  /** Custom fetcher (overrides url) */
  fetchData?: (params: FetchParams) => Promise<FetchResult<TData>>

  /** Total pages when server paginated */
  pageCount?: number

  /** Page size */
  pageSize?: number

  /** Enable card/custom rendering */
  renderRow?: (row: TData) => React.ReactNode

  /** Global filter component */
  renderGlobalFilter?: (
    value: string,
    onChange: (v: string) => void
  ) => React.ReactNode
}

export function DataTable<TData, TValue>({
  columns,
  data,
  initialData,
  url,
  fetchData,
  pageCount: controlledPageCount,
  pageSize = 10,
  renderRow,
  renderGlobalFilter,
}: DataTableProps<TData, TValue>) {
  const client = useClientFetch();
  const [rows, setRows] = React.useState<TData[]>(initialData ?? data ?? [])
  const [pageCount, setPageCount] = React.useState<number>(controlledPageCount ?? -1)

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  })

  const [globalFilter, setGlobalFilter] = React.useState("")
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

  const shouldFetch = !!url || !!fetchData

  const fetcher = React.useCallback(async () => {
    if (!shouldFetch) return

    const params: FetchParams = {
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
      globalFilter,
      columnFilters,
    }

    if (fetchData) {
      const res = await fetchData(params)
      setRows(res.rows)
      if (res.pageCount !== undefined) setPageCount(res.pageCount)
      return
    }

    if (url) {
      const query = new URLSearchParams({
        page: String(pagination.pageIndex + 1),
        page_size: String(pagination.pageSize),
        search: globalFilter || "",
      })

      const res = await client.get(`${url}?${query.toString()}`)
      const data: any = await res.data
      console.log("🚀 ~ DataTable ~ data:", res)

      // Common DRF format support
      if (Array.isArray(data)) {
        setRows(data)
      } else {
        setRows(data.results ?? data.data ?? [])
        if (data.count && pagination.pageSize) {
          setPageCount(Math.ceil(data.count / pagination.pageSize))
        }
      }
    }
  }, [url, fetchData, pagination, globalFilter, columnFilters, shouldFetch])

  // Initial load if no initialData
  React.useEffect(() => {
    if (!initialData && shouldFetch) fetcher()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Refetch on controls change
  React.useEffect(() => {
    if (shouldFetch) fetcher()
  }, [pagination, globalFilter, columnFilters, shouldFetch, fetcher])

  const table = useReactTable({
    data: rows,
    columns,
    state: {
      pagination,
      globalFilter,
      columnFilters,
    },
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    manualPagination: shouldFetch,
    pageCount: shouldFetch ? pageCount : undefined,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className="space-y-4">
      {/* Global Filter */}
      {renderGlobalFilter
        ? renderGlobalFilter(globalFilter, setGlobalFilter)
        : (
          <input
            placeholder="Search..."
            value={globalFilter ?? ""}
             className="border rounded-md px-3 py-2 w-full"
          />
        )}

      {/* Rows rendering: Table OR Custom */}
      {renderRow ? (
        <div className="grid gap-4">
          {rows.length ? rows.map((r, i) => <div key={i}>{renderRow(r)}</div>) : (
            <div className="text-center py-10">No results.</div>
          )}
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm">
          Page {table.getState().pagination.pageIndex + 1}
        </div>
        <div className="flex gap-2">
          <button
            className="border rounded px-3 py-1"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </button>
          <button
            className="border rounded px-3 py-1"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
