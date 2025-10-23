import { GeoPoint } from 'firebase/firestore';

type Visited = {
    id: string;
    location: GeoPoint;
    name: string;
    rating: number;
}

export type { Visited };
