import * as React from 'react';
import type {
  ClearIndicatorProps,
  DropdownIndicatorProps,
  MultiValueRemoveProps,
  OptionProps
} from 'react-select';
import { components } from 'react-select';
import { ChevronsUpDown, Check, X } from "lucide-react";
interface OptionType {
  label: string;
  value: string;
}


export const DropdownIndicator = (props: DropdownIndicatorProps) => {
  return (
    <components.DropdownIndicator {...props}>
      <ChevronsUpDown className={'h-4 w-4 opacity-50'} />
    </components.DropdownIndicator>
  );
};

export const ClearIndicator = (props: ClearIndicatorProps) => {
  return (
    <components.ClearIndicator {...props}>
      <X className={'h-3.5 w-3.5 opacity-50'} />
    </components.ClearIndicator>
  );
};

export const MultiValueRemove = (props: MultiValueRemoveProps) => {
  return (
    <components.MultiValueRemove {...props}>
      <X className={'h-3 w-3 opacity-50'} />
    </components.MultiValueRemove>
  );
};

export const Option = (props: OptionProps<OptionType>) => {
  return (
    <components.Option {...props}>
      <div className="flex items-center justify-between">
        <div>{props?.data?.label}</div>
        {props.isSelected && <Check />}
      </div>
    </components.Option>
  );
};
