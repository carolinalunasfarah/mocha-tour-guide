import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/modules/core/api/queryClient";

import type { UseCreateFoodParams } from "./types";

import { createFood } from "../../services/createFood";

const useCreateFood = () => {
  const { data, ...query } = useMutation({
    mutationFn: async (params: UseCreateFoodParams) => {
      return createFood(params);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["food"] });
    },
  });
  return { data, ...query };
};

export { useCreateFood };
