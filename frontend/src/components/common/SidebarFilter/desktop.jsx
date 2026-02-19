import { Button } from "@/components/ui/button";
import { FilterSidebar } from "./filters";

export default function DesktopFilters({values, form}) {
  return (
    <aside className="hidden lg:block w-64 flex-shrink-0">
      <div className="">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Filters</h2>
            {Object.keys(values).length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={form.reset}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Clear all
              </Button>
            )}
          </div>
          <FilterSidebar form={form} />
        </div>
      </div>
    </aside>
  );
}
