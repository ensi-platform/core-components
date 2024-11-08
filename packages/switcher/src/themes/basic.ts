import { OptionizedCSS, defaultTheme, extractCSSOption, scale } from '@ensi-platform/core-components-common';

import { CSSObject } from '@emotion/react';

import deepmerge from 'deepmerge';

import { SwitcherSize, SwitcherTheme, SwitcherVariant } from '../types';

const { colors, typography } = defaultTheme;

export const basicTheme: SwitcherTheme = {
    input: () => ({
        position: 'absolute',
        clip: 'rect(0, 0, 0, 0)',
    }),

    label: ({ size, variant, hasError }) => {
        const sizes: OptionizedCSS<typeof SwitcherSize> = {
            sm: {
                ...typography('bodyMd'),
                paddingLeft: scale(4),
            },
            md: {
                ...typography('bodyMd'),
                paddingLeft: scale(4),
            },
        };

        const variants: OptionizedCSS<typeof SwitcherVariant> = {
            primary: {
                'input:focus:(.focus-visible) + &': {
                    outline: `3px solid ${colors.danger}`,
                    outlineOffset: 2,
                },

                'input:disabled + &': {
                    color: colors.grey400,
                },

                '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 'calc(50% - 12px)',
                    left: 0,
                    display: 'block',
                    width: scale(5, false, 10),
                    height: scale(3, false, 10),
                    background: colors.grey100,
                    borderRadius: '100px',
                    transition: 'background-color .2s',
                    zIndex: 1,

                    'input:checked + &': {
                        background: colors.primary,
                    },

                    'input:disabled + &': {
                        background: colors.grey200,
                        border: `1px solid ${colors.grey400}`,
                        cursor: 'not-allowed',
                    },
                },

                '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 'calc(50% - 10px)',
                    left: '2px',
                    width: scale(4, false, 6.5),
                    height: scale(4, false, 6.5),
                    borderRadius: '100%',
                    transition: '.2s',
                    background: colors.white,
                    boxShadow: '0px 3px 8px 0px #00000026',
                    zIndex: 2,

                    'input:checked + &': {
                        left: 'calc(48px)',
                        transform: 'translateX(-100%)',
                    },
                    'input:active:not(:disabled) + &': {
                        width: '24px',
                    },
                    'input:disabled + &': {
                        background: colors.grey400,
                        cursor: 'not-allowed',
                    },
                },
                ...(hasError && {
                    '&:before': {
                        background: colors.danger,
                    },
                }),
            },
        };
        return {
            ...deepmerge.all<CSSObject>([
                {
                    minHeight: scale(2),
                    minWidth: scale(5, false, 10),
                    position: 'relative',
                    display: 'inline-block',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'color ease 300ms',
                    ':before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        transition: 'background-color ease-out 60ms',
                        borderStyle: 'solid',
                        borderWidth: 0,
                        borderRadius: scale(1, true),
                    },
                },

                extractCSSOption(sizes, size),
                extractCSSOption(variants, variant),
            ]),
        };
    },

    icon: ({ size, variant }) => {
        const sizes: OptionizedCSS<typeof SwitcherSize> = {
            sm: {
                left: `calc(${scale(3)}px / 2)`,
                top: `calc(${scale(3)}px / 2 - 4px)`,
            },
            md: {
                width: scale(2),
                height: scale(2),
                top: `calc(${scale(3)}px / 2)`,
                left: `calc(${scale(3)}px / 2)`,
            },
        };
        const variants: OptionizedCSS<typeof SwitcherVariant> = {
            primary: {
                fill: colors.white,
                'input:checked + label &': {
                    transform: 'translate(-50%, -50%) scale(1)',
                },
                'input:disabled + label &': {
                    fill: colors.grey400,
                    opacity: 0.6,
                    cursor: 'not-allowed',
                },
                'input:checked:disabled + label &': {
                    transform: 'translate(-50%, -50%) scale(1)',
                },
            },
        };
        return {
            ...deepmerge.all<CSSObject>([
                {
                    transform: 'translate(-50%, -50%) scale(0)',
                    position: 'absolute',
                    transition: 'transform ease-out 300ms',
                },
                extractCSSOption(sizes, size),
                extractCSSOption(variants, variant),
            ]),
        };
    },

    error: ({ size, variant }) => {
        const sizes: OptionizedCSS<typeof SwitcherSize> = {
            sm: {
                ...typography('bodyMdBold'),
                marginTop: scale(1),
            },
            md: {
                ...typography('bodyMdBold'),
                marginTop: scale(1),
            },
        };

        const variants: OptionizedCSS<typeof SwitcherVariant> = {
            primary: {
                color: colors.danger,
            },
        };

        return {
            ...extractCSSOption(sizes, size),
            ...extractCSSOption(variants, variant),
        };
    },
};
