import type { HTMLProps } from 'react';

export interface FormMessageProps extends HTMLProps<HTMLDivElement> {
    /**
     * Error text
     */
    message: string;
    /**
     * Alert type
     */
    type?: 'error' | 'warning';
    /**
     * Message element id for linking with aria-attributes
     */
    id?: string;
    className?: string;
}

export interface MessageIconProps extends HTMLProps<HTMLDivElement> {
    type: FormMessageProps['type'];
}
