import { Visited } from "@/modules/visited/domain/types";

type VisitedMapProps = {
  locations: Visited[];
  center?: [number, number];
  zoom?: number;
  className?: string;
};

export type { VisitedMapProps };
