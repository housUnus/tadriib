"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";

export default function AvatarUploader({
    name,
    avatar,
}: {
    name: string;
    avatar?: string;
}) {

    const {
        register,
        watch,
        formState: { errors },
    } = useFormContext();

    const fileValue = watch(name);
    const inputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(avatar || null);
    const [file, setFile] = useState<File | null>(null);

    const { ref: registerRef } = register(name);

    useEffect(() => {
        if (!fileValue) {
            setPreview(null);
        } else if (fileValue instanceof FileList && fileValue[0]) {
            setPreview(URL.createObjectURL(fileValue[0]));
        } else if (typeof fileValue === "string") {
            setPreview(fileValue); // assume it's a URL
        }
    }, [fileValue]);

    const handlePick = () => {
        inputRef.current?.click();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (!selected) return;

        setFile(selected);
        setPreview(URL.createObjectURL(selected));
    };

    const handleReset = () => {
        setFile(null);
        setPreview(avatar || null);
        if (inputRef.current) inputRef.current.value = "";
    };

    return (
        <div className="text-center">
            <Image
                unoptimized
                src={preview || "/images/profile/user-1.jpg"}
                alt="avatar"
                width={160}
                height={160}
                className="rounded-full mx-auto"
            />

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleChange}
            />

            <div className="flex justify-center gap-3 py-6">
                <Button type="button" onClick={handlePick}>
                    Upload
                </Button>

                <Button
                    type="button"
                    variant="lighterror"
                    onClick={handleReset}
                    disabled={!file}
                >
                    Reset
                </Button>
            </div>
        </div>
    );
}
