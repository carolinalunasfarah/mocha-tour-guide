import { firestore } from '@/lib/clients/firebase/firebaseConfig';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { Mocha } from '../../domain/types';

const getMochas = async (): Promise<Mocha[]> => {
  const mochasRef = collection(firestore, 'mochas');
  const q = query(mochasRef, orderBy('createdAt', 'asc'));

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => {
    const data = doc.data() as Mocha;
    return { id: doc.id, ...data };
  });
};

export { getMochas };
