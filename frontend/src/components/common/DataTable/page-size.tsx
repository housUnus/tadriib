import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";


export default function TablePageSize({ dt }: { dt: any }) {
    return (
        <div className="select-md">
            <Select
                value={String(dt.pageSize)}
                onValueChange={(value: any) =>
                    dt.setPageSize(Number(value))
                }
            >
                <SelectTrigger className="w-12 h-8">
                    <SelectValue />
                </SelectTrigger>

                <SelectContent>
                    {[10, 15, 20, 25].map((size) => (
                        <SelectItem key={size} value={String(size)}>
                            {size}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}