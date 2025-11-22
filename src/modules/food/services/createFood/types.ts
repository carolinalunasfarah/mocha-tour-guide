import type { Food } from "@/modules/food/domain/types";

type CreateFoodRequest = Omit<Food, "id" | "createdAt">;

export type { CreateFoodRequest };
