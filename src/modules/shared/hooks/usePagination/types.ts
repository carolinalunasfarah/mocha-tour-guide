type UsePaginationProps<T> = {
    data: T[];
    initialLimit?: number;
    increment?: number;
}

type UsePaginationReturn<T> = {
    paginatedData: T[];
    hasMore: boolean;
    loadMore: () => void;
    reset: () => void;
    currentLimit: number;
    totalItems: number;
};

export type { UsePaginationProps, UsePaginationReturn };
