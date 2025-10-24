import { firestore } from '@/lib/clients/firebase/firebaseConfig';

import { doc, getDoc } from 'firebase/firestore';

import { Mocha } from '@/modules/mochas/domain/types';
import { GetMochaByIdRequest } from './types';

const getMochaById = async ({ id }: GetMochaByIdRequest): Promise<Mocha | null> => {
  const mochaDocRef = doc(firestore, 'mochas', id);
  const snapshot = await getDoc(mochaDocRef);

  if (!snapshot.exists()) return null;
  return snapshot.data() as Mocha;
};

export { getMochaById };
