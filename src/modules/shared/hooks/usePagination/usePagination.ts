import { useState, useMemo } from 'react';

import { UsePaginationProps, UsePaginationReturn } from './types';

const usePagination = <T>({
  data,
  initialLimit = 8,
  increment = 8,
}: UsePaginationProps<T>): UsePaginationReturn<T> => {
  const [currentLimit, setCurrentLimit] = useState(initialLimit);

  const paginatedData = useMemo(() => {
    return data.slice(0, currentLimit);
  }, [data, currentLimit]);

  const hasMore = useMemo(() => {
    return currentLimit < data.length;
  }, [currentLimit, data.length]);

  const loadMore = () => {
    setCurrentLimit(prev => Math.min(prev + increment, data.length));
  };

  const reset = () => {
    setCurrentLimit(initialLimit);
  };

  return {
    paginatedData,
    hasMore,
    loadMore,
    reset,
    currentLimit,
    totalItems: data.length,
  };
};

export { usePagination };
