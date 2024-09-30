import { HTMLProps, ReactNode } from 'react';

import { CSSObject } from '@emotion/react';
import Tag from '../components/TagItem';

export interface TagsProps {
    /**
     * Tag items
     */
    children: ReactNode[];
    /**
     * Delete event handler
     */
    onDelete: (index: number) => void;
    /**
     * Close button icon
     */
    CloseIcon?: (props: { className?: string }) => ReactNode;
    /**
     * Wrapper class
     */
    className?: string;
    /**
     * Wrapper additional styles
     */
    css?: CSSObject;
    /**
     * Selection availability flag
     */
    disabled?: boolean;
    /**
     * Allow content to be moved to a new line
     * @default true
     */
    wrap?: boolean;
}

export interface TagProps extends HTMLProps<Omit<HTMLButtonElement, 'type' | 'css'>> {
    /**
     * Button style
     */
    css?: CSSObject;
    /**
     * Close button wrapper style
     */
    closerCss?: CSSObject;
    /**
     * Close button icon
     */
    CloseIcon?: TagsProps['CloseIcon'];
    /**
     * Delete event handler
     */
    onDelete?: () => void;
}

export interface TagsCompositionProps {
    Tag: typeof Tag;
}
