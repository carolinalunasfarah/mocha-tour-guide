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
} from "firebase/firestore";
import { Visited } from "@/modules/visited/domain/types";
import { FETCH_LIMIT, PaginatedVisitedResult } from "./types";

const getVisited = async (
  lastDoc?: QueryDocumentSnapshot<DocumentData> | null,
): Promise<PaginatedVisitedResult> => {
  const visitedRef = collection(firestore, "visited");
  let q;

  if (lastDoc) {
    q = query(
      visitedRef,
      orderBy("rating", "desc"),
      startAfter(lastDoc),
      limit(FETCH_LIMIT),
    );
  } else {
    q = query(visitedRef, orderBy("rating", "desc"), limit(FETCH_LIMIT));
  }

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
