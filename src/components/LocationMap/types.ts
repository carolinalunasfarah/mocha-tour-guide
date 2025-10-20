import { GeoPoint } from "firebase/firestore";

type LocationMapProps = {
    point: GeoPoint;
    zoom?: number;
    className?: string;
    iconUrl?: string;
    locationName?: string;
  };

export type { LocationMapProps };
