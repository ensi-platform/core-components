import { CSSObject } from '@emotion/react';
import deepmerge from 'deepmerge';

import { scale, OptionizedCSS, defaultTheme, extractCSSOption } from '@ensi-platform/core-components-common';

import { RadioSize, RadioVariant, RadioTheme } from '../types';

const { colors, typography } = defaultTheme;

export const basicTheme: RadioTheme = {
    input: () => ({
        position: 'absolute',
        clip: 'rect(0, 0, 0, 0)',
    }),

    label: ({ size, variant, hasError, view }) => {
        const sizes: OptionizedCSS<typeof RadioSize> =
            view === 'padded-knob'
                ? {
                      sm: {
                          ...typography('bodyMd'),
                          paddingLeft: scale(4),
                      },
                      md: {
                          ...typography('bodyMd'),
                          paddingLeft: scale(4),
                      },
                  }
                : { sm: {}, md: {} };

        const variants: OptionizedCSS<typeof RadioVariant> = {
            primary: {
                position: 'relative',

                'input:focus:(.focus-visible) + &': {
                    outline: `3px solid ${colors.danger}`,
                    outlineOffset: 2,
                },

                'input:disabled + &': {
                    color: colors.grey400,
                },

                '&::after':
                    view === 'padded-knob'
                        ? {
                              content: '""',
                              position: 'absolute',
                              top: 'calc(50% - 12px)',
                              left: 0,
                              display: 'block',
                              width: scale(2, false, 10),
                              height: scale(2, false, 10),
                              border: `1.5px solid ${colors?.grey300}`,
                              borderRadius: '100px',
                              transition: 'background-color .2s',
                              zIndex: 1,

                              'input:checked + &': {
                                  borderColor: colors?.primary,
                              },

                              'input:disabled + &': {
                                  background: colors?.grey100,
                                  border: '1px solid #CDD2D7',
                                  cursor: 'not-allowed',
                              },
                          }
                        : {},

                '&::before':
                    view === 'padded-knob'
                        ? {
                              content: '""',
                              display: 'block',
                              position: 'absolute',
                              top: '5px',
                              left: '5px',
                              width: scale(1, false, 10),
                              height: scale(1, false, 10),
                              borderRadius: '100%',
                              transition: '.2s',
                              zIndex: 2,

                              'input:checked + &': {
                                  background: colors?.primary,
                              },

                              'input:disabled + &': {
                                  background: colors?.grey300,
                                  cursor: 'not-allowed',
                              },
                          }
                        : {},
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
                    minHeight: scale(3),
                    position: 'relative',
                    display: 'inline-block',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'color ease 300ms',
                    ':before':
                        view === 'padded-knob'
                            ? {
                                  content: '""',
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  transition: 'background-color ease-out 60ms',
                                  borderStyle: 'solid',
                                  borderWidth: 0,
                                  borderRadius: scale(1, true),
                              }
                            : {},
                },

                extractCSSOption(sizes, size),
                extractCSSOption(variants, variant),
            ]),
        };
    },
    icon: ({ size, variant }) => {
        const sizes: OptionizedCSS<typeof RadioSize> = {
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
        const variants: OptionizedCSS<typeof RadioVariant> = {
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
        const sizes: OptionizedCSS<typeof RadioSize> = {
            sm: {
                ...typography('bodyMdBold'),
                marginTop: scale(1),
            },
            md: {
                ...typography('bodyMdBold'),
                marginTop: scale(1),
            },
        };

        const variants: OptionizedCSS<typeof RadioVariant> = {
            primary: {
                color: colors?.danger,
            },
        };

        return {
            ...extractCSSOption(sizes, size),
            ...extractCSSOption(variants, variant),
        };
    },
};
