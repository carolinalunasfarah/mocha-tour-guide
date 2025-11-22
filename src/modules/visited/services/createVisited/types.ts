import type { Visited } from "@/modules/visited/domain/types";

type CreateVisitedRequest = Omit<Visited, "id" | "createdAt">;

export type { CreateVisitedRequest };
