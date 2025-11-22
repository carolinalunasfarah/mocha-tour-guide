import { useEffect, useCallback } from "react";
import { GeoPoint } from "firebase/firestore";
import { useCreateVisited } from "@/modules/visited/hooks/useCreateVisited";

import { FormData } from "@/components/DataForm/types";

import { VisitedSectionProps } from "./types";
import { Label } from "../ui/Label";

const VisitedSection = ({
  rating,
  nameLowercase,
  onSubmitReady,
}: VisitedSectionProps) => {
  const createVisitedMutation = useCreateVisited();

  const handleSubmit = useCallback(
    async (data: FormData): Promise<void> => {
      if (!data.name || !data.nameLowercase) {
        throw new Error("Para crear visited, el nombre es requerido");
      }

      await createVisitedMutation.mutateAsync({
        name: data.name,
        location: new GeoPoint(data.latitude, data.longitude),
        rating: data.rating,
        nameLowercase: data.nameLowercase,
      });
    },
    [createVisitedMutation],
  );

  useEffect(() => {
    onSubmitReady(handleSubmit);
  }, [handleSubmit, onSubmitReady]);

  return (
    <>
      <div className="space-y-2">
        <Label>Rating (sincronizado con Mocha)</Label>
        <div className="p-2 rounded-md bg-muted border text-sm cursor-default">
          {rating}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Nombre normalizado (generado automáticamente)</Label>
        <div className="p-2 rounded-md bg-muted border text-sm cursor-default">
          {nameLowercase || "Se generará automáticamente basado en el nombre"}
        </div>
      </div>
    </>
  );
};

export { VisitedSection };
