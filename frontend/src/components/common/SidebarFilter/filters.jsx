"use client";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Star } from "lucide-react";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { useFilterQuery } from "@/hooks/useFilterQuery";
import { Controller } from "react-hook-form";
import { useClientFetch } from "@/hooks/auth/use-client-fetch";
import { useQuery } from "@tanstack/react-query";

export const FilterSidebar = ({ form }) => {
  const [ratingOpen, setRatingOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [levelOpen, setLevelOpen] = useState(true);
  const [durationOpen, setDurationOpen] = useState(true);
  const [categoryOpen, setCategoryOpen] = useState(true);
  const client = useClientFetch()
  
  const {data: categories} = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const {data, error} = await client.get("/categories/");
      return data?.results || [];
    },
  });

  const { params, setParams, fetch } = useFilterQuery({
    key: "courses",
    fetcher: () => [],
    schemas: {
      price: { type: "array" },
      level: { type: "array" },
      sortBy: { type: "string" },
      duration: { type: "array" },
      categories: { type: "array" },
      rating: { type: "array" },
    },
  });

  const onSubmit = (data) => {
    setParams(data);
  };

  useEffect(() => {
    const subscription = form.watch((value) => {
      setParams(value);
    });

    return () => subscription.unsubscribe();
  }, [form]);

  useEffect(() => {
    form.reset(params);
  }, []);

  useEffect(() => {
    console.log("🚀 ~ Rendering....", params)
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
          <Controller
            name="rating"
            control={form.control}
            defaultValue={[]}
            render={({ field }) => (
              <div className="mt-4 space-y-3">
                {["4.5", "4.0", "3.5", "3.0"].map((value, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <Checkbox
                      checked={field.value?.includes(value)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          field.onChange([...field.value, value]);
                        } else {
                          field.onChange(
                            field.value.filter((v) => v !== value),
                          );
                        }
                      }}
                    />
                    <label className="flex items-center gap-1 text-sm font-medium cursor-pointer">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{value} & up</span>
                    </label>
                  </div>
                ))}
              </div>
            )}
          />
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
          <Controller
            name="price"
            control={form.control}
            defaultValue={[]}
            render={({ field }) => (
              <div className="mt-4 space-y-3">
                {["free", "paid"].map((value, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <Checkbox
                      checked={field.value?.includes(value)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          field.onChange([...field.value, value]);
                        } else {
                          field.onChange(
                            field.value.filter((v) => v !== value),
                          );
                        }
                      }}
                    />
                    <label
                      className="text-sm font-medium cursor-pointer capitalize"
                    >
                      {value}
                    </label>
                  </div>
                ))}
              </div>
            )}
          />
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
          <Controller
            name="level"
            control={form.control}
            defaultValue={[]}
            render={({ field }) => (
              <div className="mt-4 space-y-3">
                {["Beginner", "Intermediate", "Advanced"].map((value, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <Checkbox
                      checked={field.value?.includes(value)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          field.onChange([...field.value, value]);
                        } else {
                          field.onChange(
                            field.value.filter((v) => v !== value),
                          );
                        }
                      }}
                    />
                    <label
                      className="text-sm font-medium cursor-pointer"
                    >
                      {value}
                    </label>
                  </div>
                ))}
              </div>
            )}
          />
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
          <Controller
            name="duration"
            control={form.control}
            defaultValue={[]}
            render={({ field }) => (
              <div className="mt-4 space-y-3">
                {[
                  { id: "short", label: "0-2 hours" },
                  { id: "medium", label: "2-3 hours" },
                  { id: "long", label: "3+ hours" },
                ].map((duration, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      checked={field.value?.includes(duration.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          field.onChange([...field.value, duration.id]);
                        } else {
                          field.onChange(
                            field.value.filter((v) => v !== duration.id),
                          );
                        }
                      }}
                    />
                    <label
                      className="text-sm font-medium cursor-pointer"
                    >
                      {duration.label}
                    </label>
                  </div>
                ))}
              </div>
            )}
          />
        </CollapsibleContent>
      </Collapsible>

      <div className="border-t pt-6" />
      {/* Categories Filter */}
      <Collapsible open={categoryOpen} onOpenChange={setCategoryOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full group">
          <h3 className="font-bold text-base text-gray-900">Categories</h3>
          {categoryOpen ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4 space-y-3">
        <Controller
            name="categories"
            control={form.control}
            defaultValue={[]}
            render={({ field }) => (
              <div className="mt-4 space-y-3">
                {categories?.map((category, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <Checkbox
                      checked={field.value?.includes(category.slug)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          field.onChange([...field.value, category.slug]);
                        } else {
                          field.onChange(
                            field.value.filter((v) => v !== category.slug),
                          );
                        }
                      }}
                    />
                    <label
                      className="text-sm font-medium cursor-pointer"
                    >
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            )}
          />
        </CollapsibleContent>
      </Collapsible>
      {/* <Field orientation="horizontal">
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          Reset
        </Button>
        <Button onClick={form.handleSubmit(onSubmit)}>Submit</Button>
      </Field> */}
    </div>
  );
};
