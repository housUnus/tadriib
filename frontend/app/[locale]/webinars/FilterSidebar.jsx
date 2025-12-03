"use client";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { Checkbox } from "@/components/ui/checkbox";
import CustomField from "@/components/common/forms/generic/CustomField";
import CheckboxField from "@/components/common/forms/generic/CheckboxField";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Star } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useFilterQuery } from "@/components/common/hooks/useFilterQuery";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

export const FilterSidebar = ({ form }) => {
  const [ratingOpen, setRatingOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [levelOpen, setLevelOpen] = useState(true);
  const [durationOpen, setDurationOpen] = useState(true);

  const { params, setParams, fetch } = useFilterQuery({
    key: "webinars",
    fetcher: () => [],
  });
  console.log("🚀 ~ FilterSidebar ~ params:", params)

  const onSubmit = (data) => {
    setParams(data);
    console.log(data);
  };

  useEffect(() => {
    form.reset(params);
  }, []);

  return (
    <div className="space-y-6">
      {/* Ratings Filter */}
      <Collapsible open={ratingOpen} onOpenChange={setRatingOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full group">
          <h3 className="font-bold text-base text-gray-900">Ratings</h3>
          {ratingOpen ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4 space-y-3">
          {[4.5, 4.0, 3.5, 3.0].map((rating) => (
            <CustomField
              key={rating}
              control={form.control}
              name={`rating`}
              target={rating}
              Component={({ target, value, onChange, ...props }) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox
                    onCheckedChange={(checked) => {
                      if (checked) {
                        onChange([...value, target]); // add selected
                      } else {
                        onChange(value.filter((v) => v !== target)); // remove unselected
                      }
                    }}
                    checked={value?.includes(target)}
                  />
                  <label
                    htmlFor={`rating-${rating}`}
                    className="flex items-center gap-1 text-sm font-medium cursor-pointer"
                  >
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{rating} & up</span>
                    <span className="text-gray-500">
                      {/* ({allWebinars.filter((w) => w.rating >= rating).length}) */}
                    </span>
                  </label>
                </div>
              )}
            />
          ))}
        </CollapsibleContent>
      </Collapsible>

      <div className="border-t pt-6" />

      {/* Price Filter */}
      <Collapsible open={priceOpen} onOpenChange={setPriceOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full group">
          <h3 className="font-bold text-base text-gray-900">Price</h3>
          {priceOpen ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4 space-y-4">
          <div className="flex items-center space-x-2">
            <CheckboxField
              name="freeOnly"
              control={form.control}
              label="Free"
            />
            <label
              htmlFor="free-only"
              className="text-sm font-medium cursor-pointer"
            >
              {/* Free ({allWebinars.filter((w) => w.price === 0).length}) */}
            </label>
          </div>
          <div>
            <CustomField
              control={form.control}
              name={`priceRange`}
              Component={({ value, onChange, ...props }) => (
                <>
                  <div className="flex justify-between text-sm text-gray-600 mb-3">
                    <span>${value[0]}</span>
                    <span>${value[1]}+</span>
                  </div>
                  <Slider
                    value={value}
                    onValueChange={onChange}
                    max={300}
                    step={10}
                    className="w-full"
                  />
                </>
              )}
            />
          </div>
        </CollapsibleContent>
      </Collapsible>

      <div className="border-t pt-6" />

      {/* Level Filter */}
      <Collapsible open={levelOpen} onOpenChange={setLevelOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full group">
          <h3 className="font-bold text-base text-gray-900">Level</h3>
          {levelOpen ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4 space-y-3">
          {["Beginner", "Intermediate", "Advanced"].map((level) => (
            <CustomField
              key={level}
              control={form.control}
              name={`level`}
              target={level}
              Component={({ target, value, onChange, ...props }) => (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    onCheckedChange={(checked) => {
                      if (checked) {
                        onChange([...value, target]); // add selected
                      } else {
                        onChange(value.filter((v) => v !== target)); // remove unselected
                      }
                    }}
                    checked={value?.includes(target)}
                  />
                  <label
                    htmlFor={`level-${level}`}
                    className="text-sm font-medium cursor-pointer"
                  >
                    {level} 
                    {/* {allWebinars.filter((w) => w.level === level).length}) */}
                  </label>
                </div>
              )}
            />
          ))}
        </CollapsibleContent>
      </Collapsible>

      <div className="border-t pt-6" />

      {/* Duration Filter */}
      <Collapsible open={durationOpen} onOpenChange={setDurationOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full group">
          <h3 className="font-bold text-base text-gray-900">Duration</h3>
          {durationOpen ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4 space-y-3">
          {[
            { id: "short", label: "0-2 hours" },
            { id: "medium", label: "2-3 hours" },
            { id: "long", label: "3+ hours" },
          ].map((duration) => (
            <CustomField
              key={duration.id}
              control={form.control}
              name={`duration`}
              target={duration.id}
              Component={({ target, value, onChange, ...props }) => (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    onCheckedChange={(checked) => {
                      if (checked) {
                        onChange([...value, target]); // add selected
                      } else {
                        onChange(value.filter((v) => v !== target)); // remove unselected
                      }
                    }}
                    checked={value?.includes(target)}
                  />

                  <label
                    htmlFor={`duration-${duration.id}`}
                    className="text-sm font-medium cursor-pointer"
                  >
                    {duration.label}
                  </label>
                </div>
              )}
            />
          ))}
        </CollapsibleContent>
      </Collapsible>
       <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button onClick={form.handleSubmit(onSubmit)}>
            Submit
          </Button>
        </Field>
    </div>
  );
};
