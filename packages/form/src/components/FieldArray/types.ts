import type { LayoutProps, TokensInterface } from '@ensi-platform/core-components-common';

import type { FC, ReactNode } from 'react';

/**
 * Interface for append and remove buttons
 */
export interface IButtonProps {
    onClick: () => void;
    disabled?: boolean;
}

export type IFieldArrayProps = Omit<LayoutProps, 'reverse' | 'wrap' | 'children'> & {
    /**
     * Array entity name
     */
    name: string;
    /**
     * Array item content
     */
    children: (args: { name: string; index: number }) => ReactNode | ReactNode[];
    /**
     * Max number of items in array
     */
    maxCount?: number;
    /**
     * Ability to add and remove items
     */
    canAddElement?: boolean;
    /**
     * Value for new added element
     */
    initialValue?: any;
    /**
     * Root layout class name
     */
    className?: string;
    /**
     * Col prop for layout item with children
     */
    childrenCol?: TokensInterface['layout']['cols'];
    /**
     * Layout type
     */
    type?: 'grid';
    /**
     * Add button element
     */
    AddButton?: FC<IButtonProps>;
    /**
     * Remove button element
     */
    RemoveButton?: FC<IButtonProps>;
};
