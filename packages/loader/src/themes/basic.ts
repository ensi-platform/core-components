import {
    defaultTheme,
    extractCSSOption,
    type OptionizedCSS,
    scale,
    typography,
} from '@greensight/core-components-common';
import { LoaderSizes, LoaderVariants, Opacities } from '../scripts/enums';
import { type ILoaderTheme } from '../types';

const { colors } = defaultTheme;

export const basicTheme: ILoaderTheme<typeof LoaderVariants, typeof LoaderSizes> = {
    wrapper: state => {
        const opacity = state.message ? Opacities.message : Opacities.default;

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
            ...extractCSSOption(variants, state.variant),
        };
    },
    container: state => {
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
            ...extractCSSOption(sized, state.size),
        };
    },
    spinner: state => {
        const sized: OptionizedCSS<typeof LoaderSizes> = {
            md: {
                height: scale(8),
                width: scale(8),
            },
        };

        return {
            ...extractCSSOption(sized, state.size),
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
    message: state => {
        const sized: OptionizedCSS<typeof LoaderSizes> = {
            md: { ...typography('h4') },
        };

        return { ...extractCSSOption(sized, state.size), textAlign: 'center' };
    },
};
