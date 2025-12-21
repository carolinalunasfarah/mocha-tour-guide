import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

import type { Food } from "@/modules/food/domain/types";

type PaginatedFoodResult = {
  food: Food[];
  lastVisible: QueryDocumentSnapshot<DocumentData> | null;
  hasMore: boolean;
  total?: number;
};

const FETCH_LIMIT = 8;

export type { PaginatedFoodResult };
export { FETCH_LIMIT };
