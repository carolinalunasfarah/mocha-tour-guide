import { FieldErrors, UseFormRegister } from "react-hook-form";

import type { FormData } from "@/components/DataForm/types";

type FormCommonFieldsProps = {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
};

export type { FormCommonFieldsProps };
