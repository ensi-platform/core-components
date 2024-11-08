import { type OptionizedCSS, defaultTheme, extractCSSOption, scale } from '@ensi-platform/core-components-common';

import { type LoadingSkeletonSizes, type LoadingSkeletonVariants, prepareSize } from '../scripts';
import type { LoadingSkeletonThemeType } from '../types';

const { colors } = defaultTheme;

export const basicTheme: LoadingSkeletonThemeType<typeof LoadingSkeletonVariants, typeof LoadingSkeletonSizes> = {
    skeleton: ({ duration, height, circle, variant, reverseAnimationDirection, disableAnimation }) => {
        const variantedBaseColor: OptionizedCSS<typeof LoadingSkeletonVariants> = {
            primary: {
                backgroundColor: colors.grey200,
            },
        };

        const variantedHighlightColor: OptionizedCSS<typeof LoadingSkeletonVariants> = {
            primary: {
                backgroundImage: `linear-gradient(90deg, ${colors.grey200} 0%, ${colors.white} 50%, ${colors.grey200} 100%)`,
            },
        };

        return {
            '@keyframes ltr-slide': {
                '100%': {
                    transform: 'translateX(100%)',
                },
            },

            ...extractCSSOption(variantedBaseColor, variant),

            width: '100%',
            ...(height && { height: '100%' }),

            borderRadius: circle ? '50%' : scale(1, true),
            display: height ? 'flex' : 'inline-flex',
            lineHeight: 1,

            position: 'relative',
            userSelect: 'none',
            overflow: 'hidden',

            '::after': {
                content: '""',
                display: disableAnimation ? 'none' : 'block',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '100%',
                backgroundRepeat: 'no-repeat',
                ...extractCSSOption(variantedHighlightColor, variant),
                transform: 'translateX(-100%)',

                animationName: 'ltr-slide',
                animationDirection: reverseAnimationDirection ? 'reverse' : 'normal',
                animationDuration: `${duration}s`,
                animationTimingFunction: 'ease-in-out',
                animationIterationCount: 'infinite',
            },
        };
    },
    wrapper: ({ count, verticalStep, height, width }) => {
        const preparedHeight = typeof height === 'number' ? height : prepareSize(height as string);
        const preparedWidth = typeof width === 'number' ? width : prepareSize(width as string);

        return {
            ...(count && count <= 1 && { lineHeight: 1 }),
            ...(verticalStep && {
                '& > span > span:not(:first-child)': {
                    marginTop: verticalStep,
                },
            }),
            ...(height && {
                '& > span': {
                    display: 'block',
                    height: '100%',
                    width: '100%',
                },
                height: preparedHeight,
            }),
            width: preparedWidth ?? '100%',
        };
    },
};
