import { ReactElement, Ref, forwardRef } from 'react';

import { colors, scale, typography } from '@scripts/gds';

import ArrowDownIcon from '@icons/small/arrowDown.svg';

import type { HeadThProps, HeadTrProps, SortingIconProps, StyledTableProps, TdProps, TrProps } from '../types';

export const DefaultHeadTr = <TData extends object>({ children, className }: HeadTrProps<TData>) => (
    <tr className={className}>{children}</tr>
);

export const DefaultHeadTh = <TData extends object>({ children, colSpan, header, className }: HeadThProps<TData>) => (
    <th
        {...(!!header.column.getIsSorted() && {
            'aria-sort': header.column.getIsSorted() === 'asc' ? 'ascending' : 'descending',
        })}
        className={className}
        colSpan={colSpan}
        css={{
            ...typography('captionBoldLower'),
            padding: scale(1),
            textAlign: 'left',
            borderTop: `1px solid ${colors.grey400}`,
            borderBottom: `1px solid ${colors.grey400}`,
            whiteSpace: 'nowrap',
            verticalAlign: 'top',
            background: colors?.white,
            height: scale(4),
            '&:first-of-type': { paddingLeft: scale(2) },
            '&:last-of-type': { paddingRight: scale(2) },

            // Fixed width column
            ...(header.column.columnDef.maxSize &&
                header.column.columnDef.maxSize === header.column.columnDef.minSize && {
                    width: header.column.columnDef.maxSize,
                    maxWidth: header.column.columnDef.maxSize,
                }),

            '>button': {
                ...typography('captionBoldLower'),
            },
        }}
    >
        {children}
    </th>
);

export const DefaultTr = forwardRef(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    <TData extends object>({ children, row, ...props }: TrProps<TData>, ref: Ref<HTMLTableRowElement>) => (
        <tr
            ref={ref}
            css={{
                background: colors.white,
                cursor: 'default !important',
                ':nth-of-type(odd)': { background: colors.grey100 },
                ':hover': { background: colors.lightBlue },
            }}
            {...props}
        >
            {children}
        </tr>
    )
    // eslint-disable-next-line no-use-before-define
) as <T extends object>(props: TrProps<T>, ref: Ref<HTMLTableRowElement>) => ReactElement;

export const DefaultTd = <TData extends object>({ children }: TdProps<TData>) => (
    <td
        css={{
            verticalAlign: 'top',
            padding: scale(1),
            ...typography('bodySm'),
            '&:first-of-type': { paddingLeft: scale(2) },
            '&:last-of-type': { paddingRight: scale(2) },
        }}
    >
        {children}
    </td>
);

export const DefaultStyledTable = forwardRef(({ block, children }: StyledTableProps, ref: Ref<HTMLTableElement>) => (
    <table
        ref={ref}
        css={{
            position: 'relative',
            ...(block && {
                width: '100%',
            }),
            borderSpacing: 0,
            borderCollapse: 'collapse',
            tableLayout: 'auto',
        }}
    >
        {children}
    </table>
));

export const DefaultSortingIcon = ({ isSortedDesc }: SortingIconProps) => (
    <ArrowDownIcon
        css={{
            marginLeft: scale(1),
            marginBottom: -2,
            fill: colors?.primary,
            verticalAlign: 'text-bottom',
            transformOrigin: 'center',
            transition: 'transform 0.1s ease-in-out',
            ...(isSortedDesc && {
                transform: 'rotate(-180deg)',
            }),
        }}
    />
);
