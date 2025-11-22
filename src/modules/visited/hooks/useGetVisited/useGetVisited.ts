import { useInfiniteQuery } from "@tanstack/react-query";
import { getVisited } from "@/modules/visited/services/getVisited";
import { PaginatedVisitedResult } from "@/modules/visited/services/getVisited/types";
import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";

const useGetVisited = (searchQuery?: string) => {
  return useInfiniteQuery<
    PaginatedVisitedResult,
    Error,
    PaginatedVisitedResult[],
    (string | undefined)[],
    QueryDocumentSnapshot<DocumentData> | null
  >({
    queryKey: ["visited", searchQuery],
    queryFn: async ({ pageParam }) => {
      return getVisited(pageParam, searchQuery);
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.lastVisible : undefined;
    },
    staleTime: 60 * 60 * 1000,
  });
};

export { useGetVisited };
