import { useInfiniteQuery } from "@tanstack/react-query";
import { getMochas } from "@/modules/mochas/services/getMochas";
import { PaginatedMochaResult } from "@/modules/mochas/services/getMochas/types";
import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";

const useGetMochas = () => {
  return useInfiniteQuery<
    PaginatedMochaResult,
    Error,
    PaginatedMochaResult[],
    string[],
    QueryDocumentSnapshot<DocumentData> | null
  >({
    queryKey: ["mochas"],
    queryFn: async ({ pageParam }) => {
      return getMochas(pageParam);
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.lastVisible : undefined;
    },
    staleTime: 60 * 60 * 1000,
  });
};

export { useGetMochas };
