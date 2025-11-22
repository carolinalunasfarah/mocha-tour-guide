import { GeoPoint } from "firebase/firestore";

type UseCreateVisitedParams = {
  name: string;
  location: GeoPoint;
  rating: number;
  nameLowercase: string;
};

export type { UseCreateVisitedParams };
