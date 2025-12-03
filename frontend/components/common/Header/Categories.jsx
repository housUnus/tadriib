"use client";
import { useState } from "react";
import { ListItem } from "./ListItem";
import { categories } from "./links";

export default function Categories() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  return (
    <>
      <div className="px-3 py-2 text-sm text-gray-500 border-b border-gray-100 mb-2">
        Discover our options
      </div>
      <div
        className={`grid items-start grid-cols-${selectedCategory ? 2 : 1} ${
          selectedCategory ? "w-104" : "w-52"
        }`}
      >
        <div
          className={`w-full grid ${
            selectedCategory && "border-r border-gray-300"
          }`}
        >
          {["quizzes"].map((parent, index) => (
            <div key={parent}>
              <span className="px-3 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {parent}
              </span>
              <ul>
                {categories.filter((category) => category.parent === parent).map((category, index) => (
                  <ListItem
                    href={category.url}
                    title={category.name}
                    setSelectedCategory={setSelectedCategory}
                    key={index}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>
        {selectedCategory && (
          <ul className="grid items-start gap-0">
            {categories
              .find((category) => category.name === selectedCategory)
              .children.map((child, index) => (
                <ListItem
                  href={child.url}
                  title={child.name}
                  isChild={true}
                  key={index}
                />
              ))}
          </ul>
        )}
      </div>
    </>
  );
}
