import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { Visited } from "@/modules/visited/domain/types";
import { getPaginatedData } from "@/modules/shared/services/getPaginatedData";
import type { PaginatedVisitedResult } from "./types";

const getVisited = async (
  lastDoc?: QueryDocumentSnapshot<DocumentData> | null,
  searchQuery?: string,
): Promise<PaginatedVisitedResult> => {
  const result = await getPaginatedData<Visited>(
    "visited",
    lastDoc,
    searchQuery,
  );

  return {
    visited: result.data,
    lastVisible: result.lastVisible,
    hasMore: result.hasMore,
    total: result.total,
  };
};

export { getVisited };
