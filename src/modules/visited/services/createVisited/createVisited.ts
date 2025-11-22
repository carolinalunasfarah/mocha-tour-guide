import { collection, addDoc } from 'firebase/firestore';
import { firestore } from '@/lib/clients/firebase/firebaseConfig';
import type { CreateVisitedRequest } from './types';

const createVisited = async (data: CreateVisitedRequest): Promise<string> => {
  const visitedRef = collection(firestore, 'visited');
  
  const docRef = await addDoc(visitedRef, data);

  return docRef.id;
};

export { createVisited };

