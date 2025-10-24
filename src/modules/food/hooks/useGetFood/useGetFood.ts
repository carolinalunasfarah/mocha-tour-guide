import { useQuery } from '@tanstack/react-query';

import { getFood } from '@/modules/food/services/getFood';

import { Food } from '@/modules/food/domain/types';

const useGetFood = () => {
  return useQuery<Food[]>({
    queryKey: ['food'],
    queryFn: getFood,
    staleTime: 60 * 60 * 1000,
  });
};

export { useGetFood };
