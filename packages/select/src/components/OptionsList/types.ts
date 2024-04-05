import { ReactNode } from 'react';

export interface OptionsListProps {
    /**
     * Дополнительный класс
     */
    className?: string;

    children: ReactNode;

    /**
     * Флаг, открыто ли меню
     */
    isOpen?: boolean;

    /**
     * Количество видимых пунктов меню (5 = 5.5)
     */
    visibleOptionsCount?: number;
    /**
     * Элемент для отображения в случае пустого списка
     */
    emptyPlaceholder?: ReactNode;
}
