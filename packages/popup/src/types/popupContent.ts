import type { ReactNode } from 'react';

export interface IPopupContentProps {
    /**
     * Content
     */
    children?: ReactNode;

    /**
     * Additional content styles
     */
    className?: string;
}
