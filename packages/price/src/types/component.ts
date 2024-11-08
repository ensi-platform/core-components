import {
    type BaseThemeState,
    type EnumLike,
    type ExtractTypography,
    defaultTokens,
} from '@ensi-platform/core-components-common';

import type { CSSObject } from '@emotion/react';

import type { PriceThemeType } from './theme';

export interface IPriceState {
    /**
     * Cross all price component
     * @default false
     */
    isCrossed?: boolean;

    /**
     * Typography for price component
     * @default 'bodyMd'
     */
    typography?: ExtractTypography<typeof defaultTokens>;

    /**
     * Typography for unit glyph after price value
     *
     * Has a higher priority than `typography`
     * @default 'bodyMd'
     */
    unitTypography?: ExtractTypography<typeof defaultTokens> | CSSObject;
}

export interface IPriceProps<V extends EnumLike, S extends EnumLike>
    extends Partial<BaseThemeState<V, S, PriceThemeType<V, S>>>,
        IPriceState {
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
     * Hide unit glyph after price value
     * @default false
     */
    hideUnit?: boolean;

    /**
     * Additional container styles
     */
    containerCSS?: CSSObject;

    /**
     * Additional value styles
     */
    valueCSS?: CSSObject;

    /**
     * Additional preText styles
     */
    preTextCSS?: CSSObject;

    /**
     * Additional unit styles
     */
    unitCSS?: CSSObject;

    /**
     * Additional container styles
     *
     * Has a higher priority than `containerCSS`
     */
    className?: string;
}
