import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { firestore } from '@/lib/clients/firebase/firebaseConfig';
import type { CreateMochaRequest } from './types';

const createMocha = async (data: CreateMochaRequest): Promise<string> => {
  const mochasRef = collection(firestore, 'mochas');
  
  const docRef = await addDoc(mochasRef, {
    ...data,
    createdAt: Timestamp.now(),
  });

  return docRef.id;
};

export { createMocha };

