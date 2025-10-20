import { useQuery } from '@tanstack/react-query';

import { UseGetMochaByIdParams } from './types';
import { getMochaById } from '../../services/getMochaById';

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
