import { useEffect, useCallback } from "react";
import { GeoPoint } from "firebase/firestore";
import { useCreateFood } from "@/modules/food/hooks/useCreateFood";

import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";
import { FormData } from "@/components/DataForm/types";

import { FoodSectionProps } from "./types";

const FoodSection = ({
  register,
  errors,
  otherEntityExists,
  onSubmitReady,
}: FoodSectionProps) => {
  const createFoodMutation = useCreateFood();

  const handleSubmit = useCallback(
    async (data: FormData): Promise<void> => {
      const description = otherEntityExists
        ? data.foodDescription
        : data.description;
      const imgUrl = otherEntityExists ? data.foodImgUrl : data.imgUrl;
      const rating = otherEntityExists ? data.foodRating : data.rating;

      await createFoodMutation.mutateAsync({
        name: data.name,
        address: data.address,
        description,
        imgUrl,
        rating,
        location: new GeoPoint(data.latitude, data.longitude),
      });
    },
    [createFoodMutation, otherEntityExists],
  );

  useEffect(() => {
    onSubmitReady(handleSubmit);
  }, [handleSubmit, onSubmitReady]);

  const descriptionField = otherEntityExists
    ? "foodDescription"
    : "description";
  const imgUrlField = otherEntityExists ? "foodImgUrl" : "imgUrl";
  const ratingField = otherEntityExists ? "foodRating" : "rating";

  return (
    <div className="p-4 border rounded-md space-y-4 bg-muted/30">
      <h3 className="font-semibold text-base cursor-default">Food</h3>

      <div className="space-y-2">
        <Label htmlFor={descriptionField}>Descripción *</Label>
        <Textarea
          id={descriptionField}
          rows={4}
          {...register(descriptionField, {
            required: "La descripción es requerida",
          })}
        />
        {errors[descriptionField] && (
          <p className="text-sm text-destructive cursor-default">
            {errors[descriptionField]?.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor={imgUrlField}>URL de imagen *</Label>
        <Input
          id={imgUrlField}
          type="url"
          {...register(imgUrlField, {
            required: "La URL de imagen es requerida",
          })}
        />
        {errors[imgUrlField] && (
          <p className="text-sm text-destructive cursor-default">
            {errors[imgUrlField]?.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor={ratingField}>Rating *</Label>
        <Input
          id={ratingField}
          type="number"
          step="1"
          min="1"
          max="5"
          {...register(ratingField, {
            required: "El rating es requerido",
            valueAsNumber: true,
          })}
        />
        {errors[ratingField] && (
          <p className="text-sm text-destructive cursor-default">
            {errors[ratingField]?.message}
          </p>
        )}
      </div>
    </div>
  );
};

export { FoodSection };
