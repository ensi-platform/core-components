import type { BaseThemeState, EnumLike } from '@greensight/core-components-common';
import type { CSSObject } from '@emotion/react';
import type { LoaderThemeType } from './themes';

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
    message?: string;
}

export interface ILoaderProps<V extends EnumLike, S extends EnumLike>
    extends Partial<BaseThemeState<V, S, LoaderThemeType<V, S>>>,
        ILoaderState {
    /**
     * Additional wrapper styles
     */
    wrapperCSS?: CSSObject;

    /**
     * Additional container styles
     */
    containerCSS?: CSSObject;

    /**
     * Additional spinner styles
     *
     * Use `::after` to style the spinner
     */
    spinnerCSS?: CSSObject;

    /**
     * Additional message styles
     */
    messageCSS?: CSSObject;

    /**
     * Additional wrapper styles
     *
     * Has a higher priority than `wrapperCSS`
     */
    className?: string;
}
