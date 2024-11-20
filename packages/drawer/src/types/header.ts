import type { HTMLProps } from 'react';

export interface IHeaderProps extends HTMLProps<HTMLDivElement> {
    title: string;
    hasCloseButton?: boolean;
    onClose?: () => void;
}
