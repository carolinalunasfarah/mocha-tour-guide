import { firestore } from "@/lib/clients/firebase/firebaseConfig";
import {
  collection,
  getDocs,
  orderBy,
  query,
  limit,
  startAfter,
  DocumentData,
  QueryDocumentSnapshot,
  where,
  QueryConstraint,
} from "firebase/firestore";
import { Mocha } from "@/modules/mochas/domain/types";
import { FETCH_LIMIT, PaginatedMochaResult } from "./types";

const getMochas = async (
  lastDoc?: QueryDocumentSnapshot<DocumentData> | null,
  searchQuery?: string,
): Promise<PaginatedMochaResult> => {
  const mochasRef = collection(firestore, "mochas");
  const queryConstraints: QueryConstraint[] = [];

  if (searchQuery) {
    const lowerCaseSearchQuery = searchQuery.toLowerCase();
    queryConstraints.push(where("nameLowercase", ">=", lowerCaseSearchQuery));
    queryConstraints.push(
      where("nameLowercase", "<=", lowerCaseSearchQuery + "\uf8ff"),
    );
    queryConstraints.push(orderBy("nameLowercase", "asc"));
  } else {
    queryConstraints.push(orderBy("rating", "desc"));
  }

  if (lastDoc) {
    queryConstraints.push(startAfter(lastDoc));
  }
  queryConstraints.push(limit(FETCH_LIMIT));

  const q = query(mochasRef, ...queryConstraints);

  const snapshot = await getDocs(q);
  const mochas = snapshot.docs.map((doc) => {
    const data = doc.data() as Mocha;
    return { id: doc.id, ...data };
  });

  const lastVisible =
    snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1] : null;

  const hasMore = snapshot.docs.length === FETCH_LIMIT;

  return { mochas, lastVisible, hasMore };
};

export { getMochas };
