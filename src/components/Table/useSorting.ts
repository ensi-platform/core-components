import { ColumnSort, RowData, SortingState, getSortedRowModel } from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';

import { TablePlugin } from './types';

export const useSorting = <TData extends RowData>(initialSort?: ColumnSort, reinitialize = false) => {
    const [sorting, setSorting] = useState<SortingState>(() => (initialSort ? [initialSort] : []));

    useEffect(() => {
        if (!reinitialize || !initialSort) return;

        setSorting([initialSort]);
    }, [initialSort, reinitialize]);

    const backendSorting = useMemo(() => sorting.map(e => (e.desc ? `-${e.id}` : `${e.id}`)), [sorting]);

    return [
        {
            sorting,
            backendSorting,
        },
        {
            state: { sorting },
            root: {
                enableSorting: true,
                onSortingChange: setSorting,
                getSortedRowModel: getSortedRowModel(),
            },
        } as TablePlugin<TData>,
    ] as const;
};
