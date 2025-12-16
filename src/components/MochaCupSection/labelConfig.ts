interface LabelConfig {
  text: string;
  y: number;
  lineX1?: number;
  lineX2?: number;
  textX?: number;
  textYOffset?: number;
}

const LABELS: LabelConfig[] = [
  {
    text: "Crema batida",
    y: 72,
  },
  {
    text: "Leche",
    y: 225,
  },
  {
    text: "Chocolate amargo",
    y: 316,
  },
  {
    text: "Espresso",
    y: 375,
  },
];

const DEFAULT_LINE_X1 = 310;
const DEFAULT_LINE_X2 = 455;
const DEFAULT_TEXT_X = 460;
const DEFAULT_TEXT_Y_OFFSET = 5;

export {
  LABELS,
  DEFAULT_LINE_X1,
  DEFAULT_LINE_X2,
  DEFAULT_TEXT_X,
  DEFAULT_TEXT_Y_OFFSET,
};
