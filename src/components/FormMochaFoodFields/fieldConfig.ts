import type { FormData } from "@/components/DataForm/types";

type FieldType = "description" | "imgUrl" | "rating";

type FieldConfig = {
  fieldName: keyof FormData;
  id: string;
};

type GetFieldConfigParams = {
  fieldType: FieldType;
  prefix?: "mocha" | "food";
};

export type { FieldType, FieldConfig, GetFieldConfigParams };
