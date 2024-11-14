import type { HTMLProps, SVGProps } from 'react';

export interface FormMessageProps extends HTMLProps<HTMLDivElement> {
    /** Error text */
    message: string;
    type?: 'error' | 'warning';
    className?: string;
}

export interface MessageIconProps extends SVGProps<SVGSVGElement> {
    type: FormMessageProps['type'];
}
