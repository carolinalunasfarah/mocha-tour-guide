import type { Mocha } from "@/modules/mochas/domain/types";
import { getAllDocumentsForCollection } from "@/modules/shared/services/getAllDocumentsForCollection";

const getAllMochas = async (searchQuery?: string): Promise<Mocha[]> => {
  return getAllDocumentsForCollection<Mocha>("mochas", searchQuery);
};

export { getAllMochas };
