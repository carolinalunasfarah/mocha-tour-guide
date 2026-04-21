import { firestore } from "@/lib/clients/firebase/firebaseConfig";
import {
  collection,
  getDocs,
  query,
  CollectionReference,
  DocumentData,
} from "firebase/firestore";
import { buildQueryConstraints } from "@/utils/queries/buildQueryConstraints";

const getAllDocumentsForCollection = async <T extends { id: string }>(
  collectionName: string,
  searchQuery?: string,
): Promise<T[]> => {
  const collectionRef = collection(
    firestore,
    collectionName,
  ) as CollectionReference<DocumentData>;

  const queryConstraints = buildQueryConstraints(searchQuery);
  const q = query(collectionRef, ...queryConstraints);
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() } as T;
  });
};

export { getAllDocumentsForCollection };
