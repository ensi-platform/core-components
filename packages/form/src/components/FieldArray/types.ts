import type { LayoutProps, TokensInterface } from '@ensi-platform/core-components-common';

import type { FC, ReactNode } from 'react';

export interface IButtonProps {
    onClick: () => void;
    disabled?: boolean;
}

export type IFieldArrayProps = Omit<LayoutProps, 'reverse' | 'wrap' | 'children'> & {
    type?: 'grid';
    AddButton?: FC<IButtonProps>;
    RemoveButton?: FC<IButtonProps>;
    name: string;
    isAddedElement?: boolean;
    maxCount?: number;
    children: (args: { name: string; index: number }) => ReactNode | ReactNode[];
    initialValue?: any;
    className?: string;
    childrenCol?: TokensInterface['layout']['cols'];
};
