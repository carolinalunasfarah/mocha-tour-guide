import { QueryDocumentSnapshot } from "firebase/firestore";
import { DocumentData } from "firebase/firestore";
import { Visited } from "../../domain/types";

type PaginatedVisitedResult = {
  visited: Visited[];
  lastVisible: QueryDocumentSnapshot<DocumentData> | null;
  hasMore: boolean;
  total?: number;
};

const FETCH_LIMIT = 8;

export type { PaginatedVisitedResult };
export { FETCH_LIMIT };
