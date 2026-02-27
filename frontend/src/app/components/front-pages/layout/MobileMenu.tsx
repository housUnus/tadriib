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
import { useState } from "react";
import Link from "next/link";
import { ActionButton } from "@/components/common/forms/generic/action-button";
import { logoutAction } from "@/lib/actions/auth";

const links = [
  {
    name: 'My Account',
    url: '/account/settings'
  },
  {
    name: 'My Learning',
    url: '/account/my-courses?tab=courses'
  },
]

export default function MobileMenu({ categories, session }: { categories: any[], session: any }) {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const toggleCategory = (categoryName: any) =>
    setExpandedCategory(
      expandedCategory === categoryName ? null : categoryName
    );

  return (
    <Sheet >
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="px-2 pb-0 pt-2 flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-bold text-xl">Ruwad Academy</SheetTitle>
        </SheetHeader>
        <nav className="py-1 overflow-y-scroll no-scrollbar flex flex-col gap-3">
          <ul className="auth">
            {session ?
              <>
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.url}
                      className="block py-2 px-2 text-sm text-primary hover:bg-gray-100"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
                <li>
                  {session ? (
                    <ActionButton variant="link" action={logoutAction} className="items-start justify-start hover:bg-gray-100 gap-0 px-2">
                      Logout
                    </ActionButton>
                  ) : null}
                </li>
              </> :
              <>
                <li>
                  <Link
                    href="/auth/login"
                    className="block p-2 text-sm text-blue-900 hover:bg-gray-100"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/auth/register"
                    className="block p-2 text-sm text-blue-900 hover:bg-gray-100"
                  >
                    Register
                  </Link>
                </li>
              </>
            }
          </ul>
          <hr />
          <ul>
            {["courses"].map((parent, index) => (
              <div key={parent}>
                <span className="px-3 text-xs font-semibold text-black uppercase tracking-wider">
                  {parent}
                </span>
                <div className="">
                  {categories?.map((category) => (
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
                        <ul className="">
                          {category.children.map((subcategory: any) => (
                            <li key={subcategory.name}>
                              <a
                                href={`/courses?categories=${subcategory.slug}`}
                                className="block px-5 py-1.5 text-sm text-gray-700 hover:bg-gray-10 border-b border-gray-100"
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

              </div>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
