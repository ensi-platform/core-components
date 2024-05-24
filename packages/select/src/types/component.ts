import { FC, FocusEvent } from 'react';

import { CSSObject } from '@emotion/react';

import { FormControlProps } from '@greensight/core-components-form-control';
import { PopoverProps } from '@greensight/core-components-popover';

import { ArrowProps } from '../components/Arrow/types';
import { FieldProps } from '../components/Field/types';
import { OptionProps } from '../components/Option/types';
import { OptionsListProps } from '../components/OptionsList/types';
import { SelectItem, SelectPayload } from './common';
import { SelectThemeProps } from './themes';

export interface SelectParts {
    /**
     * Компонент стрелки
     */
    Arrow?: FC<ArrowProps> | null | false;

    /**
     * Компонент поля
     */
    Field?: FC<FieldProps>;
    /**
     * Компонент выпадающего меню
     */
    OptionsList?: FC<OptionsListProps>;

    /**
     * Компонент пункта меню
     */
    Option?: FC<OptionProps>;
}

export interface SelectPartsProps {
    /**
     * Пропсы, которые будут прокинуты в компонент поля
     */
    fieldProps?: Partial<FieldProps> & Record<string, any>;

    /**
     * Пропсы, которые будут прокинуты в компонент списка
     */
    optionsListProps?: Omit<OptionsListProps, 'children' | 'isOpen'>;
    /**
     * Пропсы, которые будут прокинуты в компонент пункта меню
     */
    optionProps?: Partial<OptionProps>;
}

export interface SelectStates {
    /**
     * Начальное состояние селекта
     */
    defaultOpen?: boolean;
    /**
     * Управление открытием
     */
    isOpen?: boolean;
    /**
     * Растягивает компонент на ширину контейнера
     */
    block?: boolean;
    /**
     * Управление возможностью выбора значения
     */
    disabled?: boolean;

    /**
     * Скрывать выбранные опции
     */
    hideSelectedOptions?: boolean;

    /**
     * Скрывать крестик очищения
     */
    hideClearButton?: boolean;

    /**
     * Вызывать onChange даже когда уже выбрано
     */
    emitChangeOnClick?: boolean;

    /**
     * Разрешить растягивать компонент по вертикали чтобы уместить field
     */
    wrap?: boolean;

    /**
     * Возможность использовать селект как input-autocomplete
     */
    autocomplete?: boolean;

    /**
     * Возможность выбрать несколько значений
     */
    multiple?: boolean;

    /**
     * Позволяет снять выбранное значение
     */
    allowUnselect?: boolean;

    /**
     * Закрывать меню после выбора?
     */
    closeOnSelect?: boolean;

    /**
     * Запрещает поповеру менять свою позицию.
     * Например, если места снизу недостаточно,то он все равно будет показан снизу
     */
    preventFlip?: boolean;
}

export interface SelectHandlers {
    /**
     * Обработчик выбора
     */
    onChange?: (
        event: {
            target: { value: any };
        },
        payload: SelectPayload
    ) => void;

    /**
     * Обработчик открытия\закрытия селекта
     */
    onOpen?: (payload: { open?: boolean; name?: string }) => void;

    /**
     * Обработчик фокуса поля
     */
    onBlur?: (event: FocusEvent<HTMLDivElement | HTMLInputElement>) => void;

    /**
     * Обработчик блюра поля
     */
    onFocus?: (event: FocusEvent<HTMLDivElement | HTMLInputElement>) => void;
}

export interface SelectPopover {
    /**
     * Хранит функцию, с помощью которой можно обновить положение поповера
     */
    updatePopover?: PopoverProps['update'];

    /**
     * z-index поповера
     */
    zIndexPopover?: PopoverProps['zIndex'];

    /**
     * Позиционирование выпадающего списка
     */
    popoverPosition?: PopoverProps['position'];
}

export interface SelectProps
    extends Omit<FormControlProps, 'theme' | 'size' | 'variant' | 'onChange' | 'onFocus' | 'onBlur'>,
        Partial<SelectThemeProps>,
        SelectPopover,
        SelectHandlers,
        SelectStates,
        SelectParts,
        SelectPartsProps {
    /**
     * Атрибут id
     */
    id?: string;

    /**
     * Атрибут name
     */
    name?: string;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Заглушка пустого поля
     */
    placeholder?: string;

    /**
     * Дополнительный стиль для поля
     */
    fieldCSS?: CSSObject;

    /**
     * Список вариантов выбора
     */
    options: Array<SelectItem>;

    /**
     * Список value выбранных пунктов (controlled-селект)
     */
    selected?: Array<string | SelectItem> | string | SelectItem | null;

    /**
     * Управляет шириной выпадающего меню.
     * Ширину определяет контент, либо ширина равна ширине поля
     */
    optionsListWidth?: 'content' | 'field';
    /**
     * Показывать OptionsList, если он пустой
     */
    showEmptyOptionsList?: boolean;
}
