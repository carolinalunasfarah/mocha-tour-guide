import { Mocha } from "@/modules/mochas/domain/types";

type CreateMochaRequest = Omit<Mocha, "id" | "createdAt">;

export type { CreateMochaRequest };
