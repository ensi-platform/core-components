import { CSSObject } from '@emotion/react';
import { HTMLAttributes, ReactNode } from 'react';

import { BaseThemeState, StyleDefinition, ValueOrFunction } from '@greensight/core-components-common';

export enum FormControlSize {
    sm = 'sm',
    md = 'md',
    lg = 'lg',
}

export enum FormControlVariant {
    primary = 'primary',
}

export interface FormControlState {
    /**
     * Растягивает компонент на ширину контейнера
     */
    block?: boolean;

    /**
     * Заблокированное состояние
     */
    disabled?: boolean;

    /**
     * Cостояние только для чтения
     */
    readOnly?: boolean;

    /**
     * Заполненное состояние
     */
    filled?: boolean;

    /**
     * Выбранное (фокус) состояние
     */
    focused?: boolean;

    /**
     * С ошибкой
     */
    hasError?: boolean;

    /**
     * Разрешить лейблу переноситься по строчкам
     */
    labelWrap?: boolean;

    hasLeftAddons?: boolean;
    hasRightAddons?: boolean;
    hasInnerLabel?: boolean;

    /**
     * Положение ошибки относительно элемента
     * @default 'above'
     */
    errorPlacement?: 'under' | 'above';
}

export type FormControlThemeState = BaseThemeState<typeof FormControlVariant, typeof FormControlSize, never> &
    FormControlState;

type FormControlParts = 'wrapper' | 'inner' | 'label' | 'sub' | 'error' | 'controlWrapper';

export type FormControlTheme = ValueOrFunction<
    Record<FormControlParts, StyleDefinition<FormControlThemeState>> & {
        addons: StyleDefinition<FormControlThemeState & { isLeft: boolean }>;
    },
    [FormControlThemeState]
>;

export type FormControlProps = Partial<
    Omit<BaseThemeState<typeof FormControlVariant, typeof FormControlSize, FormControlTheme>, 'theme'>
> &
    Partial<Omit<FormControlState, 'hasInnerLabel' | 'hasError' | 'hasRightAddons' | 'hasLeftAddons'>> &
    HTMLAttributes<HTMLDivElement> & {
        /**
         * Пропы для лейблов (обычно id и htmlFor)
         */
        labelProps?: HTMLAttributes<HTMLLabelElement>;

        /**
         * ID элемента к которому обращен label
         */
        htmlFor?: string;

        /**
         * Отображение ошибки
         */
        error?: ReactNode | boolean;

        /**
         * Флаг отображения ошибки
         */
        showError?: boolean;
        /**
         * Текст подсказки
         */
        hint?: ReactNode;

        /**
         * Лейбл компонента
         */
        label?: ReactNode;

        /**
         * Слот слева
         */
        leftAddons?: ReactNode;

        /**
         * Слот справа
         */
        rightAddons?: ReactNode;

        /**
         * Слот под полем
         */
        bottomAddons?: ReactNode;

        /**
         * Дополнительный класс
         */
        className?: string;

        /**
         * Дополнительный стиль для лейбла
         */
        labelCSS?: CSSObject;

        /**
         * Дополнительный стиль для поля
         */
        fieldCSS?: CSSObject;

        /**
         * Дополнительный стиль для обертки
         */
        wrapperCSS?: CSSObject;

        /**
         * Дополнительный стиль для левых аддонов
         */
        leftAddonsCSS?: CSSObject;

        /**
         * Дополнительный стиль для правых аддонов
         */
        rightAddonsCSS?: CSSObject;

        /**
         * Компонент поля (инпут, textarea и пр.)
         */
        children?: ReactNode;

        theme?: FormControlTheme;
    };
