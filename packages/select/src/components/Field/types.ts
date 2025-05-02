import type { IFormControlExtendsProps } from '@ensi-platform/core-components-form-control';

import type { AriaAttributes, FocusEvent, MouseEvent, ReactElement, ReactNode, RefAttributes } from 'react';

import type { SelectItem } from '../../types';

export interface FieldProps extends IFormControlExtendsProps {
    id?: string;

    /**
     * Выбранный пункт/пункты
     */
    selected?: SelectItem[];

    /**
     * Метод переключающий видимость выпадающего списка
     */
    toggleMenu: () => void;

    /**
     * Метод для ручной установки выбранных пунктов
     */
    setSelectedItems: (selected: SelectItem[]) => void;

    /**
     * Заглушка пустого поля
     */
    placeholder?: string;
    /**
     * Разрешить растягивать компонент по вертикали чтобы уместить содержимое
     */
    wrap?: boolean;

    /**
     * Флаг, открыто ли меню
     */
    isOpen?: boolean;
    /**
     * Кастомный рендер выбранного пункта
     */
    valueRenderer?: ({ selected }: { selected?: SelectItem[] }) => ReactNode;

    /**
     * Компонент стрелки
     */
    Arrow?: ReactElement | false | null;

    /**
     * Внутренние свойства, которые должны быть установлены компоненту.
     */
    innerProps: {
        onBlur?: (event: FocusEvent<HTMLDivElement | HTMLInputElement>) => void;
        onFocus?: (event: FocusEvent<HTMLDivElement | HTMLInputElement>) => void;
        onClick?: (event: MouseEvent<HTMLDivElement | HTMLInputElement>) => void;
        tabIndex: number;
        id: string;
    } & RefAttributes<HTMLDivElement | HTMLInputElement> &
        AriaAttributes;

    /**
     * Дизейбл
     */
    disabled?: boolean;
}
