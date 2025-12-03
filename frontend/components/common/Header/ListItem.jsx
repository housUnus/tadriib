import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function ListItem({
  title,
  href,
  isChild,
  setSelectedCategory = () => {},
}) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          className="flex text-sm font-medium leading-none select-none p-3 hover:bg-slate-100"
          href={href}
          onMouseEnter={() => setSelectedCategory(title)}
        >
          <span className="flex-grow flex justify-between">
            {title}
            {!isChild && (
              <ChevronRight className="w-4 h-3 text-gray-500 inline-block" />
            )}
          </span>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
