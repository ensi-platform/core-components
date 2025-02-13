import type { HTMLProps, SVGProps } from 'react';

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

export interface IMessageIconProps extends SVGProps<SVGSVGElement> {
    type: FormMessageProps['type'];
}
