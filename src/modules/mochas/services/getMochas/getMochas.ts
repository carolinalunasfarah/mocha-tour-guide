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
import { Mocha } from "@/modules/mochas/domain/types";
import { FETCH_LIMIT, PaginatedMochaResult } from "./types";

const getMochas = async (
  lastDoc?: QueryDocumentSnapshot<DocumentData> | null,
): Promise<PaginatedMochaResult> => {
  const mochasRef = collection(firestore, "mochas");
  let q;

  if (lastDoc) {
    q = query(
      mochasRef,
      orderBy("rating", "desc"),
      startAfter(lastDoc),
      limit(FETCH_LIMIT),
    );
  } else {
    q = query(mochasRef, orderBy("rating", "desc"), limit(FETCH_LIMIT));
  }

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
