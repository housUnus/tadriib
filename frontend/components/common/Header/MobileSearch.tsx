import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { categories, most_searched_keywords, popular_courses } from "./constants";
import { useState } from "react";

export default function MobileSearch({}) {
  const [openDialog, setOpenDialog] = useState(false);
  
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
    <DialogTrigger asChild className="md:hidden flex-1/6 justify-end">
      <Button variant="ghost" size="icon" className="h-9 w-9">
        <Search className="h-5 w-5" />
        <span className="sr-only">Search</span>
      </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[600px] p-0 gap-0 [&>button]:top-6 [&>button]:right-6">
      <DialogTitle></DialogTitle>
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-3 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for anything"
            className="w-full pl-9 pr-4 py-2 text-sm md:text-base"
            autoFocus
          />
        </div>
      </div>

      <div className="p-4 grid gap-6 max-h-[70vh] overflow-y-auto">
        {/* Most searched now */}
        <div>
          <h3 className="text-sm font-semibold mb-2 text-muted-foreground">
            MOST SEARCHED NOW
          </h3>
          <div className="flex flex-wrap gap-2">
            {most_searched_keywords.map((term) => (
              <Button
                key={term}
                variant="outline"
                size="sm"
                className="rounded-full text-xs"
              >
                {term}
              </Button>
            ))}
          </div>
        </div>

        {/* Popular courses */}
        <div>
          <h3 className="text-sm font-semibold mb-3 text-muted-foreground">
            POPULAR COURSES
          </h3>
          <div className="grid gap-4">
            {popular_courses.map((course, index) => (
              <div
                key={index}
                className="flex gap-3 p-2 rounded-lg hover:bg-muted cursor-pointer"
              >
                <img
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  className="w-20 h-14 object-cover rounded"
                />
                <div>
                  <h4 className="font-medium text-sm line-clamp-1">
                    {course.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {course.instructor}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {course.students}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Browse categories */}
        <div>
          <h3 className="text-sm font-semibold mb-2 text-muted-foreground">
            BROWSE CATEGORIES
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {categories.slice(0, 6).map((category) => (
              <Button
                key={category}
                variant="outline"
                className="justify-start text-sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
  )
}
