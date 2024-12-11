import type { HTMLProps } from 'react';

export interface IDrawerHeaderProps extends HTMLProps<HTMLDivElement> {
    /**
     * Drawer title
     */
    title: string;

    /**
     * Is header has close button
     * @default false
     */
    hasCloseButton?: boolean;

    /**
     * Header close button click handler
     */
    onClose?: () => void;
}
