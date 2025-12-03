"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Menu } from "lucide-react";
import { categories } from "./links";
import { useState } from "react";
import Link from "next/link";

export function MobileNav({}) {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const toggleCategory = (categoryName) => {
    setExpandedCategory(
      expandedCategory === categoryName ? null : categoryName
    );
  };
  return (
    <Sheet className="flex flex-col">
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="px-2 pb-0 pt-2 flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-bold text-xl">Shadcn/React</SheetTitle>
        </SheetHeader>
        <nav className="py-1 overflow-y-scroll no-scrollbar">
          <ul className="auth border-b">
            <li>
              <Link
                href=""
                className="block p-2 text-sm text-blue-900 hover:bg-gray-100"
              >
                My Account
              </Link>
              <Link
                href=""
                className="block p-2 text-sm text-blue-900 hover:bg-gray-100"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                href=""
                className="block p-2 text-sm text-blue-900 hover:bg-gray-100"
              >
                Lout out
              </Link>
            </li>
          </ul>
          <ul>
            {["webinars", "face-to-face", "online"].map((parent, index) => (
              <div key={parent}>
                <span className="px-3 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {parent}
                </span>
                {categories.filter((category) => category.parent === parent).map((category) => (
                  <li key={category.name}>
                    <button
                      onClick={() => toggleCategory(category.name)}
                      className="flex justify-between items-center w-full text-sm p-2 text-left hover:bg-gray-100"
                    >
                      <span>{category.name}</span>
                      {expandedCategory === category.name ? (
                        <ChevronUp size={15} />
                      ) : (
                        <ChevronDown size={15} />
                      )}
                    </button>
                    {expandedCategory === category.name && (
                      <ul className="bg-gray-50 py-2">
                        {category.children.map((subcategory) => (
                          <li key={subcategory.name}>
                            <a
                              href={subcategory.url}
                              className="block px-5 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              {subcategory.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </div>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
