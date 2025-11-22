import { FormData } from "@/components/DataForm/types";

type VisitedSectionProps = {
  rating: number;
  nameLowercase: string;
  onSubmitReady: (handleSubmit: (data: FormData) => Promise<void>) => void;
};

export type { VisitedSectionProps };
