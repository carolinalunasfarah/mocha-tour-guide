import { UseFormRegister, FieldErrors } from "react-hook-form";
import { FormData } from "@/components/DataForm/types";

type VisitedSectionProps = {
  rating: number;
  nameLowercase: string;
  isMochaActive: boolean;
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  onSubmitReady: (handleSubmit: (data: FormData) => Promise<void>) => void;
};

export type { VisitedSectionProps };
