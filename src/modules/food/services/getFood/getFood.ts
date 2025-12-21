import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { Food } from "@/modules/food/domain/types";
import { getPaginatedData } from "@/modules/shared/services/getPaginatedData";
import type { PaginatedFoodResult } from "./types";

const getFood = async (
  lastDoc?: QueryDocumentSnapshot<DocumentData> | null,
  searchQuery?: string,
): Promise<PaginatedFoodResult> => {
  const result = await getPaginatedData<Food>("food", lastDoc, searchQuery);

  return {
    food: result.data,
    lastVisible: result.lastVisible,
    hasMore: result.hasMore,
    total: result.total,
  };
};

export { getFood };
