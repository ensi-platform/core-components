import { type BaseThemeState, type EnumLike } from '@greensight/core-components-common';
import { type ILoaderState, type ILoaderTheme } from './themes';

export interface ILoaderProps<V extends EnumLike, S extends EnumLike>
    extends Partial<BaseThemeState<V, S, ILoaderTheme<V, S>>>,
        Partial<ILoaderState> {}
