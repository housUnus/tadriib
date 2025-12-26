import React, { useMemo, forwardRef } from "react";
import Select from "react-select";
import { defaultClassNames, defaultStyles } from "./helper";
import {
  ClearIndicator,
  DropdownIndicator,
  MultiValueRemove,
  Option
} from "./components";

const SimpleValueSelect = forwardRef(
  (
    {
      value,
      onChange,
      options = [],
      styles = defaultStyles,
      classNames = defaultClassNames,
      components = {},
      ...rest
    },
    ref
  ) => {
    // Convert primitive value to option object for react-select
    const selectedOption = useMemo(() => {
      return options.find((opt) => opt.value === value) || null;
    }, [value, options]);

    const handleChange = (selected) => {
      onChange?.(selected ? selected.value : null);
    };

    return (
      <Select
        ref={ref}
        value={selectedOption}
        onChange={handleChange}
        options={options}
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

SimpleValueSelect.displayName = "SimpleValueSelect";
export default SimpleValueSelect;
