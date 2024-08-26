import { type CSSObject } from '@emotion/react';
import { type BaseThemeState } from '@greensight/core-components-common';
import { type ReactNode, type ChangeEventHandler, type HTMLProps, type FormEventHandler } from 'react';
import { type IFieldWrapperProps } from '@greensight/core-components-form';

export type CheckboxValueType = string[] | boolean;

export const CheckboxSize = {
    md: 'md',
} as const;

export const CheckboxVariant = {
    primary: 'primary',
} as const;

// type NativeProps = InputHTMLAttributes<HTMLInputElement>;
type Align = 'start' | 'center';

export interface ICheckboxWrapperReturn {
    id: string;
    checked: boolean;
    onChange: FormEventHandler<HTMLInputElement>;
    error?: string;
}
export interface ICheckboxWrapperProps extends Partial<IFieldWrapperProps<CheckboxValueType>> {
    value?: string;
    children: (params: ICheckboxWrapperReturn) => ReactNode;
    onChange?: ChangeEventHandler;
}

export interface ICheckboxState {
    // Отключен ли
    disabled?: boolean;

    /**
     * Растягивать ли компонент на всю ширину
     */
    block?: boolean;

    /**
     * Управление неопределенным состоянием чекбокса
     */
    indeterminate?: boolean;

    /**
     * Управление состоянием вкл/выкл чекбокса (native prop)
     */
    checked?: boolean;

    /**
     * Управление состоянием фокуса
     */
    focused?: boolean;

    /**
     * Выравнивание
     */
    align?: Align;

    /**
     * Отображение ошибки
     */
    error?: string;
}

interface ICheckboxParts {
    hint?: ReactNode;
}
interface ICheckboxCSS {
    /**
     * Доп. класс чекбокса
     */
    boxCSS?: CSSObject;

    /**
     * Доп. класс контента
     */
    contentCSS?: CSSObject;
    hintCSS?: CSSObject;
    css?: CSSObject;
    errorCSS?: CSSObject;
    labelCSS?: CSSObject;
    iconCSS?: CSSObject;
    indeterminateLineCSS?: CSSObject;
}

export interface ICheckboxTheme {
    size?: keyof typeof CheckboxSize;
    variant?: keyof typeof CheckboxVariant;
}

export type CheckboxThemeState = BaseThemeState<typeof CheckboxVariant, typeof CheckboxSize> & ICheckboxState;
export interface ICheckboxProps
    extends Omit<HTMLProps<HTMLInputElement>, 'size' | 'css'>,
        ICheckboxState,
        ICheckboxTheme,
        ICheckboxCSS,
        ICheckboxParts {}

export interface IFormCheckboxProps
    extends Omit<ICheckboxWrapperProps, 'children'>,
        Omit<ICheckboxProps, keyof Omit<ICheckboxWrapperProps, 'children'> | keyof ICheckboxWrapperReturn | 'ref'> {}
