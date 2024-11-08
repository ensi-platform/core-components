import {
    type BaseThemeState,
    type StyleDefinition,
    type ValueOrFunction,
    type useCheckboxLikeControlHookType,
} from '@ensi-platform/core-components-common';

import { type CSSObject } from '@emotion/react';

import { type HTMLProps, type Ref } from 'react';

import { type switcherThemes } from './themes';

/**
 * Размеры переключателя
 */
export enum SwitcherSize {
    sm = 'sm',
    md = 'md',
}

/**
 * Варианты переключателя
 */
export enum SwitcherVariant {
    primary = 'primary',
}

/**
 * Состояния свитчера
 */
export interface SwitcherState {
    /**
     * Выбранное состояние
     */
    checked?: boolean;

    /**
     * Заблокированное состояние
     */
    disabled?: boolean;

    /**
     * Cостояние только для чтения
     */
    readOnly?: boolean;

    /**
     * С ошибкой
     */
    hasError?: boolean;
}

/**
 * Состояния переключателя
 */
export type SwitcherThemeState = BaseThemeState<typeof SwitcherVariant, typeof SwitcherSize, never> & SwitcherState;

enum SwitcherParts {
    label,
    icon,
    input,
    error,
}

/**
 * Темы переключателя
 */
export type SwitcherTheme = ValueOrFunction<
    Record<keyof typeof SwitcherParts, StyleDefinition<SwitcherThemeState>>,
    [SwitcherThemeState]
>;

/**
 * Пропсы переключателя
 */
export interface SwitcherProps
    extends Omit<BaseThemeState<typeof SwitcherVariant, typeof SwitcherSize, SwitcherTheme>, 'theme'>,
        Omit<HTMLProps<HTMLInputElement>, 'size'> {
    /** Ref for inner input */
    inputRef?: Ref<HTMLInputElement>;

    /** Additional css for label */
    labelCSS?: CSSObject;

    /** Additional class */
    className?: string;

    /** Additional css for input */
    inputCSS?: CSSObject;

    error?: string;

    theme?: SwitcherTheme | keyof typeof switcherThemes;
    allowUnselectDisabledOptions?: boolean;

    useControlHook?: useCheckboxLikeControlHookType;
}
