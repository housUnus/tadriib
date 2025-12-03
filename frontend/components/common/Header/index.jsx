"use client";
import Link from "next/link";
import {
  Bell,
  BookOpen,
  Calendar,
  CreditCard,
  GraduationCap,
  LogOut,
  Search,
  Settings,
  UserPlus,
  Video,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

import Categories from "./Categories";
import { MobileNav } from "./MobileNav";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import MobileSearch from "./MobileSearch";
import { cn } from "@/lib/utils";
import LanguagesSwitcher from "./LanguagesSwitcher";

const getInitials = (firstName, lastName) => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  const [user, setUser] = useState({'firstName': 'John', 'lastName': 'Doe'});
  
  useEffect(() => {
    setUser(null)
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out",
        isScrolled ? "bg-white/80 backdrop-blur-xl shadow-sm" : "bg-white"
      )}
    >
      <div className="w-full flex h-16 items-center justify-between px-4">
        {/* Mobile Menu Trigger - Left on mobile */}
        <MobileNav />
        <div className="left-nav flex">
          {/* Logo - Centered on mobile, Left on desktop */}
          <div className="flex flex-1 justify-center md:justify-start md:flex-none">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold">Udemy</span>
            </Link>
          </div>

          {/* Categories Dropdown - Desktop Only */}
          <NavigationMenu delayDuration={0} className="hidden md:flex md:ml-4 ">
            <NavigationMenuList className=" focus:outline-none">
              <NavigationMenuItem className=" focus:outline-none">
                <NavigationMenuTrigger className="cursor-pointer flex items-center gap-2 px-4 xl:px-5 py-2 text-gray-700 hover:text-gray-90 rounded-lg xl:rounded-xl transition-all duration-300 ease-out group h-9">
                  <Search className="w-4 h-4 group-hover:text-blue-500 transition-colors" />
                  <span className="font-medium text-sm">Explore</span>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="focus:outline-none">
                    <Categories />
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        {/* Search Bar - Desktop Only */}
        <div className="hidden md:flex md:flex-1 md:justify-center md:px-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for anything"
              className="w-full rounded-full bg-muted pl-8"
            />
          </div>
        </div>

        {/* Search Icon - Mobile Only */}
        <MobileSearch />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-end justify-end-safe md:gap-4">
          <NavigationMenu delayDuration={0} className="hidden md:flex md:ml-4">
            <NavigationMenuList className=" focus:outline-none">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="cursor-pointer flex items-center gap-2 px-4 xl:px-5 py-2 text-gray-700 hover:text-gray-900  rounded-lg xl:rounded-xl transition-all duration-300 ease-out group h-9">
                  <GraduationCap className="w-4 h-4 transition-colors" />
                  <span className="font-medium text-sm">For Experts</span>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-2">
                    <li className="text-center">
                      <NavigationMenuLink asChild>
                        <Link href="#" className="bg-gray-100 hover:bg-gray-200">
                          Learn More
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Button
                          className="w-full flex items-center justify-center bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
                          onClick={() => {}}
                        >
                          <span>Get Started</span>
                        </Button>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          {!user && (
            <>
              <Button
                className="flex items-center gap-2 justify-center bg-white hover:bg-gray-100 text-gray-800 border border-primary transition-all duration-300 font-medium"
                onClick={() => {}}
              >
                Login
              </Button>
              <Button
                className="flex items-center gap-2 justify-center bg-primary shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
                onClick={() => {}}
              >
                <UserPlus className="w-4 h-4" />
                <span>Sign Up</span>
              </Button>
            </>
          )}
          {/* Language Switcher */}
          <LanguagesSwitcher/>
          {/* Enhanced Notifications Dropdown */}
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative">
                  <Bell className="scale-125" />
                  <Badge
                    variant="destructive"
                    className="absolute top-1 right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    5
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80" align="end" forceMount>
                <DropdownMenuLabel className="flex items-center justify-between p-2">
                  <span>Notifications</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-blue-600 hover:text-blue-700"
                  >
                    Mark all as read
                  </Button>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <ScrollArea className="h-80">
                  <div className="space-y-0">
                    {/* Course Update Notification */}
                    <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 cursor-pointer">
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          New lesson available
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Advanced React Patterns - Chapter 5: Custom Hooks
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          2 hours ago
                        </p>
                      </div>
                    </div>

                    {/* Webinar Reminder */}
                    <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 cursor-pointer">
                      <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          Webinar starting soon
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Building Scalable APIs starts in 30 minutes
                        </p>
                        <p className="text-xs text-gray-400 mt-1">30 min</p>
                      </div>
                    </div>

                    {/* Assignment Due */}
                    <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 cursor-pointer">
                      <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          Assignment due tomorrow
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Complete the React project for Frontend Mastery
                        </p>
                        <p className="text-xs text-gray-400 mt-1">1 day left</p>
                      </div>
                    </div>

                    {/* Course Completion */}
                    <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 cursor-pointer">
                      <div className="w-2 h-2 bg-gray-300 rounded-full flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-700">
                          Course completed!
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Congratulations! You've completed JavaScript
                          Fundamentals
                        </p>
                        <p className="text-xs text-gray-400 mt-1">1 day ago</p>
                      </div>
                    </div>

                    {/* New Course Recommendation */}
                    <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 cursor-pointer">
                      <div className="w-2 h-2 bg-gray-300 rounded-full flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-700">
                          New course recommendation
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Based on your progress, try Advanced TypeScript
                          Patterns
                        </p>
                        <p className="text-xs text-gray-400 mt-1">2 days ago</p>
                      </div>
                    </div>

                    {/* Group Study Session */}
                    <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 cursor-pointer">
                      <div className="w-2 h-2 bg-gray-300 rounded-full flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-700">
                          Study group invitation
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Join the React Developers study group for
                          collaborative learning
                        </p>
                        <p className="text-xs text-gray-400 mt-1">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </ScrollArea>

                <DropdownMenuSeparator />
                <div className="p-2">
                  <Button
                    variant="ghost"
                    className="w-full text-sm text-center text-blue-600 hover:text-blue-700"
                  >
                    View all notifications
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* My Account */}
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full "
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={user.image || "/placeholder.svg"}
                      alt={`${user.firstName} ${user.lastName}`}
                    />
                    <AvatarFallback className="bg-blue-600 text-white font-medium">
                      {getInitials(user.firstName, user.lastName)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal p-2">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center">
                    <GraduationCap className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/my-courses" className="flex items-center">
                    <BookOpen className="mr-2 h-4 w-4" />
                    <span>My Courses</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/my-webinars" className="flex items-center">
                    <Video className="mr-2 h-4 w-4" />
                    <span>My Webinars</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/schedule" className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Schedule</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link href="/billing" className="flex items-center">
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Billing</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/preferences" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Preferences</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem className="text-red-600 focus:text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </nav>
      </div>
    </header>
  );
}
