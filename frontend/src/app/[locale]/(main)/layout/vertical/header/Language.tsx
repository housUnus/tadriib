"use client";
import { useContext, useEffect } from "react";
import { CustomizerContext } from "@/app/context/CustomizerContext";
import Image from "next/image";
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { usePathname } from "@/i18n/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const Languages = [
  {
    flagnameKey: "lang.english",
    icon: "/images/flag/icon-flag-en.svg",
    value: "en",
    active: true
  },
  {
    flagnameKey: "lang.french",
    icon: "/images/flag/icon-flag-fr.svg",
    value: "fr",
    active: false
  },
  {
    flagnameKey: "lang.arabic",
    icon: "/images/flag/icon-flag-sa.svg",
    value: "ar",
    active: true
  },
];

export const Language = ({isHeader=true}) => {
  const { isLanguage, setIsLanguage, activeDir } =
    useContext(CustomizerContext);
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("home");
  const locale = useLocale();

  const currentLang =
    Languages.find((_lang) => _lang.value === isLanguage) || Languages[1];

  const router = useRouter();
  const pathname = usePathname();

  const onSelectChange = (code: string) => {
    setIsLanguage(code)
    startTransition(() => {
      router.push(`/${code}${pathname}`);
      router.refresh();
    });
  };

  useEffect(() => {
    onSelectChange(locale);
  }, [locale]);

  return (
    <>
      {isHeader && <div className="relative group/menu hidden sm:block">
        <DropdownMenu dir={activeDir === "rtl" ? "rtl" : "ltr"}>
          <DropdownMenuTrigger asChild>
            <span className="hover:bg-lightprimary p-2 rounded flex justify-center items-center cursor-pointer group-hover/menu:bg-lightprimary">
              <Image
                src={currentLang.icon}
                alt="language"
                width={100}
                height={100}
                className="rounded-full h-6 w-6 object-cover cursor-pointer"
              />
              <span className="text-sm font-medium ms-1">{t(currentLang.flagnameKey)}</span>
            </span>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56 rounded-sm p-0">
            {Languages.filter((_lang) => _lang.active).map((item, index) => (
              <DropdownMenuItem
                key={index}
                onSelect={() => onSelectChange(item.value)}
                className="flex gap-3 items-center p-3 w-full cursor-pointer"
              >
                <Image
                  src={item.icon}
                  alt={item.flagnameKey}
                  className="rounded-full object-cover h-6 w-6"
                  width={100}
                  height={100}
                />
                <span>{t(item.flagnameKey)}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>}
      {!isHeader && <div className="max-w-sm mt-4">
        <Select onValueChange={onSelectChange}>
          <SelectTrigger className="w-40 text-white!">
            <SelectValue placeholder={t(currentLang.flagnameKey)}>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {Languages.filter((_lang) => _lang.active).map((item, index) => (
                <SelectItem value={item.value}>
                  <span className="rounded flex justify-center items-center">
                    <Image
                      src={item.icon}
                      alt="language"
                      width={100}
                      height={100}
                      className="rounded-full h-6 w-6 object-cover cursor-pointer"
                    />
                    <span className="text-sm font-medium ms-1">{t(item.flagnameKey)}</span>
                  </span>


                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>}
    </>
  );
};
