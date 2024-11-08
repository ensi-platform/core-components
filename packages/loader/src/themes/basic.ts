import {
    type OptionizedCSS,
    defaultTheme,
    extractCSSOption,
    scale,
    typography,
} from '@ensi-platform/core-components-common';

import { LoaderSizes, LoaderVariants, Opacities } from '../scripts/enums';
import type { LoaderThemeType } from '../types';

const { colors } = defaultTheme;

export const basicTheme: LoaderThemeType<typeof LoaderVariants, typeof LoaderSizes> = {
    wrapper: ({ variant, message }) => {
        const opacity = message ? Opacities.withMessage : Opacities.default;

        const variants: OptionizedCSS<typeof LoaderVariants> = {
            primary: {
                background: `${colors?.white}${opacity}`,
            },
        };

        return {
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            ...extractCSSOption(variants, variant),
        };
    },
    container: ({ size }) => {
        const sized: OptionizedCSS<typeof LoaderSizes> = {
            md: {
                padding: scale(4),
                gap: scale(2),
            },
        };

        return {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            ...extractCSSOption(sized, size),
        };
    },
    spinner: ({ size }) => {
        const sized: OptionizedCSS<typeof LoaderSizes> = {
            md: {
                height: scale(8),
                width: scale(8),
            },
        };

        return {
            ...extractCSSOption(sized, size),
            '::after': {
                content: '""',
                display: 'block',
                height: '100%',
                border: `${scale(1, true)}px solid ${colors?.black}`,
                borderRightColor: 'transparent',
                borderLeftColor: 'transparent',
                borderRadius: '50%',
                animation: 'ring 1s linear infinite',
            },
            '@keyframes ring': {
                '0%': { transform: 'rotate(0deg)' },
                '100%': { transform: 'rotate(360deg)' },
            },
        };
    },
    message: ({ size }) => {
        const sized: OptionizedCSS<typeof LoaderSizes> = {
            md: { ...typography('h4') },
        };

        return { ...extractCSSOption(sized, size), textAlign: 'center' };
    },
};
