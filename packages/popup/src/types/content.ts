import type { ReactNode } from 'react';

export interface IContentProps {
    /**
     * Контент
     */
    children?: ReactNode;

    /**
     * Дополнительный класс
     */
    className?: string;
}
