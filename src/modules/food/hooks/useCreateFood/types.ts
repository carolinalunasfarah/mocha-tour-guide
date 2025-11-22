import type { Food } from "@/modules/food/domain/types";

type UseCreateFoodParams = Omit<Food, "id" | "createdAt">;

export type { UseCreateFoodParams };
