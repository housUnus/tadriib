import _ from "lodash";

export const countActiveFilters = (values: any) => {
  const excludedKeys = ["page", "pageSize", "sortBy", "search"];

  return _.chain(values)
    .omit(excludedKeys)
    .pickBy((value) => {
      if (_.isNil(value)) return false;
      if (_.isString(value)) return value.trim() !== "";
      if (_.isArray(value)) return value.length > 0;
      return true;
    })
    .size()
    .value();
};