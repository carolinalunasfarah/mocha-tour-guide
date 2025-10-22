import { GeoPoint } from "firebase/firestore";

type LocationMapProps = {
    point: GeoPoint;
    zoom?: number;
    className?: string;
    locationName?: string;
  };

export type { LocationMapProps };
