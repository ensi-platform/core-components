import type { LayoutProps, TokensInterface } from '@ensi-platform/core-components-common';

import type { FC, ReactNode } from 'react';

export interface FieldArrayAddProps {
    onClick: () => void;
    disabled?: boolean;
}

export interface FieldArrayRemoveProps {
    onClick: () => void;
    disabled?: boolean;
}

export type FieldArrayProps = Omit<LayoutProps, 'reverse' | 'wrap' | 'children'> & {
    type?: 'grid';
    AddButton?: FC<FieldArrayAddProps>;
    RemoveButton?: FC<FieldArrayRemoveProps>;
    name: string;
    isAddedElement?: boolean;
    maxCount?: number;
    children: (args: { name: string; index: number }) => ReactNode | ReactNode[];
    initialValue?: any;
    className?: string;
    childrenCol?: TokensInterface['layout']['cols'];
};
