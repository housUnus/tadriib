import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { languages } from "./constants";
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';

import { useTransition } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronDown, Languages } from "lucide-react";
import { usePathname } from "@/i18n/navigation";

export default function LanguagesSwitcher({ }) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const pathname = usePathname();
    console.log("🚀 ~ Languagesitcher ~ pathname:", pathname)
    const locale = useLocale();

    const onSelectChange = (code: string) => {
        startTransition(() => {
            router.push(`/${code}${pathname}`);
            router.refresh(); // Ensure the page takes the new locale into account related to the issue #395
        });
    };

    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="hidden md:flex cursor-pointer items-center gap-1.5 px-2.5 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200 h-9"
                >
                    <Languages className="w-4 h-4" />
                    <span className="font-medium text-xs">
                        {locale.toLocaleUpperCase()}
                    </span>
                    <ChevronDown className="w-3 h-3" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="end">
                {languages.map((language) => (
                    <DropdownMenuItem
                        key={language.code}
                        onClick={() => { onSelectChange(language.code) }}
                        className="flex items-center gap-3 px-3 py-2 cursor-pointer"
                    >
                        <span className="text-lg">{language.flag}</span>
                        <span className="font-medium">{language.name}</span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu >
    )
}