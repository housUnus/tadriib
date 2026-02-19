import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CustomField from "@/components/common/forms/generic/CustomField";

export default function FiltersHeader({form, totalResults}) {
  return (
    <div className="bg-white rounded-md border border-gray-200 p-4 py-2 mb-4">
    {/* Search and Sort Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="results">
          {totalResults} Results {form.getValues("search") && `for "${form.getValues("search")}"`}
        </div>
        {/* Sort */}
        <div className="w-full sm:w-[300px]">
          <CustomField
            control={form.control}
            name={`sortBy`}
            Component={({ target, value, onChange }) => (
              <Select value={value} onValueChange={onChange}>
                <SelectTrigger className=" bg-gray-50 border-gray-300">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Most Relevant</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>
    </div>
  );
}
