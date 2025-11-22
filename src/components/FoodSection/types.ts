import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormData } from "@/components/DataForm/types";

type FoodSectionProps = {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  otherEntityExists: boolean;
  onSubmitReady: (handleSubmit: (data: FormData) => Promise<void>) => void;
};

export type { FoodSectionProps };
