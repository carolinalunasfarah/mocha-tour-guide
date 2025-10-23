import { useQuery } from '@tanstack/react-query';

import { getVisited } from '../../services/getVisited';
import { Visited } from '../../domain/types';

const useGetVisited = () => {
  return useQuery<Visited[]>({
    queryKey: ['visited'],
    queryFn: getVisited,
    staleTime: 60 * 60 * 1000,
  });
};

export { useGetVisited };
