import { useEffect, useCallback } from "react";
import { GeoPoint } from "firebase/firestore";
import { useCreateVisited } from "@/modules/visited/hooks/useCreateVisited";

import { FormData } from "@/components/DataForm/types";

import { VisitedSectionProps } from "./types";
import { Label } from "../ui/Label";
import { Input } from "../ui/Input";

const VisitedSection = ({
  rating,
  nameLowercase,
  isMochaActive,
  register,
  errors,
  onSubmitReady,
}: VisitedSectionProps) => {
  const createVisitedMutation = useCreateVisited();

  const handleSubmit = useCallback(
    async (data: FormData): Promise<void> => {
      if (!data.name || !data.nameLowercase) {
        throw new Error("Para crear visited, el nombre es requerido");
      }

      // Si hay mocha, usar su rating; si no, usar el rating general
      const visitedRating = isMochaActive
        ? data.createMocha && data.createFood
          ? data.mochaRating
          : data.rating
        : data.rating;

      await createVisitedMutation.mutateAsync({
        name: data.name,
        location: new GeoPoint(data.latitude, data.longitude),
        rating: visitedRating,
        nameLowercase: data.nameLowercase,
      });
    },
    [createVisitedMutation, isMochaActive],
  );

  useEffect(() => {
    onSubmitReady(handleSubmit);
  }, [handleSubmit, onSubmitReady]);

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="rating">
          Rating{isMochaActive ? " (sincronizado con Mocha)" : " *"}
        </Label>
        {isMochaActive ? (
          <div className="p-2 rounded-md bg-muted border text-sm cursor-default">
            {rating}
          </div>
        ) : (
          <>
            <Input
              id="rating"
              type="number"
              step="1"
              min="1"
              max="5"
              {...register("rating", {
                required: "El rating es requerido",
                valueAsNumber: true,
              })}
            />
            {errors.rating && (
              <p className="text-sm text-destructive cursor-default">
                {errors.rating?.message}
              </p>
            )}
          </>
        )}
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
