import { type ReactNode } from 'react';

export type OptgroupProps = {
    /**
     * Дополнительный класс для компонента группы пунктов
     */
    className?: string;

    /**
     * Заголовок группы
     */
    label?: string;

    /**
     * Дочерние элементы
     */
    children?: ReactNode;
};
