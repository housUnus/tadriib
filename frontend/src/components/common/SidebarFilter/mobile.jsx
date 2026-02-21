import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";
import { FilterSidebar } from "./filters";
import { Button } from "@/components/ui/button";
import { countActiveFilters } from "./utils";

export default function MobileFilter({ values, form }) {
  const active_filters = countActiveFilters(values);
  
  return (
    <>
      {/* Mobile Filter Button */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="lg:hidden bg-transparent">
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters
            {active_filters > 0 && (
              <Badge variant="secondary" className="ml-2">
                {active_filters}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <div className="mt-6 px-4">
            <FilterSidebar form={form} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
