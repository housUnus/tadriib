"use server";
import { serialize } from 'object-to-formdata';
import { useServerFetch } from "@/hooks/auth/user-server-fetch";
import { revalidatePath } from "next/cache";

export async function createUser(payload: any) {
    const client = await useServerFetch();
    const { data, error } = await client.post("/dj-auth/register/", payload);
    if (error) {
        return { success: false, error, data: null };
    }

    revalidatePath("/users");
    return { success: true, error: null, data };
}


export async function updateUser(id: number, payload: any) {
    console.log("🚀 ~ updateUser ~ payload:", payload)
    var form_data = new FormData();
    for (var key in payload) {
        if (key === 'avatar' && typeof payload[key] === 'string') {
            continue; // skip null avatar
        }
        else if (payload[key] === null || payload[key] === undefined) {
            form_data.append(key, '');
        }
        else {
            form_data.append(key, payload[key]);
        }
    }
    console.log("🚀 ~ updateUser ~ form_data:", form_data)

    const client = await useServerFetch();
    const { data, error } = await client.put(`/users/${id}/`, form_data);
    console.log("🚀 ~ updateUser ~ error:", error)
    if (error) {
        return { success: false, error, data: null };
    }

    revalidatePath("/users");
    return { success: true, error: null, data };
}