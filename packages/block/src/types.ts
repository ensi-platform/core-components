import type { MergeElementProps } from '@greensight/gds';

import type { ElementType } from 'react';

export interface IBlockBaseProps {
    background?: string;
    boxShadow?: string;
}

export type IBlockProps<P extends ElementType = 'section'> = {
    as?: P;
} & MergeElementProps<P, IBlockBaseProps>;
