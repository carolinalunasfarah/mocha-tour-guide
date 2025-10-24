import { firestore } from '@/lib/clients/firebase/firebaseConfig';

import { doc, getDoc } from 'firebase/firestore';

import { Food } from '@/modules/food/domain/types';

import { GetFoodByIdRequest } from './types';

const getFoodById = async ({ id }: GetFoodByIdRequest): Promise<Food | null> => {
  const mochaDocRef = doc(firestore, 'food', id);
  const snapshot = await getDoc(mochaDocRef);

  if (!snapshot.exists()) return null;
  return snapshot.data() as Food;
};

export { getFoodById };
