import { Label } from "@/components/ui/Label";

import { checkboxes } from "./checkboxConfig";
import type { FormCheckboxesProps } from "./types";

const FormCheckboxes = ({ register }: FormCheckboxesProps) => {
  return (
    <div className="space-y-3 p-4 border rounded-md">
      <Label className="text-base font-semibold">Selecciona qué crear:</Label>
      <div className="space-y-2">
        {checkboxes.map((checkbox) => (
          <div key={checkbox.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={checkbox.id}
              {...register(checkbox.fieldName)}
              className="h-4 w-4 rounded border-gray-300"
            />
            <Label htmlFor={checkbox.id} className="cursor-pointer">
              {checkbox.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export { FormCheckboxes };
