import { useInfiniteQuery } from "@tanstack/react-query";

import { getFood } from "@/modules/food/services/getFood";
import type { PaginatedFoodResult } from "@/modules/food/services/getFood/types";
import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

const useGetFood = () => {
  return useInfiniteQuery<
    PaginatedFoodResult,
    Error,
    PaginatedFoodResult[],
    string[],
    QueryDocumentSnapshot<DocumentData> | null
  >({
    queryKey: ["food"],
    queryFn: ({ pageParam }) => getFood(pageParam),
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.lastVisible : undefined,
    staleTime: 60 * 60 * 1000,
  });
};

export { useGetFood };
