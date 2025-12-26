import React, { useMemo, forwardRef } from "react";
import Select from "react-select";
import { defaultClassNames, defaultStyles } from "./helper";
import {
  ClearIndicator,
  DropdownIndicator,
  MultiValueRemove,
  Option
} from "./components";

const CustomSelect = forwardRef(
  (
    {
      value,
      onChange,
      options = [],
      simpleValue = false, // 👈 control output mode
      isMulti = false,
      styles = defaultStyles,
      classNames = defaultClassNames,
      components = {},
      ...rest
    },
    ref
  ) => {
    // 🔸 Convert primitive value(s) to object(s)
    const selectedOption = useMemo(() => {
      if (!simpleValue) return value;
      if (isMulti && Array.isArray(value)) {
        return options.filter((opt) => value.includes(opt.value));
      }
      return options.find((opt) => opt.value === value) || null;
    }, [value, options, simpleValue, isMulti]);

    // 🔸 Convert object(s) to primitive value(s) when simpleValue = true
    const handleChange = (selected) => {
      if (!simpleValue) {
        onChange?.(selected);
        return;
      }

      if (isMulti) {
        onChange?.(selected ? selected.map((s) => s.value) : []);
      } else {
        onChange?.(selected ? selected.value : null);
      }
    };

    return (
      <Select
        ref={ref}
        value={selectedOption}
        onChange={handleChange}
        options={options}
        isMulti={isMulti}
        unstyled
        components={{
          DropdownIndicator,
          ClearIndicator,
          MultiValueRemove,
          Option,
          ...components
        }}
        styles={styles}
        classNames={classNames}
        {...rest}
      />
    );
  }
);

CustomSelect.displayName = "CustomSelect";
export default CustomSelect;
