import { GeoPoint } from "firebase/firestore";

type CreateMochaRequest = {
  name: string;
  address: string;
  description: string;
  imgUrl: string;
  rating: number;
  location: GeoPoint;
  nameLowercase: string;
};

export type { CreateMochaRequest };
