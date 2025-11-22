import { FieldErrors, UseFormRegister } from "react-hook-form";
import type { FormData } from "@/components/DataForm/types";

type FormMochaFoodFieldsProps = {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  prefix?: "mocha" | "food";
};

export type { FormMochaFoodFieldsProps };
