import type { EnumLike, BaseThemeState, StyleDefinition, ValueOrFunction } from '@ensi-platform/core-components-common';
import type { IPriceState } from './component';

export type PriceStateFullType<V extends EnumLike, S extends EnumLike> = BaseThemeState<V, S> & IPriceState;

export type PriceThemeType<V extends EnumLike, S extends EnumLike> = ValueOrFunction<
    {
        container: StyleDefinition<PriceStateFullType<V, S>>;
        preText?: StyleDefinition<PriceStateFullType<V, S>>;
        value?: StyleDefinition<PriceStateFullType<V, S>>;
        unit?: StyleDefinition<PriceStateFullType<V, S>>;
    },
    [PriceStateFullType<V, S>]
>;
