import { type BaseThemeState, type StyleDefinition, type ValueOrFunction } from '@ensi-platform/core-components-common';

import { type CSSObject } from '@emotion/react';

import { type FC, type FocusEvent, type HTMLProps, type MouseEvent, type MouseEventHandler } from 'react';

import { type ratingThemes } from './themes';

export enum RatingSize {
    sm = 'sm',
    md = 'md',
    lg = 'lg',
}

export enum RatingVariant {
    primary = 'primary',
}

export interface RatingState {
    disabled: boolean;
    value: number;
    readOnly: boolean;
    label: string;
    showReadOnlyEmptyStar: boolean;

    /**
     * Точность, кратность дробности
     * @example 1 - только целые шаги, 0.5 - половина
     */
    precision: number;
}

export interface RatingStarState {
    isLast: boolean;
    isChecked: boolean;
    isFilled: boolean;
    isHovered: boolean;
    isFocusVisible: boolean;
    isActive: boolean;
}

export type RatingThemeState = BaseThemeState<typeof RatingVariant, typeof RatingSize, never> & RatingState;

export type RatingTheme = ValueOrFunction<
    {
        container: StyleDefinition<RatingThemeState & { isFocused?: boolean }>;
        fractionWrapper: StyleDefinition<RatingThemeState>;
        iconWrapper: StyleDefinition<RatingThemeState & Partial<RatingStarState>>;
        icon: StyleDefinition<RatingThemeState & Partial<RatingStarState>>;
    },
    [RatingThemeState]
>;

export type RatingProps = Partial<Omit<BaseThemeState<typeof RatingVariant, typeof RatingSize, RatingTheme>, 'theme'>> &
    Partial<RatingState> & {
        onMouseMove?: MouseEventHandler;
        name?: string;
        className?: string;
        onChange?: (e: { target: { value: number } }) => void;
        onHoverChange?: (e: MouseEvent, payload: { value: number }) => void;
        getLabelText?: (val: number) => string;
        emptyLabelText?: string;

        containerCSS?: CSSObject;
        fractionWrapperCSS?: CSSObject;
        iconWrapperCSS?: CSSObject;
        iconCSS?: CSSObject;

        StarIcon?: FC<any>;

        theme?: RatingTheme | keyof typeof ratingThemes;
    };

export interface RatingStarProps extends Omit<HTMLProps<HTMLLabelElement>, 'onChange' | 'name'> {
    itemValue: number;
    disabled?: boolean;
    id: string;
    name: string;
    onChange: (val: number) => void;
    onBlur: (event: FocusEvent) => void;
    onFocus: (event: FocusEvent) => void;
    onClick: (event: MouseEvent) => void;
    getLabelText: RatingProps['getLabelText'];
    showReadOnlyEmptyStar: boolean;
    isReadonly?: boolean;
    iconCSS?: CSSObject;
    iconWrapperCSS?: CSSObject;
    isFilled?: boolean;
    isChecked?: boolean;
    StarIcon: FC<any>;
}
