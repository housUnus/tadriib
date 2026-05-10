'use client'
import { useClientFetch } from "@/hooks/auth/use-client-fetch";
import { toast } from "sonner";
import { ActionButton } from "../forms/generic/action-button";
import { useUserStore } from "@/stores/user";
import { redirect } from "next/navigation";
import { DEFAULT_LOGIN_ROUTE } from "@/lib/auth/routes";

export default function BuyButton({ course, children, ...props }: { course: any, children?: React.ReactNode, [key: string]: any }) {
    const client = useClientFetch()
    const user = useUserStore(state => state.user)

    const buyNow = async () => {
        if (!user) {
            redirect(DEFAULT_LOGIN_ROUTE)
        }
        const { data, error } = await client.post("/orders/create_course_order/", { course_id: course.id })
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