import { type LayoutProps } from '@greensight/gds';
import { type LayoutItemProps } from '@greensight/gds/types/src/components/Layout/Item';
import { type FC, type ReactNode } from 'react';

export interface IButtonProps {
    onClick: () => void;
    disabled?: boolean;
}

export interface IFieldArrayProps extends Omit<LayoutProps, 'reverse' | 'wrap' | 'children'> {
    type?: 'grid';
    AddButton?: FC<IButtonProps>;
    RemoveButton?: FC<IButtonProps>;
    name: string;
    isAddedElement?: boolean;
    maxCount?: number;
    children: (args: { name: string; index: number }) => ReactNode;
    initialValue?: any;
    className?: string;
    childrenCol?: LayoutItemProps['col'];
}
