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
  where,
} from "firebase/firestore";
import { Food } from "@/modules/food/domain/types";
import { FETCH_LIMIT, PaginatedFoodResult } from "./types";

const getFood = async (
  lastDoc?: QueryDocumentSnapshot<DocumentData> | null,
  searchQuery?: string,
): Promise<PaginatedFoodResult> => {
  const foodRef = collection(firestore, "food");
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

  const q = query(foodRef, ...queryConstraints);

  const snapshot = await getDocs(q);
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
