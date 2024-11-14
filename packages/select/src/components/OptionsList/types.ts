import type { FC, MouseEvent, ReactNode, RefObject } from 'react';

import type { SelectItem, SelectProps } from '../../types';
import type { OptionProps } from '../Option/types';

export type useVisibleOptionsArgs = {
    /**
     * Количество видимых пунктов
     */
    visibleOptions: number;

    /**
     * Реф на контейнер с пунтами меню
     */
    listRef: RefObject<HTMLElement>;

    /**
     * Реф на контейнер, которому нужно установить высоту
     */
    styleTargetRef?: RefObject<HTMLElement>;

    /**
     * Флаг открытия меню
     */
    isOpen?: boolean;

    /**
     * Позволяет вызвать пересчет высоты
     */
    invalidate?: unknown;
};

export type OptionsListProps = {
    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Компонент пункта меню
     */
    Option?: FC<OptionProps>;

    /**
     * Функция для получения пропсов для ячейки
     */
    getOptionProps?: (option: SelectItem, index: number) => OptionProps;

    /**
     * Контент шапки
     */
    header?: ReactNode;

    /**
     * Контент футера
     */
    footer?: ReactNode;

    /**
     * Список вариантов выбора
     */
    options?: Array<SelectItem>;

    /**
     * Флаг, открыто ли меню
     */
    isOpen?: boolean;

    /**
     * Компонент группы
     */
    Optgroup?: SelectProps['Optgroup'];

    /**
     * Будет отображаться, если компонент пустой
     */
    emptyPlaceholder?: ReactNode;

    /**
     * Количество видимых пунктов меню (5 = 5.5)
     */
    visibleOptions?: number;

    /**
     * Обработчик скрола
     */
    onScroll?: (event: MouseEvent<HTMLElement>) => void;
};
