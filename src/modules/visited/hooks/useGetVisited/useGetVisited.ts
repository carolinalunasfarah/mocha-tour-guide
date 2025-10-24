import { useQuery } from '@tanstack/react-query';

import { getVisited } from '@/modules/visited/services/getVisited';

import { Visited } from '@/modules/visited/domain/types';

const useGetVisited = () => {
  return useQuery<Visited[]>({
    queryKey: ['visited'],
    queryFn: getVisited,
    staleTime: 60 * 60 * 1000,
  });
};

export { useGetVisited };
