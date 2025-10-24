import { useQuery } from '@tanstack/react-query';

import { getMochas } from '@/modules/mochas/services/getMochas';

import { Mocha } from '@/modules/mochas/domain/types';

const useGetMochas = () => {
  return useQuery<Mocha[]>({
    queryKey: ['mochas'],
    queryFn: getMochas,
    staleTime: 60 * 60 * 1000,
  });
};

export { useGetMochas };
