import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useRedirectToNotEmptyPage = ({
    activePage,
    itemsPerPageCount,
    total,
}: {
    activePage: number;
    itemsPerPageCount: number;
    total: number;
}) => {
    const { query, push } = useRouter();

    useEffect(() => {
        if (total > 0 && activePage * itemsPerPageCount - total === itemsPerPageCount)
            push({ query: { ...query, page: activePage - 1 } });
    }, [activePage, itemsPerPageCount, total, push, query]);
};
