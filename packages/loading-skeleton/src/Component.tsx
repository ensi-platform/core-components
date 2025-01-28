import { type EnumLike, Layout, emptyCSS, useMergeCSS, useThemeCSSPart } from '@ensi-platform/core-components-common';

import { jsx } from '@emotion/react';

import { type FC, useMemo } from 'react';
import Skeleton from 'react-loading-skeleton';

import { LoadingSkeletonSizes, LoadingSkeletonVariants, prepareCount, useValidateSizes } from './scripts';
import { LOADING_SKELETON_THEMES } from './themes';
import type { ILoadingSkeletonProps, LoadingSkeletonStateFullType, LoadingSkeletonThemeType } from './types';

export const BaseLoadingSkeleton = <V extends EnumLike, S extends EnumLike>({
    theme,
    variant,
    size,
    count = 1,
    duration = 1.5,
    verticalStep = 0,
    width,
    height,
    skeletonWrapperCSS: skeletonWrapperCSSProp = emptyCSS,
    skeletonCSS: skeletonCSSProp = emptyCSS,
    className,
    circle = false,
    reverseAnimationDirection = false,
    disableAnimation = false,
    asLayoutItem = false,
    layoutItemProps,
}: ILoadingSkeletonProps<V, S>) => {
    const state = useMemo<LoadingSkeletonStateFullType<V, S>>(
        () => ({
            variant,
            size,
            count,
            duration,
            verticalStep,
            width,
            height,
            circle,
            reverseAnimationDirection,
            disableAnimation,
            asLayoutItem,
        }),
        [
            variant,
            size,
            count,
            duration,
            verticalStep,
            width,
            height,
            circle,
            reverseAnimationDirection,
            disableAnimation,
            asLayoutItem,
        ]
    );

    useValidateSizes({ width, height });

    const getCSS = useThemeCSSPart(theme!, state);

    const wrapperCSS = useMergeCSS(getCSS('wrapper'), skeletonWrapperCSSProp);
    const skeletonCSS = useMergeCSS(getCSS('skeleton'), skeletonCSSProp);

    return prepareCount(count).map(preparedCount =>
        jsx(
            asLayoutItem ? Layout.Item : 'div',
            {
                css: wrapperCSS,
                className,
                ...(asLayoutItem && layoutItemProps),
            },
            <Skeleton inline css={skeletonCSS} count={preparedCount} />
        )
    );
};

export const createLoadingSkeletonWithTheme = <V extends EnumLike, S extends EnumLike>(
    defaultTheme: LoadingSkeletonThemeType<V, S>,
    defaultVariant: V | keyof V,
    defaultSize: S | keyof S
) => {
    const ThemedLoadingSkeleton = ({
        theme = defaultTheme,
        variant = defaultVariant,
        size = defaultSize,
        ...props
    }: ILoadingSkeletonProps<V, S>) => <BaseLoadingSkeleton theme={theme} variant={variant} size={size} {...props} />;

    return ThemedLoadingSkeleton as FC<ILoadingSkeletonProps<V, S>>;
};

const LoadingSkeleton = createLoadingSkeletonWithTheme<typeof LoadingSkeletonVariants, typeof LoadingSkeletonSizes>(
    LOADING_SKELETON_THEMES.basic,
    LoadingSkeletonVariants.primary,
    LoadingSkeletonSizes.md
);

export default LoadingSkeleton;
