import type { BaseThemeState, EnumLike } from '@greensight/core-components-common';
import { CSSObject } from '@emotion/react';
import type { CSSProperties } from 'react';
import type { LoadingSkeletonThemeType } from './themes';

export interface ILoadingSkeletonState {
    /**
     * The number of lines of skeletons to render.
     *
     * If count is a decimal number like 3.5, three full skeletons and one half-width skeleton will be rendered.
     * @default 1
     */
    count?: number;

    /**
     * The length of the animation in seconds.
     * @default 1.5
     */
    duration?: number;

    /**
     * The height of each skeleton line (px).
     * @default font-size
     */
    height?: CSSProperties['height'];

    /**
     * The width of the skeleton (px).
     * @default 100%
     */
    width?: CSSProperties['width'];

    /**
     * Makes the skeleton circular by setting border-radius to 50%.
     * @default false
     */
    circle?: boolean;

    /**
     * The direction of the animation, either left-to-right or right-to-left.
     *
     * Set `true` to get reverse animation direction
     * @default false (left-to-right)
     */
    reverseAnimationDirection?: boolean;

    /**
     * Removes the animation of the skeleton.
     * @default false
     */
    disableAnimation?: boolean;

    /**
     * Adds an indentation after each skeleton except the last one (px).
     * @default 0
     */
    verticalStep?: number;
}

export interface ILoadingSkeletonProps<V extends EnumLike, S extends EnumLike>
    extends Partial<BaseThemeState<V, S, LoadingSkeletonThemeType<V, S>>>,
        ILoadingSkeletonState {
    /**
     * Additional skeleton wrapper styles
     */
    skeletonWrapperCSS?: CSSObject;

    /**
     * Additional skeleton styles
     */
    skeletonCSS?: CSSObject;

    /**
     * Additional skeleton wrapper styles
     */
    className?: string;
}
