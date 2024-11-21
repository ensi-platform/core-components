import type { ElementType, ReactNode } from 'react';

export interface IBlockProps<P extends ElementType = 'section'> {
    /** Use your own React component for render. */
    as?: P;
    children: ReactNode | ReactNode[];
    className?: string;
    background?: string;
    boxShadow?: string;
}
