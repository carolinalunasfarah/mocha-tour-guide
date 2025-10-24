import { useQuery } from '@tanstack/react-query';

import { getFoodById } from '@/modules/food/services/getFoodById';

import { UseGetFoodByIdParams } from './types';

const useGetFoodById = (params: UseGetFoodByIdParams ) => {
  return useQuery({
    queryKey: ['food', params.id],
    queryFn: async () => {
      return getFoodById(params);
    },
    staleTime: 60 * 60 * 1000,
    enabled: !!params.id,
  });
};

export { useGetFoodById };
