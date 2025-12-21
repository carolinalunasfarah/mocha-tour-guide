import { firestore } from "@/lib/clients/firebase/firebaseConfig";
import {
  collection,
  getDocs,
  orderBy,
  query,
  limit,
  startAfter,
  type DocumentData,
  type QueryDocumentSnapshot,
  where,
  type QueryConstraint,
  getCountFromServer,
  type CollectionReference,
} from "firebase/firestore";
import { PaginatedResult } from "./types";

const FETCH_LIMIT = 8;

const buildQueryConstraints = (searchQuery?: string): QueryConstraint[] => {
  const constraints: QueryConstraint[] = [];

  if (searchQuery) {
    const lowerCaseSearchQuery = searchQuery.toLowerCase();
    constraints.push(where("nameLowercase", ">=", lowerCaseSearchQuery));
    constraints.push(
      where("nameLowercase", "<=", lowerCaseSearchQuery + "\uf8ff"),
    );
    constraints.push(orderBy("nameLowercase", "asc"));
  } else {
    constraints.push(orderBy("rating", "desc"));
  }

  return constraints;
};

const getPaginatedData = async <T extends { id: string }>(
  collectionName: string,
  lastDoc?: QueryDocumentSnapshot<DocumentData> | null,
  searchQuery?: string,
): Promise<PaginatedResult<T>> => {
  const collectionRef = collection(
    firestore,
    collectionName,
  ) as CollectionReference<DocumentData>;

  const queryConstraints = buildQueryConstraints(searchQuery);

  if (lastDoc) {
    queryConstraints.push(startAfter(lastDoc));
  }
  queryConstraints.push(limit(FETCH_LIMIT));

  const q = query(collectionRef, ...queryConstraints);

  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => {
    const docData = doc.data();
    return { id: doc.id, ...docData } as T;
  });

  const lastVisible =
    snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1] : null;

  const hasMore = snapshot.docs.length === FETCH_LIMIT;

  let total: number | undefined;
  if (!lastDoc) {
    const countQueryConstraints = buildQueryConstraints(searchQuery);
    const countQuery = query(collectionRef, ...countQueryConstraints);
    const countSnapshot = await getCountFromServer(countQuery);
    total = countSnapshot.data().count;
  }

  return { data, lastVisible, hasMore, total };
};

export { getPaginatedData, FETCH_LIMIT };
export type { PaginatedResult };
