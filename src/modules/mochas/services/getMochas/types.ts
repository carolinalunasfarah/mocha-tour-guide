import { QueryDocumentSnapshot } from "firebase/firestore";
import { DocumentData } from "firebase/firestore";
import { Mocha } from "../../domain/types";

type PaginatedMochaResult = {
  mochas: Mocha[];
  lastVisible: QueryDocumentSnapshot<DocumentData> | null;
  hasMore: boolean;
  total?: number;
};

const FETCH_LIMIT = 8;

export type { PaginatedMochaResult };
export { FETCH_LIMIT };
