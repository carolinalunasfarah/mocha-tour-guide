import { useQuery } from "@tanstack/react-query";

import { getAllFood } from "../../services/getAllFood";

const useGetAllFood = (searchQuery?: string) => {
  return useQuery({
    queryKey: ["all-food", searchQuery ?? ""],
    queryFn: () => getAllFood(searchQuery),
    staleTime: 60 * 60 * 1000,
  });
};

export { useGetAllFood };
