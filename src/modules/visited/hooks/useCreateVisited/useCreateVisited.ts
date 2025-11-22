import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/modules/core/api/queryClient";

import type { UseCreateVisitedParams } from "./types";

import { createVisited } from "@/modules/visited/services/createVisited";

const useCreateVisited = () => {
  const { data, ...query } = useMutation({
    mutationFn: async (params: UseCreateVisitedParams) => {
      return createVisited(params);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["visited"] });
    },
  });
  return { data, ...query };
};

export { useCreateVisited };
