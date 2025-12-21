import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

type PaginatedResult<T> = {
  data: T[];
  lastVisible: QueryDocumentSnapshot<DocumentData> | null;
  hasMore: boolean;
  total?: number;
};

export type { PaginatedResult };
