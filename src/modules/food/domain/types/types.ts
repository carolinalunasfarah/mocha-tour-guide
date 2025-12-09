import { GeoPoint } from "firebase/firestore";

type Food = {
  id: string;
  address: string;
  createdAt: Date;
  description: string;
  imgUrl: string;
  location: GeoPoint;
  name: string;
  rating: number;
  nameLowercase: string;
};

export type { Food };
