import { GeoPoint } from "firebase/firestore";

type MapPopupProps = {
  locationName: string;
  rating?: number;
  point: GeoPoint;
};

export type { MapPopupProps };
