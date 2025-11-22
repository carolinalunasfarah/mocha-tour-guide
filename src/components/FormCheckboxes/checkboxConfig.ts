type CheckboxConfig = {
  id: string;
  fieldName: "createMocha" | "createFood";
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
];

export { checkboxes };
