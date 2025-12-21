import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { Mocha } from "@/modules/mochas/domain/types";
import { getPaginatedData } from "@/modules/shared/services/getPaginatedData";
import type { PaginatedMochaResult } from "./types";

const getMochas = async (
  lastDoc?: QueryDocumentSnapshot<DocumentData> | null,
  searchQuery?: string,
): Promise<PaginatedMochaResult> => {
  const result = await getPaginatedData<Mocha>("mochas", lastDoc, searchQuery);

  return {
    mochas: result.data,
    lastVisible: result.lastVisible,
    hasMore: result.hasMore,
    total: result.total,
  };
};

export { getMochas };
