/* eslint-disable no-use-before-define */
import type {
    Cell,
    Header,
    HeaderGroup,
    Row,
    RowData,
    Table as TableInstance,
    TableOptions,
} from '@tanstack/react-table';
import type { FC, ForwardRefExoticComponent, HTMLProps, PropsWithoutRef, ReactNode, RefAttributes } from 'react';

import type { ContentBtnProps } from '@components/Tooltip/ContentBtn';

type Flatten<T> = T extends { [key: string]: any }
    ? {
          [K in keyof T]: T[K] extends object ? never : T[K];
      }
    : never;

export interface TablePlugin<TData extends RowData> {
    root?: Partial<Omit<Flatten<TableOptions<TData>>, 'columns' | 'data' | 'state' | 'meta'>>;
    state?: TableOptions<TData>['state'];
    meta?: TableOptions<TData>['meta'];
}

export interface HeadThProps<TData extends object> {
    className?: string;
    header: Header<TData, unknown>;
    colSpan: number;
    children: ReactNode | ReactNode[];
}

export interface HeadTrProps<TData> {
    className?: string;
    headerGroup: HeaderGroup<TData>;
    children: ReactNode | ReactNode[];
}

export interface TrProps<TData extends object> extends HTMLProps<HTMLTableRowElement> {
    row?: Row<TData>;
    children?: ReactNode | ReactNode[];
}

export interface TdProps<TData extends object> {
    cell: Cell<TData, unknown>;
    children: ReactNode | ReactNode[];
}

export interface StyledTableProps {
    block: boolean;
    children: ReactNode | ReactNode[];
}

export interface SortingIconProps {
    isSortedDesc: boolean | undefined;
}

export interface TableProps<TData extends object> {
    block?: boolean;
    className?: string;
    instance: TableInstance<TData>;

    StyledTable?: ForwardRefExoticComponent<PropsWithoutRef<StyledTableProps> & RefAttributes<HTMLTableElement>>;
    HeadTr?: FC<HeadTrProps<TData>>;
    HeadTh?: FC<HeadThProps<TData>>;
    Tr?: FC<TrProps<TData>>;
    Td?: FC<TdProps<TData>>;
    SortingIcon?: FC<SortingIconProps>;

    stickyHeader?: boolean;
}

export type TooltipItem = {
    text: string;
    type: ContentBtnProps['type'];
    action: () => void | Promise<void>;
    disabled: boolean;
    disabledHint?: string;
};
