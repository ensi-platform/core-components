import type { CSSObject } from '@emotion/react';

import type { HTMLProps, ReactNode } from 'react';

import type TagItem from '../components/TagItem';

export interface ITagsProps {
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

export interface ITagProps extends HTMLProps<Omit<HTMLButtonElement, 'type' | 'css'>> {
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
    CloseIcon?: ITagsProps['CloseIcon'];
    /**
     * Delete event handler
     */
    onDelete?: () => void;
}

export interface ITagsCompositionProps {
    Tag: typeof TagItem;
}
