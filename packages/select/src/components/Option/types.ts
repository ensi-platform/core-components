import type { AriaAttributes, FC, ReactNode, RefAttributes } from 'react';

import type { SelectItem } from '../../types';
import type { CheckmarkProps } from '../Checkmark/types';

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

    /**
     * Компонент пункта меню
     */
    Checkmark?: FC<CheckmarkProps> | null;
}
