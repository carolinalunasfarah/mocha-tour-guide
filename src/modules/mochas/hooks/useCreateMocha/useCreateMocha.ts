import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/modules/core/api/queryClient";

import type { UseCreateMochaParams } from "./types";

import { createMocha } from "@/modules/mochas/services/createMocha";

const useCreateMocha = () => {
  const { data, ...query } = useMutation({
    mutationFn: async (params: UseCreateMochaParams) => {
      return createMocha(params);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mochas"] });
    },
  });
  return { data, ...query };
};

export { useCreateMocha };
