import { ReactNode } from 'react';

export type SelectItem = {
    /**
     * Текстовое представление пункта
     */
    label: string;

    /**
     * Контент, который будет отрисован в выпадающем списке и в поле при выборе
     */
    content?: ReactNode;

    /**
     * Блокирует данный пункт для выбора
     */
    disabled?: boolean;

    /**
     * Дополнительные данные
     */
    value?: number | string;

    // Опция-прелоадер
    isPreloader?: boolean;
};

export type SelectPayload = {
    selected: SelectItem[] | null;
    actionItem: SelectItem | null;
    name?: string;
};
