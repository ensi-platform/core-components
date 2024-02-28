import { AriaAttributes, ReactNode, RefAttributes } from 'react';

import { SelectItem } from '../../types';

export interface OptionProps {
    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Контент пункта меню
     */
    children?: ReactNode;

    /**
     * Данные пункта меню
     */
    option: SelectItem;

    /**
     * Индекс пункта
     */
    index: number;

    /**
     * Флаг, выбран ли данный пункт
     */
    selected?: boolean;

    /**
     * Флаг, подсвечен ли данный пункт
     */
    highlighted?: boolean;

    /**
     * Флаг, заблокирован ли данный пункт
     */
    disabled?: boolean;

    /**
     * Внутренние свойства, которые должны быть установлены компоненту.
     */
    innerProps: RefAttributes<HTMLLIElement> & AriaAttributes;
}
