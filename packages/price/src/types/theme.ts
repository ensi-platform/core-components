import {
    type EnumLike,
    type BaseThemeState,
    type StyleDefinition,
    type ExtractTypography,
    defaultTokens,
    ValueOrFunction,
} from '@greensight/core-components-common';

export interface IPriceState {
    /**
     * Cross all price component
     * @default false
     */
    isCrossed: boolean;

    /**
     * Typography for price component
     * @default 'bodyMd'
     */
    typography: ExtractTypography<typeof defaultTokens>;
}

export type PriceStateFullType<V extends EnumLike, S extends EnumLike> = BaseThemeState<V, S> & IPriceState;

export type IPriceTheme<V extends EnumLike, S extends EnumLike> = ValueOrFunction<
    {
        container: StyleDefinition<PriceStateFullType<V, S>>;
        preText?: StyleDefinition<PriceStateFullType<V, S>>;
        value?: StyleDefinition<PriceStateFullType<V, S>>;
        unit?: StyleDefinition<PriceStateFullType<V, S>>;
    },
    [PriceStateFullType<V, S>]
>;
