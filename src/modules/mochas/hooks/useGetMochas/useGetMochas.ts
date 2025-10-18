import { useQuery } from '@tanstack/react-query';

import { getMochas } from '../../services/getMochas';
import { Mocha } from '../../domain/types';

const useGetMochas = () => {
  return useQuery<Mocha[]>({
    queryKey: ['mochas'],
    queryFn: getMochas,
    staleTime: 60 * 60 * 1000,
  });
};

export { useGetMochas };
