import { type BaseThemeState, type EnumLike, type StyleDefinition } from '@greensight/core-components-common';

export interface ILoaderState {
    /**
     * The message is located under the loader spinner
     *
     * If the message is defined, backdrop opacity will be 0.8
     *
     * If the message is undefined, backdrop opacity will be 0.56
     * @default ""
     * @example "Loading..."
     */
    message: string;
}

export type LoaderStateFullType<V extends EnumLike, S extends EnumLike> = BaseThemeState<V, S> & ILoaderState;

export interface ILoaderTheme<V extends EnumLike, S extends EnumLike> {
    wrapper: StyleDefinition<LoaderStateFullType<V, S>>;
    container: StyleDefinition<LoaderStateFullType<V, S>>;
    spinner: StyleDefinition<LoaderStateFullType<V, S>>;
    message: StyleDefinition<LoaderStateFullType<V, S>>;
}
