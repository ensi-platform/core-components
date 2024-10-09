import { CSSObject } from '@emotion/react';
import {
    BaseThemeState,
    FormFieldDescendantProps,
    StyleDefinition,
    ValueOrFunction,
    useCheckboxLikeControlHookType,
} from '@greensight/core-components-common';
import { ChangeEvent, InputHTMLAttributes, ReactNode } from 'react';

export const CheckboxSize = {
    md: 'md',
} as const;

export const CheckboxVariant = {
    primary: 'primary',
} as const;

type NativeProps = InputHTMLAttributes<HTMLInputElement>;
type Align = 'start' | 'center';

export interface CheckboxState {
    // Отключен ли
    disabled?: boolean;

    /**
     * Растягивать ли компонент на всю ширину
     */
    block?: boolean;

    /**
     * Управление состоянием активен / неактивен
     */
    inactive?: boolean;

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
    error?: boolean;
}

export type CheckboxThemeState = BaseThemeState<typeof CheckboxVariant, typeof CheckboxSize> & CheckboxState;

export type CheckboxTheme = ValueOrFunction<
    {
        container: StyleDefinition<CheckboxThemeState>;
        content: StyleDefinition<CheckboxThemeState>;
        box: StyleDefinition<CheckboxThemeState>;
        icon: StyleDefinition<CheckboxThemeState>;
        indeterminateLine: StyleDefinition<CheckboxThemeState>;

        hint: StyleDefinition<CheckboxThemeState>;
        error: StyleDefinition<CheckboxThemeState>;
        addons: StyleDefinition<CheckboxThemeState>;
    },
    [CheckboxThemeState]
>;

export type CheckboxProps = Omit<CheckboxState, 'focused' | 'error'> &
    Partial<Omit<BaseThemeState<typeof CheckboxVariant, typeof CheckboxSize, CheckboxTheme>, 'theme'>> &
    Omit<NativeProps, 'size' | 'onChange' | 'enterKeyHint'> &
    FormFieldDescendantProps & {
        /**
         * Обработчик переключения чекбокса
         */
        onChange?: (event: ChangeEvent<HTMLInputElement>) => void;

        /**
         * Текст подписи к чекбоксу
         */
        label?: ReactNode | ReactNode[];

        /**
         * Текст подсказки снизу
         */
        hint?: ReactNode;

        /**
         * Доп. класс чекбокса
         */
        boxCSS?: CSSObject;

        /**
         * Доп. класс контента
         */
        contentCSS?: CSSObject;

        /**
         * Дополнительный слот
         */
        addons?: ReactNode;

        /**
         * Флаг для скрытия нативного инпута.
         * @default false
         */
        hiddenInput?: boolean;

        /**
         * Тема
         */
        theme?: CheckboxTheme;

        /**
         * Используйте label вместо children, это логичнее.
         * @deprecated
         */
        children?: ReactNode | ReactNode[];

        css?: CSSObject;

        useControlHook?: useCheckboxLikeControlHookType;
    };
