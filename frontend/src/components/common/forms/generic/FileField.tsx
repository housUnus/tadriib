"use client";

import { Controller, useFormContext } from "react-hook-form";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { get } from "lodash";
import { Accept, useDropzone } from "react-dropzone";
import { Input } from "@/components/ui/input";
import { Icon } from '@iconify/react'

interface FileFieldProps {
  name: string;
  label?: string;
  accept?: Accept;
  disabled?: boolean;
  className?: string;
  showPreview?: boolean; // new prop
}

export const FileField = ({
  name,
  label,
  accept,
  disabled = false,
  className,
  showPreview = true,
}: FileFieldProps) => {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const fileValue = watch(name);
  const [preview, setPreview] = useState<string | null>(null);

  // Generate preview if showPreview is true
  useEffect(() => {
    if (!fileValue || !showPreview) {
      setPreview(null);
      return;
    }

    if (fileValue instanceof File) {
      const url = URL.createObjectURL(fileValue);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }

    if (typeof fileValue === "string") {
      setPreview(fileValue);
    }
  }, [fileValue, showPreview]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const onDrop = (acceptedFiles: File[]) => {
          field.onChange(acceptedFiles[0] || null); // single file
        };

        const { getRootProps, getInputProps, isDragActive } = useDropzone({
          onDrop,
          accept,
          disabled,
          multiple: false,
        });

        return (
          <div className={cn("flex flex-col gap-3", className)}>
            {label && <label className="text-sm font-medium">{label}</label>}

            <div
              {...getRootProps()}
              className={cn(
                "flex w-full cursor-pointer flex-col items-center justify-center rounded-md border  border-dashed border-primary bg-lightprimary p-5",
                isDragActive && "border-blue-500",
                disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              <Input {...getInputProps()} className="hidden" />
              <div className="flex flex-col items-center justify-center ">
                <Icon icon="solar:cloud-upload-outline" height={32} className="mb-3 text-darklink" />
                <p className="text-sm text-darklink">
                  {isDragActive ? "Drop the file here..." : "Drop file here or click to upload"}
                </p>
                {showPreview && preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="mt-3 w-32 h-32 object-cover"
                  />
                )}
              </div>
            </div>

            {/* Clear / Reset */}
            {showPreview && preview && !disabled && (
              <button
                type="button"
                className="text-red-500 text-sm mt-1 underline"
                onClick={() => setValue(name, null)}
              >
                Remove
              </button>
            )}

            {/* Error */}
            {get(errors, name) && (
              <span className="text-sm text-red-500">
                {get(errors, name)?.message?.toString()}
              </span>
            )}
          </div>
        );
      }}
    />
  );
};

export default FileField;
