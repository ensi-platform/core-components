import type { BaseThemeState, EnumLike, StyleDefinition, ValueOrFunction } from '@ensi-platform/core-components-common';
import type { ILoaderState } from './component';

export type LoaderStateFullType<V extends EnumLike, S extends EnumLike> = BaseThemeState<V, S> & ILoaderState;

export type LoaderThemeType<V extends EnumLike, S extends EnumLike> = ValueOrFunction<
    {
        wrapper: StyleDefinition<LoaderStateFullType<V, S>>;
        container: StyleDefinition<LoaderStateFullType<V, S>>;
        spinner: StyleDefinition<LoaderStateFullType<V, S>>;
        message: StyleDefinition<LoaderStateFullType<V, S>>;
    },
    [LoaderStateFullType<V, S>]
>;
