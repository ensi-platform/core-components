import type { EnumLike, BaseThemeState, StyleDefinition, ValueOrFunction } from '@greensight/core-components-common';
import type { ILoadingSkeletonState } from './component';

export type LoadingSkeletonStateFullType<V extends EnumLike, S extends EnumLike> = BaseThemeState<V, S> &
    ILoadingSkeletonState;

export type LoadingSkeletonThemeType<V extends EnumLike, S extends EnumLike> = ValueOrFunction<
    {
        skeleton: StyleDefinition<LoadingSkeletonStateFullType<V, S>>;
        wrapper: StyleDefinition<LoadingSkeletonStateFullType<V, S>>;
    },
    [LoadingSkeletonStateFullType<V, S>]
>;
