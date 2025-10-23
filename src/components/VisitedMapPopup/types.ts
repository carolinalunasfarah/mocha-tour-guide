import { GeoPoint } from "firebase/firestore";

type VisitedMapPopupProps = {
    locationName: string;
    rating: number;
    point: GeoPoint;
  };

export type { VisitedMapPopupProps };
