import { useQuery } from '@tanstack/react-query';

import { UseGetFoodByIdParams } from './types';
import { getFoodById } from '../../services/getFoodById';

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
