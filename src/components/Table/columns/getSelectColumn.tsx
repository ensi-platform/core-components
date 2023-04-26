import { ColumnDef } from '@tanstack/react-table';

import { scale } from '@scripts/gds';

import IndeterminateCheckbox from '../components/IndeterminateCheckbox';

export const getSelectColumn = <D extends object = object>(maxRowSelect = 0, name = ''): ColumnDef<D> => ({
    id: 'select',
    enableSorting: false,
    minSize: scale(7),
    maxSize: scale(7),

    header: ({ table }) =>
        maxRowSelect ? null : (
            <IndeterminateCheckbox
                id={name}
                parentTableName={name}
                onChange={table.getToggleAllRowsSelectedHandler()}
                indeterminate={table.getIsSomeRowsSelected()}
                checked={table.getIsAllRowsSelected()}
            />
        ),

    cell: ({ row, table }) => {
        const disabled =
            maxRowSelect > 0 && table.getSelectedRowModel().rows.length === maxRowSelect && !row.getIsSelected();

        return (
            <button type="button" onClick={e => e.stopPropagation()} css={{ display: 'grid', alignItems: 'center' }}>
                <IndeterminateCheckbox
                    id={row.id}
                    parentTableName={name}
                    disabled={disabled}
                    checked={row.getIsSelected()}
                    indeterminate={row.getIsSomeSelected()}
                    onChange={row.getToggleSelectedHandler()}
                />
            </button>
        );
    },
});
