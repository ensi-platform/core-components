import { type OptionizedCSS, defaultTheme, extractCSSOption, scale } from '@ensi-platform/core-components-common';

import type { FormControlSizeEnum, FormControlVariantEnum, TFormControlTheme } from '../types/index';

const { colors, typography } = defaultTheme;

export const basicTheme: TFormControlTheme = {
    wrapper: ({ block }) => ({
        maxWidth: '100%',
        width: 'fit-content',
        ...(block && { width: '100%' }),
    }),
    error: ({ errorPlacement }) => ({
        [errorPlacement === 'above' ? 'marginBottom' : 'marginTop']: scale(1),
    }),
    field: ({ size, focused, hasError, disabled }) => {
        const sized: OptionizedCSS<typeof FormControlSizeEnum> = {
            sm: {
                ...typography('bodySm'),
            },
            md: {
                ...typography('bodySm'),
                lineHeight: 1,
            },
            lg: {
                ...typography('bodyMd'),
            },
        };
        return {
            display: 'flex',
            outline: 'none',
            position: 'relative',
            minHeight: '100%',
            background: colors.grey100,
            color: colors.black,
            transition: 'color,background-color .2s ease',
            border: `1px solid ${colors.grey400}`,

            ...extractCSSOption(sized, size),
            ...(focused && {
                borderColor: colors.primary,
            }),
            ...(hasError && {
                borderColor: focused ? colors.primary : colors?.danger,
            }),
            ...(disabled && {
                color: colors?.grey400,
                background: colors?.grey200,
            }),
        };
    },
    control: ({ size, hasRightAddons, hasLeftAddons, disabled }) => {
        const sized: OptionizedCSS<typeof FormControlSizeEnum> = {
            sm: {
                padding: `${scale(1, true)}px ${scale(1)}px`,
                minHeight: scale(3),

                ...(hasRightAddons && {
                    paddingRight: scale(1, true),
                }),

                ...(hasLeftAddons && {
                    paddingLeft: scale(1, true),
                }),
            },
            md: {
                padding: `${scale(1, true)}px ${scale(1)}px`,
                minHeight: scale(4),

                ...(hasRightAddons && {
                    paddingRight: 0,
                }),

                ...(hasLeftAddons && {
                    paddingLeft: 0,
                }),
            },
            lg: {
                padding: `${scale(1)}px ${scale(3, true)}px`,
                minHeight: scale(5),

                ...(hasRightAddons && {
                    paddingRight: 0,
                }),

                ...(hasLeftAddons && {
                    paddingLeft: 0,
                }),
            },
        };
        return {
            position: 'relative',
            ...extractCSSOption(sized, size),
            ...(disabled && {
                color: colors?.grey800,
                cursor: 'not-allowed',
                background: colors?.grey200,
            }),
        };
    },
    label: ({ size = 'md', hasError, labelWrap }) => {
        const sized: OptionizedCSS<typeof FormControlSizeEnum> = {
            sm: {
                ...(typography('bodySmBold') as any),
                marginBottom: scale(1, true),
            },
            md: {
                ...(typography('bodySmBold') as any),
                marginBottom: scale(1),
            },
            lg: {
                ...(typography('bodySmBold') as any),
                marginBottom: scale(1),
            },
        };

        return {
            color: colors.black,
            display: 'block',
            ...extractCSSOption(sized, size),
            ...(hasError && {
                color: colors.danger,
            }),
            ...(!labelWrap && {
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
            }),
        };
    },
    addons: ({ isLeft, size = 'md', disabled }) => {
        const paddings: OptionizedCSS<typeof FormControlSizeEnum> = {
            sm: {
                [!isLeft ? 'paddingRight' : 'paddingLeft']: scale(1, true),
            },
            md: {
                [!isLeft ? 'paddingRight' : 'paddingLeft']: scale(3, true),
            },
            lg: {
                [!isLeft ? 'paddingRight' : 'paddingLeft']: scale(2),
            },
        };

        return {
            cursor: disabled ? 'not-allowed' : 'default',
            display: 'flex',
            flexShrink: 0,
            alignItems: 'center',
            ...extractCSSOption(paddings, size),
        };
    },
    hint: ({ size = 'md', variant = 'primary' }) => {
        const sized: OptionizedCSS<typeof FormControlSizeEnum> = {
            sm: {
                marginTop: scale(1),
            },
            md: {
                marginTop: scale(1),
            },
            lg: { ...(typography('bodySm') as any), marginTop: scale(3, true) },
        };
        const variants: OptionizedCSS<typeof FormControlVariantEnum> = {
            primary: { color: colors?.grey600 },
        };
        return {
            display: 'block',
            ...extractCSSOption(sized, size),
            ...extractCSSOption(variants, variant),
        };
    },
    clear: ({ size = 'md', hasRightAddons }) => {
        const sized: OptionizedCSS<typeof FormControlSizeEnum> = {
            sm: {},
            md: {
                ...(hasRightAddons && {
                    marginRight: scale(1),
                }),
            },
            lg: {},
        };
        return {
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            ...extractCSSOption(sized, size),
        };
    },
};
