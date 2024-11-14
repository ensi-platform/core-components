import { type HTMLProps } from 'react';

export interface FormMessageProps extends HTMLProps<HTMLDivElement> {
    /** Error text */
    message: string;
    type?: 'error' | 'warning';
    className?: string;
}

export interface MessageIconProps extends HTMLProps<HTMLDivElement> {
    type: FormMessageProps['type'];
}
