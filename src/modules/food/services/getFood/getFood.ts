import { firestore } from '@/lib/clients/firebase/firebaseConfig';

import { collection, getDocs, orderBy, query } from 'firebase/firestore';

import { Food } from '@/modules/food/domain/types';

const getFood = async (): Promise<Food[]> => {
  const foodRef = collection(firestore, 'food');
  const q = query(foodRef, orderBy('rating', 'desc'));

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => {
    const data = doc.data() as Food;
    return { id: doc.id, ...data };
  });
};

export { getFood };
