import { flexRender } from '@tanstack/react-table';

import { colors } from '@scripts/gds';

import {
    DefaultHeadTh,
    DefaultHeadTr,
    DefaultSortingIcon,
    DefaultStyledTable,
    DefaultTd,
    DefaultTr,
} from './components/utils';
import { TableProps } from './types';
import { useSticky } from './useSticky';

export * from './types';
export { useTable } from './useTable';
export { useSorting } from './useSorting';

const Table = <TData extends object>(props: TableProps<TData>) => {
    const {
        block = true,
        className,
        instance: table,
        HeadTr = DefaultHeadTr,
        HeadTh = DefaultHeadTh,
        Tr = DefaultTr,
        Td = DefaultTd,
        StyledTable = DefaultStyledTable,
        SortingIcon = DefaultSortingIcon,
        stickyHeader,
    } = props;

    const { isSticky, horizontalScrollContainer, leftAnchorElement, thead, paddingElement } = useSticky(stickyHeader);

    return (
        <div css={{ ...(block && { display: 'grid', gridTemplateColumns: '1fr' }) }}>
            <div
                css={{ ...(block && { width: '100%' }), overflow: 'auto' }}
                className={className}
                ref={horizontalScrollContainer}
            >
                <StyledTable block={block} ref={paddingElement}>
                    <thead
                        css={{
                            ...(isSticky && {
                                position: 'relative',
                                zIndex: 2,
                                background: colors.white,
                            }),
                        }}
                        ref={thead}
                    >
                        {table.getHeaderGroups().map(headerGroup => (
                            <HeadTr
                                key={headerGroup.id}
                                headerGroup={headerGroup}
                                css={{
                                    ...(isSticky && {
                                        width: '100%',
                                    }),
                                }}
                            >
                                {headerGroup.headers.map(header => (
                                    <HeadTh key={header.id} header={header} colSpan={header.colSpan}>
                                        {!header.isPlaceholder && header.column.getCanSort() && (
                                            <button type="button" onClick={header.column.getToggleSortingHandler()}>
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                                {header.column.getIsSorted() && (
                                                    <SortingIcon
                                                        isSortedDesc={header.column.getIsSorted() === 'desc'}
                                                    />
                                                )}
                                            </button>
                                        )}
                                        {!header.isPlaceholder &&
                                            !header.column.getCanSort() &&
                                            flexRender(header.column.columnDef.header, header.getContext())}
                                    </HeadTh>
                                ))}
                            </HeadTr>
                        ))}
                    </thead>
                    <tbody ref={leftAnchorElement as any}>
                        {table.getRowModel().rows.map(row => (
                            <Tr key={row.id} row={row}>
                                {row.getVisibleCells().map(cell => (
                                    <Td key={cell.id} cell={cell}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </Td>
                                ))}
                            </Tr>
                        ))}
                    </tbody>
                    <tfoot>
                        {table.getFooterGroups().map(footerGroup => (
                            <tr key={footerGroup.id}>
                                {footerGroup.headers.map(header => (
                                    <th key={header.id} colSpan={header.colSpan}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.footer, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </tfoot>
                </StyledTable>
            </div>
        </div>
    );
};

export default Table;
