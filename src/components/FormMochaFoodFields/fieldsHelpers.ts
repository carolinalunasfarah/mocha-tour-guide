import type { FieldConfig, GetFieldConfigParams } from "./fieldConfig";

import type { FormData } from "@/components/DataForm/types";

import { capitalizeFirst } from "@/utils/form/capitalizeFirst";

const getPrefixedField = (
  fieldType: "description" | "imgUrl" | "rating",
  prefix?: "mocha" | "food",
): string => {
  return prefix ? `${prefix}${capitalizeFirst(fieldType)}` : fieldType;
};

const getFieldConfig = ({
  fieldType,
  prefix,
}: GetFieldConfigParams): FieldConfig => {
  const fieldKey = getPrefixedField(fieldType, prefix);
  return {
    fieldName: fieldKey as keyof FormData,
    id: fieldKey,
  };
};

export { getFieldConfig };
