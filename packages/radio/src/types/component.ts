import type { BaseThemeState, EnumLike, useCheckboxLikeControlHookType } from '@ensi-platform/core-components-common';

import type { CSSObject } from '@emotion/react';

import type { InputHTMLAttributes } from 'react';

import type { RadioThemeType } from './themes';

export interface IRadioState {
    /**
     * Is radio selected
     * @default false
     */
    checked?: boolean;

    /**
     * Is radio disabled
     * @default false
     */
    disabled?: boolean;

    /**
     * Error message (manage error state)
     * @default ''
     */
    error?: string;
}

export interface IRadioProps<V extends EnumLike, S extends EnumLike>
    extends Partial<BaseThemeState<V, S, RadioThemeType<V, S>>>,
        Partial<IRadioState>,
        Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    /**
     * Additional container styles
     *
     * Has a higher priority than `containerCSS` prop
     */
    className?: string;

    /**
     * Label value
     * @default ''
     */
    label?: string;

    /**
     * Additional container styles
     */
    containerCSS?: CSSObject;

    /**
     * Additional label styles
     */
    labelCSS?: CSSObject;

    /**
     * Additional input styles
     */
    inputCSS?: CSSObject;

    /**
     * Additional radio styles
     */
    radioCSS?: CSSObject;

    /**
     * Additional error styles
     */
    errorCSS?: CSSObject;

    /**
     * Custom hook for controlling the radio state
     * @default useCheckboxLikeControlHookType
     */
    useControlHook?: useCheckboxLikeControlHookType;
}
