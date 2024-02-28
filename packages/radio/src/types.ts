import { HTMLProps, Ref } from 'react';
import {
    BaseThemeState,
    StyleDefinition,
    ValueOrFunction,
    useCheckboxLikeControlHookType,
} from '@greensight/core-components-common';

import { CSSObject } from '@emotion/react';
import { radioThemes } from './themes';

/**
 * Размеры радио-кнопки
 */
export enum RadioSize {
    sm = 'sm',
    md = 'md',
}
/**
 * Варианты радио-кнопки
 */
export enum RadioVariant {
    primary = 'primary',
}

/**
 * Состояния радиокнопки
 */
export interface RadioState {
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
    /**
     * Только чтение, либо анселект
     */
    disabledCanUnselect?: boolean;

    /**
     * Стиль отображения, либо пустой, либо с колечком
     */
    view: 'padded-knob' | 'plain';
}
/**
 * Состояния радио-кнопки
 */
export type RadioThemeState = BaseThemeState<typeof RadioVariant, typeof RadioSize, never> & RadioState;

enum RadioParts {
    label,
    icon,
    input,
    error,
}
/**
 * Темы радио-кнопки
 */
export type RadioTheme = ValueOrFunction<
    Record<keyof typeof RadioParts, StyleDefinition<RadioThemeState>>,
    [RadioThemeState]
>;
/**
 * Пропсы радио-кнопки
 */
export interface RadioProps
    extends Omit<BaseThemeState<typeof RadioVariant, typeof RadioSize, RadioTheme>, 'theme'>,
        Omit<HTMLProps<HTMLInputElement>, 'size'> {
    /** Ref for inner input */
    inputRef?: Ref<HTMLInputElement>;

    /** Additional class */
    className?: string;
    /** Error message */
    error?: string;
    /** Show error flag */
    showError?: boolean;
    theme?: RadioTheme | keyof typeof radioThemes;
    allowUnselectDisabledOptions?: boolean;

    view?: 'padded-knob' | 'plain';

    inputCSS?: CSSObject;
    wrapperCSS?: CSSObject;
    labelCSS?: CSSObject;

    useControlHook?: useCheckboxLikeControlHookType;
}
