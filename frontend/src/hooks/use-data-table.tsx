"use client"

import * as React from "react"
import {
    ColumnDef,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
    PaginationState,
    ColumnFiltersState,
} from "@tanstack/react-table"
import { useQuery } from "@tanstack/react-query"

import { useClientFetch } from "./auth/use-client-fetch"

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

interface UseDataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    initialData?: TData[]
    fetchData?: (params: FetchParams) => Promise<FetchResult<TData>>
    url?: string
    pageSize?: number,
}

export function useDataTable<TData, TValue>({
    columns,
    initialData = [],
    fetchData,
    url,
    pageSize = 10,
}: UseDataTableProps<TData, TValue>) {
    const client = useClientFetch();


    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize,
    })

    const [globalFilter, setGlobalFilter] = React.useState("")
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

    /* =============================
       Fetcher
    ============================= */

    const shouldFetch = !!url || !!fetchData

    const query = useQuery({
        queryKey: [
            "data-table",
            url,
            pagination,
            globalFilter,
            columnFilters,
        ],
        queryFn: async () => {

            const params: FetchParams = {
                pageIndex: pagination.pageIndex,
                pageSize: pagination.pageSize,
                globalFilter,
                columnFilters,
            }

            if (fetchData) {
                return await fetchData(params)
            }

            if (url) {
                const queryParams = new URLSearchParams({
                    page: String(pagination.pageIndex + 1),
                    page_size: String(pagination.pageSize),
                    search: globalFilter || "",
                    ...columnFilters.reduce<Record<string, any>>((acc, filter) => {
                        acc[filter.id] = filter.value
                        return acc
                    }, {}),
                })

                const res = await client.get(`${url}?${queryParams}`)
                const data: any = res.data

                if (Array.isArray(data)) {
                    return { rows: data }
                }

                return {
                    rows: data.results ?? [],
                    pageCount: Math.ceil(data.count / pagination.pageSize),
                }
            }

            return { rows: [] }
        },
        placeholderData: (previousData) => previousData,
        staleTime: 1000 * 60 * 2, // 2 minutes cache
    })

    const rows = query.data?.rows ?? []
    const pageCount = query.data?.pageCount ?? -1

    // const fetcher = React.useCallback(async () => {
    //     if (!shouldFetch) return

    //     const params: FetchParams = {
    //         pageIndex: pagination.pageIndex,
    //         pageSize: pagination.pageSize,
    //         globalFilter,
    //         columnFilters,
    //     }

    //     if (fetchData) {
    //         const res = await fetchData(params)
    //         (res.rows)
    //         if (res.pageCount !== undefined) setPageCount(res.pageCount)
    //         return
    //     }

    //     if (url) {
    //         const query = new URLSearchParams({
    //             page: String(pagination.pageIndex + 1),
    //             page_size: String(pagination.pageSize),
    //             search: globalFilter || "",
    //         })

    //         const res = await client.get(`${url}?${query.toString()}`)
    //         const data: any = await res.data

    //         // Common DRF format support
    //         if (Array.isArray(data)) {
    //             (data)
    //         } else {
    //             (data.results ?? data.data ?? [])
    //             if (data.count && pagination.pageSize) {
    //                 setPageCount(Math.ceil(data.count / pagination.pageSize))
    //             }
    //         }
    //     }
    // }, [url, fetchData, pagination, globalFilter, columnFilters, shouldFetch])

    // Initial load if no initialData
    // React.useEffect(() => {
    //     if (!initialData && shouldFetch) fetcher()
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])

    // Refetch on controls change
    // React.useEffect(() => {
    //     if (shouldFetch) fetcher()
    // }, [pagination, globalFilter, columnFilters, shouldFetch, fetcher])
    /* =============================
       Page Size Management
    ============================= */

    const setPageSize = (size: number) => {
        setPagination((prev) => ({
            ...prev,
            pageSize: size,
            pageIndex: 0, // reset to first page
        }))
    }

    /* =============================
        Pagination Management
    ============================= */

    const nextPage = () => {
        if (pageCount === -1 || pagination.pageIndex + 1 < pageCount) {
            setPagination((prev) => ({
                ...prev,
                pageIndex: prev.pageIndex + 1,
            }))
        }
    }

    const previousPage = () => {
        setPagination((prev) => ({
            ...prev,
            pageIndex: Math.max(prev.pageIndex - 1, 0),
        }))
    }

    const table = useReactTable({
        data: rows,
        columns,
        state: {
            pagination,
            globalFilter,
            columnFilters,
        },
        manualPagination: true,
        pageCount,
        onPaginationChange: setPagination,
        onGlobalFilterChange: setGlobalFilter,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    /* ============================= */
    /* 🔹 Separated UI Components */
    /* ============================= */


    return {
        /* raw control */
        table,
        rows,
        pagination,
        pageSize: pagination.pageSize,
        pageIndex: pagination.pageIndex,
        pageCount,
        globalFilter,
        columnFilters,
        setPagination,
        setGlobalFilter,
        setColumnFilters,
        setPageSize,
        nextPage,
        previousPage,

        /* React Query states */
        isLoading: query.isLoading,
        isFetching: query.isFetching,
        reload: query.refetch,
    }
}
