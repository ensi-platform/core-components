import { type BaseThemeState, type EnumLike } from '@greensight/core-components-common';
import { type CSSObject } from '@emotion/react';
import { type IPriceState, type IPriceTheme } from './theme';

export interface IPriceProps<V extends EnumLike, S extends EnumLike>
    extends Partial<BaseThemeState<V, S, IPriceTheme<V, S>>>,
        Partial<IPriceState> {
    /**
     * Price value
     */
    value: number;

    /**
     * Text after price value
     * @default '₽'
     */
    unit?: string;

    /**
     * Text before price value
     */
    preText?: string;

    /**
     * Disable text before price value
     * @default false
     */
    disableUnit?: boolean;

    /**
     * Additional value styles
     */
    valueStyles?: CSSObject;

    /**
     * Additional preText styles
     */
    preTextStyles?: CSSObject;

    /**
     * Additional unit styles
     */
    unitStyles?: CSSObject;
}
