import type { Food } from "@/modules/food/domain/types";
import { getAllDocumentsForCollection } from "@/modules/shared/services/getAllDocumentsForCollection";

const getAllFood = async (searchQuery?: string): Promise<Food[]> => {
  return getAllDocumentsForCollection<Food>("food", searchQuery);
};

export { getAllFood };
