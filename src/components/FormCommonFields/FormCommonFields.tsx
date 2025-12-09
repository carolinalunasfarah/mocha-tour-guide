import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

import { FormCommonFieldsProps } from "./types";

const FormCommonFields = ({
  register,
  errors,
  nameLowercase,
}: FormCommonFieldsProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="name">Nombre *</Label>
        <Input
          id="name"
          {...register("name", {
            required: "El nombre es requerido",
          })}
        />
        {errors.name && (
          <p className="text-sm text-destructive cursor-default">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="nameLowercase">Nombre (minúsculas)</Label>
        <Input
          id="nameLowercase"
          value={nameLowercase}
          readOnly
          className="bg-muted cursor-not-allowed"
        />
        <p className="text-xs text-muted-foreground cursor-default">
          Se genera automáticamente desde el nombre
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Dirección *</Label>
        <Input
          id="address"
          {...register("address", {
            required: "La dirección es requerida",
          })}
        />
        {errors.address && (
          <p className="text-sm text-destructive cursor-default">
            {errors.address.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="latitude">Latitud *</Label>
          <Input
            id="latitude"
            type="number"
            step="any"
            {...register("latitude", {
              required: "La latitud es requerida",
              valueAsNumber: true,
            })}
          />
          {errors.latitude && (
            <p className="text-sm text-destructive cursor-default">
              {errors.latitude.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="longitude">Longitud *</Label>
          <Input
            id="longitude"
            type="number"
            step="any"
            {...register("longitude", {
              required: "La longitud es requerida",
              valueAsNumber: true,
            })}
          />
          {errors.longitude && (
            <p className="text-sm text-destructive cursor-default">
              {errors.longitude.message}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export { FormCommonFields };
