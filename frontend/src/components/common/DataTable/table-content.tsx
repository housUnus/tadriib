import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import {
    flexRender,
} from "@tanstack/react-table"

export default function TableContent({ dt, renderRow }: { dt: any, renderRow?: (row: any) => React.ReactNode, initialData?: any[] }) {
    
    if (renderRow) {
        return dt.rows.length ? (
            <>
                {dt.rows.map((r: any, i: number) => (
                    <div key={i}>{renderRow(r)}</div>
                ))}
            </>
        ) : (
            <div className="h-24 text-center flex items-center justify-center">
                No results.
            </div>
        )
    }

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    {dt.getHeaderGroups().map((hg: any) => (
                        <TableRow key={hg.id}>
                            {hg.headers.map((h: any) => (
                                <TableHead key={h.id}>
                                    {h.isPlaceholder
                                        ? null
                                        : flexRender(
                                            h.column.columnDef.header,
                                            h.getContext()
                                        )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>

                <TableBody>
                    {dt.getRowModel().rows.length ? (
                        dt.getRowModel().rows.map((row: any) => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell: any) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={dt.columns.length}
                                className="h-24 text-center"
                            >
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )

}