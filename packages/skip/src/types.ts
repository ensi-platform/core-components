import type { HTMLProps } from 'react';

export interface SkipProps extends HTMLProps<HTMLAnchorElement> {
    /** Anchor link ('#example') */
    link: string;
    /** Link text */
    children: string;
}
