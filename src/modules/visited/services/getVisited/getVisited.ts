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
import { Visited } from "@/modules/visited/domain/types";
import { FETCH_LIMIT, PaginatedVisitedResult } from "./types";

const getVisited = async (
  lastDoc?: QueryDocumentSnapshot<DocumentData> | null,
  searchQuery?: string,
): Promise<PaginatedVisitedResult> => {
  const visitedRef = collection(firestore, "visited");
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

  const q = query(visitedRef, ...queryConstraints);

  const snapshot = await getDocs(q);
  const visited = snapshot.docs.map((doc) => {
    const data = doc.data() as Visited;
    return { id: doc.id, ...data };
  });

  const lastVisible =
    snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1] : null;

  const hasMore = snapshot.docs.length === FETCH_LIMIT;

  return { visited, lastVisible, hasMore };
};

export { getVisited };
