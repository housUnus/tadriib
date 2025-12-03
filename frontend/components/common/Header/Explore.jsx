"use client"
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react"; // Import the arrow icon

export function Explore() {
  return (
    <div className="group relative"> {/* Wrap in a group for hover effects */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="text-sm font-medium flex items-center gap-1">
            Categories
            <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" /> {/* Arrow icon */}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 mt-2" onMouseLeave={() => document.dispatchEvent(new Event('mousedown'))}>
          {/* Level 1: Top Categories */}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Development</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              {/* Level 2: Subcategories */}
              <DropdownMenuItem>Web Development</DropdownMenuItem>
              <DropdownMenuItem>Mobile Development</DropdownMenuItem>
              <DropdownMenuItem>Game Development</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Business</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Finance</DropdownMenuItem>
              <DropdownMenuItem>Entrepreneurship</DropdownMenuItem>
              <DropdownMenuItem>Management</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Design</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Graphic Design</DropdownMenuItem>
              <DropdownMenuItem>UI/UX Design</DropdownMenuItem>
              <DropdownMenuItem>3D & Animation</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}