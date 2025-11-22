type CheckboxConfig = {
  id: string;
  fieldName: "createMocha" | "createFood" | "createVisited";
  label: string;
};

const checkboxes: CheckboxConfig[] = [
  {
    id: "createMocha",
    fieldName: "createMocha",
    label: "Crear Mocha",
  },
  {
    id: "createFood",
    fieldName: "createFood",
    label: "Crear Repostería",
  },
  {
    id: "createVisited",
    fieldName: "createVisited",
    label: "Crear Lugar Visitado",
  },
];

export { checkboxes };
