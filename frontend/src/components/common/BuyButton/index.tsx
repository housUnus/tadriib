import { useClientFetch } from "@/hooks/auth/use-client-fetch";
import { toast } from "sonner";
import { ActionButton } from "../forms/generic/action-button";

export default function BuyButton({course, children, ...props}: {course: any, children?: React.ReactNode, [key: string]: any}) {
    console.log("🚀 ~ BuyButton ~ course:", course)
    const client = useClientFetch()
    const buyNow = async () => {
        const {data, error} = await client.post("/orders/create_course_order/", {course_id: course.id})
        if (error) {
            toast.error(error)
            return
        }
        const checkout_url = `/payments/checkout/${(data as any)?.id}`
        window.location.href = checkout_url
    }

    return (
        <ActionButton action={buyNow} {...props}>{children}</ActionButton>
    )
}