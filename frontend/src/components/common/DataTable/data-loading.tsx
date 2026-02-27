import { Spinner } from "@/components/ui/spinner";

export default function TableDataLoading({dt}:{dt:any}) {
    if(dt.isFetching || dt.isLoading) {
        return (
            <div className="h-24 text-center flex items-center justify-center">
                <Spinner /> Loading...
            </div>
        )
    }
    return null
}