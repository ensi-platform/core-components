import { type OptionizedCSS, defaultTheme, extractCSSOption, scale } from '@greensight/core-components-common';

import type { RatingSize, RatingTheme } from '../types';

const { colors, mediaQueries } = defaultTheme;

const iconSized: OptionizedCSS<typeof RatingSize> = {
    sm: {
        width: scale(3, true),
        height: scale(3, true),
    },
    md: {
        width: scale(3, true) + 2,
        height: scale(3, true) + 2,
    },
    lg: {
        width: scale(3),
        height: scale(3),
    },
};

export const basicTheme: RatingTheme = {
    container: ({ size, isFocused }) => {
        const sized: OptionizedCSS<typeof RatingSize> = {
            sm: {
                gap: 2,
            },
            md: {
                gap: 2,
            },
            lg: {
                gap: 4,
            },
        };

        return {
            display: 'inline-flex',
            // height: 'fit-content',
            ...extractCSSOption(sized, size),
            ...(isFocused && {
                outline: `2px solid ${colors.black}`,
            }),
        };
    },
    iconWrapper: ({ readOnly, disabled, isFocusVisible, isFilled, isHovered, isActive }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'fit-content',
        cursor: 'pointer',
        ...(readOnly && {
            cursor: 'default',
        }),
        ...(disabled && {
            cursor: 'not-allowed',
            opacity: 0.5,
            svg: {
                fill: colors.grey600,
                color: colors.grey600,
            },
        }),
        ...(isFocusVisible &&
            {
                // outline: `2px solid ${colors.black}`,
            }),
        [mediaQueries.smMin]: {
            ...(isHovered && {
                transform: 'scale(1.1)',
            }),
        },
        // eslint-disable-next-line no-nested-ternary
        ...((isFilled || isActive)
            ? {
                  fill: colors.primary,
                  color: colors.primary,
              }
            : {
                  fill: colors.grey300,
                  color: colors.grey300,
              }),
    }),
    icon: ({ size }) => ({
        ...extractCSSOption(iconSized, size),
        transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        willChange: 'transform',
    }),
    fractionWrapper: ({ size }) => ({
        position: 'relative',
        marginTop: -1,
        ...extractCSSOption(iconSized, size),
    }),
};
