import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useLocalStorage } from './useLocalStorage';

export interface useTableListProps {
    defaultSort?: string;
    defaultPerPage?: number;
}

/**
 * Хук для работы с таблицами - листингами
 */
export const useTableList = ({ defaultSort, defaultPerPage = 10 }: useTableListProps) => {
    const [sort, setSort] = useState<string | undefined>(undefined);
    const { query, pathname } = useRouter();
    const [itemsPerPageCount, setItemsPerPageCount] = useLocalStorage(`${pathname}ItemsPerPageCount`, defaultPerPage);

    const activePage = +(query?.page || 1);

    useEffect(() => {
        if (defaultSort) setSort(defaultSort);
    }, [defaultSort]);

    return {
        sort,
        setSort,
        itemsPerPageCount,
        setItemsPerPageCount,
        activePage,
    };
};
