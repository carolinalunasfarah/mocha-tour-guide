import { GeoPoint } from "firebase/firestore";

type MappableLocation = {
  name: string;
  rating: number;
  location: GeoPoint;
};

type VisitedMapProps = {
  locations: MappableLocation[];
  zoom?: number;
  className?: string;
};

export type { MappableLocation, VisitedMapProps };
