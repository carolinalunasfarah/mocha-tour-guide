import { firestore } from "@/lib/clients/firebase/firebaseConfig";
import {
  collection,
  getDocs,
  orderBy,
  query,
  startAfter,
  limit,
  type DocumentData,
  type QueryDocumentSnapshot,
  type QueryConstraint,
} from "firebase/firestore";

import type { Food } from "@/modules/food/domain/types";

import { FETCH_LIMIT, PaginatedFoodResult } from "./types";

const getFood = async (
  lastDoc?: QueryDocumentSnapshot<DocumentData> | null,
): Promise<PaginatedFoodResult> => {
  const foodRef = collection(firestore, "food");
  const constraints: QueryConstraint[] = [
    orderBy("rating", "desc"),
    limit(FETCH_LIMIT),
  ];

  if (lastDoc) {
    constraints.push(startAfter(lastDoc));
  }

  const snapshot = await getDocs(query(foodRef, ...constraints));

  const food = snapshot.docs.map((doc) => {
    const data = doc.data() as Food;
    return { id: doc.id, ...data };
  });

  const lastVisible =
    snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1] : null;

  const hasMore = snapshot.docs.length === FETCH_LIMIT;

  return { food, lastVisible, hasMore };
};

export { getFood };
