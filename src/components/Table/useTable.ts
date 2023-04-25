import { RowData, TableOptions, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';

import { useLocalStorage } from '@scripts/hooks';

import { TABLE_STORAGE_KEYS } from './constants';
import { TablePlugin } from './types';

type WithPartial<TObj extends object, TKeys extends keyof TObj> = Omit<TObj, TKeys> &
    Partial<
        {
            [key in TKeys]: TObj[key];
        }
    >;

type useTableProps<TData extends RowData> = WithPartial<TableOptions<TData>, 'getCoreRowModel'>;

declare module '@tanstack/react-table' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface TableMeta<TData extends RowData> {
        tableKey?: string;
    }
}

export const useTable = <TData extends RowData>(props: useTableProps<TData>, plugins: TablePlugin<TData>[] = []) => {
    const [columnsToHide] = useLocalStorage<string[]>(`${props.meta?.tableKey}${TABLE_STORAGE_KEYS.HIDDEN_COLS}`, []);
    const [columnOrder] = useLocalStorage<string[]>(`${props.meta?.tableKey}${TABLE_STORAGE_KEYS.ORDER_COLS}`, []);

    const tableProps = useMemo(() => {
        const columnVisibility = {
            ...props.columns.reduce((acc, col) => {
                acc[col.id || (col as any).accessorKey] = true;
                return acc;
            }, {} as Record<string, boolean>),
            ...columnsToHide.reduce((acc, colName) => {
                acc[colName] = false;
                return acc;
            }, {} as Record<string, boolean>),
        };

        return plugins.reduce(
            (options, plugin) => {
                const obj = { ...options, ...plugin.root };

                if (plugin.meta) obj.meta = { ...obj.meta, ...plugin.meta };
                if (plugin.state) obj.state = { ...obj.state, ...plugin.state };

                return obj;
            },
            {
                getCoreRowModel: getCoreRowModel(),
                enableColumnFilters: true,
                enableHiding: true,
                enableMultiSort: false,
                ...props,
                state: {
                    ...props.state,
                },
                initialState: {
                    columnVisibility,
                    columnOrder,
                    ...props.initialState,
                },
            } as TableOptions<TData>
        );
    }, [columnOrder, columnsToHide, plugins, props]);

    if (props.debugAll) {
        console.log('tableprops = ', tableProps);
    }

    return useReactTable(tableProps);
};
