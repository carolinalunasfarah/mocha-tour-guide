import { GeoPoint } from "firebase/firestore";

type LocationCardProps = {
  id: string;
  name: string;
  address?: string;
  imgUrl?: string;
  location?: GeoPoint;
  domain?: "mochas" | "reposteria" | "visited";
  rating: number;
};

export type { LocationCardProps };
