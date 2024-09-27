import { HTMLProps, ReactNode } from 'react';

import Tag from '../components/TagItem';
import { TagsTheme, useThemePart } from './themes';

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
     * Theme object
     */
    theme?: TagsTheme;
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

export interface TagProps extends HTMLProps<Omit<HTMLButtonElement, 'type'>> {
    /**
     * Close button icon
     */
    CloseIcon?: TagsProps['CloseIcon'];
    /**
     * Delete event handler
     */
    onDelete?: () => void;
    /**
     * Function to get part of styles from theme
     */
    getCSS?: ReturnType<typeof useThemePart>;
}

export interface TagsCompositionProps {
    Tag: typeof Tag;
}
