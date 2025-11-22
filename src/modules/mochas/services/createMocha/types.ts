import { GeoPoint } from 'firebase/firestore';

type CreateMochaRequest = {
  name: string;
  address: string;
  description: string;
  imgUrl: string;
  rating: number;
  location: GeoPoint;
};

export type { CreateMochaRequest };

