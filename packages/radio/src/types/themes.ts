import type { BaseThemeState, EnumLike, StyleDefinition, ValueOrFunction } from '@ensi-platform/core-components-common';

import type { IRadioState } from './component';

export type RadioStateFullType<V extends EnumLike, S extends EnumLike> = BaseThemeState<V, S> & IRadioState;

export type RadioThemeType<V extends EnumLike, S extends EnumLike> = ValueOrFunction<
    {
        container: StyleDefinition<RadioStateFullType<V, S>>;
        label: StyleDefinition<RadioStateFullType<V, S>>;
        radio: StyleDefinition<RadioStateFullType<V, S>>;
        input: StyleDefinition<RadioStateFullType<V, S>>;
    },
    [RadioStateFullType<V, S>]
>;
