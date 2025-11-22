import { Label } from "@/components/ui/Label";

import { VisitedFieldsProps } from "./types";

const VisitedFields = ({ rating, nameLowercase }: VisitedFieldsProps) => {
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
          {nameLowercase
            ? ""
            : "Se generará automáticamente basado en el nombre"}
        </div>
      </div>
    </>
  );
};

export { VisitedFields };
