import { useQuery } from "@tanstack/react-query";

import { getAllMochas } from "@/modules/mochas/services/getAllMochas";

const useGetAllMochas = (searchQuery?: string) => {
  return useQuery({
    queryKey: ["all-mochas", searchQuery ?? ""],
    queryFn: () => getAllMochas(searchQuery),
    staleTime: 60 * 60 * 1000,
  });
};

export { useGetAllMochas };
