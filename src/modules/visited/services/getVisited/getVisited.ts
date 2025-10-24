import { firestore } from '@/lib/clients/firebase/firebaseConfig';

import { collection, getDocs, query } from 'firebase/firestore';

import { Visited } from '@/modules/visited/domain/types';

const getVisited = async (): Promise<Visited[]> => {
  const visitedRef = collection(firestore, 'visited');
  const q = query(visitedRef);

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => {
    const data = doc.data() as Visited;
    return { id: doc.id, ...data };
  });
};

export { getVisited };
