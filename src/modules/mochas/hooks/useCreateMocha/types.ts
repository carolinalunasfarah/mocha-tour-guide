import { Mocha } from "@/modules/mochas/domain/types";

type UseCreateMochaParams = Omit<Mocha, "id" | "createdAt">;

export type { UseCreateMochaParams };
