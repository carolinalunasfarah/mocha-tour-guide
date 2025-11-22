import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";

import { FormMochaFoodFieldsProps } from "./types";
import { getFieldConfig } from "./fieldsHelpers";

const FormMochaFoodFields = ({
  register,
  errors,
  prefix,
}: FormMochaFoodFieldsProps) => {
  const descriptionConfig = getFieldConfig({
    fieldType: "description",
    prefix,
  });
  const imgUrlConfig = getFieldConfig({ fieldType: "imgUrl", prefix });
  const ratingConfig = getFieldConfig({ fieldType: "rating", prefix });

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor={descriptionConfig.id}>Descripción *</Label>
        <Textarea
          id={descriptionConfig.id}
          rows={4}
          {...register(descriptionConfig.fieldName, {
            required: "La descripción es requerida",
          })}
        />
        {errors[descriptionConfig.fieldName] && (
          <p className="text-sm text-destructive cursor-default">
            {errors[descriptionConfig.fieldName]?.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor={imgUrlConfig.id}>URL de imagen *</Label>
        <Input
          id={imgUrlConfig.id}
          type="url"
          {...register(imgUrlConfig.fieldName, {
            required: "La URL de imagen es requerida",
          })}
        />
        {errors[imgUrlConfig.fieldName] && (
          <p className="text-sm text-destructive cursor-default">
            {errors[imgUrlConfig.fieldName]?.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor={ratingConfig.id}>Rating *</Label>
        <Input
          id={ratingConfig.id}
          type="number"
          step="1"
          min="1"
          max="5"
          {...register(ratingConfig.fieldName, {
            required: "El rating es requerido",
            valueAsNumber: true,
          })}
        />
        {errors[ratingConfig.fieldName] && (
          <p className="text-sm text-destructive cursor-default">
            {errors[ratingConfig.fieldName]?.message}
          </p>
        )}
      </div>
    </>
  );
};

export { FormMochaFoodFields };
