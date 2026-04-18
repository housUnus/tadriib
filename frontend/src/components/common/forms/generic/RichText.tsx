"use client";
import { Field, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils/utils";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import OrderedList from "@tiptap/extension-ordered-list";
import BulletList from "@tiptap/extension-bullet-list";
import ImageResize from 'tiptap-extension-resize-image';
import ListItem from "@tiptap/extension-list-item";
import './Tiptap.css';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useState } from "react";
import { useClientFetch } from "@/hooks/auth/use-client-fetch";

type RichTextEditorProps = {
    value?: string;
    onChange?: (value: string) => void;

    label?: string;
    helperText?: string;
    disabled?: boolean;
    className?: string;
    required?: boolean;

    placeholder?: string;
};

export default function RichText({
    value = "",
    onChange,
    label,
    helperText,
    required,
    disabled = false,
    className,
}: RichTextEditorProps) {

    const [isPreview, setIsPreview] = useState(false);
    const client = useClientFetch();

    // Store editor in state so it persists across renders

    const editor = useEditor({
        extensions: [
            StarterKit,
            Link,
            ImageResize.configure({
                maxWidth: 400, // Maximum width in pixels
            }),
            Underline,
            OrderedList,
            BulletList,
            ListItem,
        ],
        immediatelyRender: false,
        content: value || "",
        editable: !disabled && !isPreview,
        onBlur: ({ editor }) => {
            onChange?.(editor.getHTML());
        },
    });

    // Toolbar button click handlers
    const handleBold = () => editor?.chain().focus().toggleBold().run();
    const handleItalic = () => editor?.chain().focus().toggleItalic().run();
    const handleUnderline = () => editor?.chain()?.focus()?.toggleUnderline()?.run();
    const handleH1 = () => editor?.chain().focus().toggleHeading({ level: 1 }).run();
    const handleH2 = () => editor?.chain().focus().toggleHeading({ level: 2 }).run();
    const handleH3 = () => editor?.chain().focus().toggleHeading({ level: 3 }).run();
    const handleList = () => editor?.chain().focus().toggleBulletList().run();
    const handleOrderedList = () => editor?.chain().focus().toggleOrderedList().run();
    const handleLink = () => {
        const url = prompt("Enter a URL");
        if (url) {
            editor?.chain().focus().setLink({ href: url }).run();
        }
    };
    const handleImage = async () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";

        input.onchange = async () => {
            const file = input.files?.[0];
            if (!file) return;

            const formData = new FormData();
            formData.append("image", file);

            const { data, error } = await client.post("/upload-image/", formData);

            editor?.chain().focus().setImage({ src: (data as any).url }).run();
        };

        input.click();
    };
    const handleCodeBlock = () => editor?.chain().focus().toggleCodeBlock().run();
    const handleUndo = () => editor?.chain().focus().undo().run();
    const handleRedo = () => editor?.chain().focus().redo().run();
    const togglePreview = () => setIsPreview(!isPreview);
    return (
        <Field className="gap-0">
            {label && (
                <FieldLabel className="flex items-center gap-1">
                    {label}
                    {required && (
                        <span className="text-red-500 font-medium">*</span>
                    )}
                </FieldLabel>
            )}

            <div
                className={cn(
                    "mt-1 border rounded-md",
                    className,
                )}
            >
                {/* Toolbar */}
                <div className="editor-container">
                    {/* Toolbar */}
                    <div className="toolbar flex flex-wrap gap-2 sm:gap-4 border-b mb-2">
                        <button type="button" disabled={isPreview} onClick={handleBold}><Icon className='text-lg font-semibold text-dark dark:text-bodytext hover:text-primary dark:hover:text-primary' icon="tabler:bold" /></button>
                        <button type="button" disabled={isPreview} onClick={handleItalic}><Icon className='text-lg font-semibold text-dark dark:text-bodytext hover:text-primary dark:hover:text-primary' icon="tabler:italic" /></button>
                        <button type="button" disabled={isPreview} onClick={handleUnderline}><Icon className='text-lg font-semibold text-dark dark:text-bodytext hover:text-primary dark:hover:text-primary' icon="tabler:underline" /></button>
                        <button type="button" disabled={isPreview} onClick={handleH1}><span className='text-sm font-medium text-dark dark:text-bodytext hover:text-primary dark:hover:text-primary' >H1</span></button>
                        <button type="button" disabled={isPreview} onClick={handleH2}><span className='text-sm font-medium text-dark dark:text-bodytext hover:text-primary dark:hover:text-primary' >H2</span></button>
                        <button type="button" disabled={isPreview} onClick={handleH3}><span className='text-sm font-medium text-dark dark:text-bodytext hover:text-primary dark:hover:text-primary' >H3</span></button>
                        <button type="button" disabled={isPreview} onClick={handleList}><Icon className='text-lg font-semibold text-dark dark:text-bodytext hover:text-primary dark:hover:text-primary' icon="tabler:list" /></button>
                        <button type="button" disabled={isPreview} onClick={handleOrderedList}><Icon className='text-lg font-semibold text-dark dark:text-bodytext hover:text-primary dark:hover:text-primary' icon="tabler:list-numbers" /></button>
                        <button type="button" disabled={isPreview} onClick={handleLink}><Icon className='text-lg font-semibold text-dark dark:text-bodytext hover:text-primary dark:hover:text-primary' icon="tabler:link" /></button>
                        <button type="button" disabled={isPreview} onClick={handleImage}><Icon className='text-lg font-semibold text-dark dark:text-bodytext hover:text-primary dark:hover:text-primary' icon="tabler:image-in-picture" /></button>
                        <button type="button" disabled={isPreview} onClick={handleCodeBlock}><Icon className='text-lg font-semibold text-dark dark:text-bodytext hover:text-primary dark:hover:text-primary' icon="tabler:code" /></button>
                        <button type="button" disabled={isPreview} onClick={handleUndo}><Icon className='text-lg font-semibold text-dark dark:text-bodytext hover:text-primary dark:hover:text-primary' icon="tabler:u-turn-left" /></button>
                        <button type="button" disabled={isPreview} onClick={handleRedo}><Icon className='text-lg font-semibold text-dark dark:text-bodytext hover:text-primary dark:hover:text-primary' icon="tabler:u-turn-right" /></button>
                        <button type="button" onClick={togglePreview}><Icon className='text-lg font-semibold text-dark dark:text-bodytext hover:text-primary dark:hover:text-primary' icon={isPreview ? "tabler:eye-off" : "tabler:eye"} /></button>
                    </div>
                    {!isPreview &&
                        <EditorContent editor={editor} />
                    }
                    {isPreview &&
                        <div className="output p-4 min-h-80">
                            <div dangerouslySetInnerHTML={{ __html: value }} />
                        </div>
                    }
                </div>
            </div>
            {helperText && (
                <p className="text-xs text-gray-500 mt-1">{helperText}</p>
            )}
        </Field>
    );
}
