import { useInfiniteQuery } from "@tanstack/react-query";
import { getVisited } from "@/modules/visited/services/getVisited";
import { PaginatedVisitedResult } from "@/modules/visited/services/getVisited/types";
import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";

const useGetVisited = () => {
  return useInfiniteQuery<
    PaginatedVisitedResult,
    Error,
    PaginatedVisitedResult[],
    string[],
    QueryDocumentSnapshot<DocumentData> | null
  >({
    queryKey: ["visited"],
    queryFn: async ({ pageParam }) => {
      return getVisited(pageParam);
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.lastVisible : undefined;
    },
    staleTime: 60 * 60 * 1000,
  });
};

export { useGetVisited };
