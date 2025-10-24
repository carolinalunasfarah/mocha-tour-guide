import { useQuery } from '@tanstack/react-query';

import { getMochaById } from '@/modules/mochas/services/getMochaById';

import { UseGetMochaByIdParams } from './types';

const useGetMochaById = (params: UseGetMochaByIdParams) => {
  return useQuery({
    queryKey: ['mocha', params.id],
    queryFn: async () => {
      return getMochaById(params);
    },
    staleTime: 60 * 60 * 1000,
    enabled: !!params.id,
  });
};

export { useGetMochaById };
