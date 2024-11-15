import type { BaseThemeState, StyleDefinition, ValueOrFunction } from '@ensi-platform/core-components-common';
import { type IFieldWrapperProps } from '@ensi-platform/core-components-form';

import type { CSSObject } from '@emotion/react';

import type { ChangeEventHandler, FormEventHandler, HTMLProps, ReactNode } from 'react';

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
    labelCSS?: CSSObject;
    iconCSS?: CSSObject;
    indeterminateLineCSS?: CSSObject;
}

export type CheckboxThemeState = BaseThemeState<typeof CheckboxVariant, typeof CheckboxSize> & ICheckboxState;

export type CheckboxTheme = ValueOrFunction<
    {
        container: StyleDefinition<CheckboxThemeState>;
        content: StyleDefinition<CheckboxThemeState>;
        box: StyleDefinition<CheckboxThemeState>;
        icon: StyleDefinition<CheckboxThemeState>;
        indeterminateLine: StyleDefinition<CheckboxThemeState>;

        hint: StyleDefinition<CheckboxThemeState>;
        error: StyleDefinition<CheckboxThemeState>;
    },
    [CheckboxThemeState]
>;

export interface ICheckboxProps
    extends Omit<HTMLProps<HTMLInputElement>, 'size' | 'css'>,
        Partial<Omit<BaseThemeState<typeof CheckboxVariant, typeof CheckboxSize, CheckboxTheme>, 'theme'>>,
        ICheckboxState,
        ICheckboxCSS,
        ICheckboxParts {}

export interface IFormCheckboxProps
    extends Omit<ICheckboxWrapperProps, 'children'>,
        Omit<ICheckboxProps, keyof Omit<ICheckboxWrapperProps, 'children'> | keyof ICheckboxWrapperReturn | 'ref'> {}
