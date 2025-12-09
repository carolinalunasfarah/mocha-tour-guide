import { useInfiniteQuery } from "@tanstack/react-query";

import { getFood } from "@/modules/food/services/getFood";
import type { PaginatedFoodResult } from "@/modules/food/services/getFood/types";
import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

const useGetFood = (searchQuery?: string) => {
  return useInfiniteQuery<
    PaginatedFoodResult,
    Error,
    PaginatedFoodResult[],
    (string | undefined)[],
    QueryDocumentSnapshot<DocumentData> | null
  >({
    queryKey: ["food", searchQuery],
    queryFn: ({ pageParam }) => getFood(pageParam, searchQuery),
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.lastVisible : undefined,
    staleTime: 60 * 60 * 1000,
  });
};

export { useGetFood };
