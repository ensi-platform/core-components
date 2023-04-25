import { scale } from '@greensight/gds';

import { OptionizedCSS, colors, extractCSSOption, typography } from '@scripts/gds';

// eslint-disable-next-line import/no-cycle
import { FormControlSize, FormControlTheme, FormControlVariant } from '../types';

export const basicTheme: FormControlTheme = {
    wrapper: ({ block }) => ({
        maxWidth: '100%',
        width: 'fit-content',
        ...(block && { width: '100%' }),
    }),
    inner: ({ size, focused, hasError, disabled }) => {
        const sized: OptionizedCSS<typeof FormControlSize> = {
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
                background: colors?.grey300,
            }),
        };
    },
    controlWrapper: ({ size, hasRightAddons, hasLeftAddons, disabled }) => {
        const sized: OptionizedCSS<typeof FormControlSize> = {
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
                color: colors?.grey600,
                cursor: 'not-allowed',
                background: colors?.grey300,
            }),
        };
    },
    label: ({ size = 'md', hasError, labelWrap }) => {
        const sized: OptionizedCSS<typeof FormControlSize> = {
            sm: {
                ...typography('bodySmBold')!,
                marginBottom: scale(1, true),
            },
            md: {
                ...typography('bodySmBold')!,
                marginBottom: scale(1),
            },
            lg: {
                ...typography('bodySmBold')!,
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
        const paddings: OptionizedCSS<typeof FormControlSize> = {
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
    sub: ({ hasError, size = 'md', variant = 'primary' }) => {
        const sized: OptionizedCSS<typeof FormControlSize> = {
            sm: {
                marginTop: scale(1),
            },
            md: {
                marginTop: scale(1),
            },
            lg: { ...typography('bodySm'), marginTop: scale(3, true) },
        };
        const variants: OptionizedCSS<typeof FormControlVariant> = {
            primary: { color: colors?.grey600 },
        };
        return {
            display: 'block',
            ...extractCSSOption(sized, size),
            ...extractCSSOption(variants, variant),
            ...(hasError && { color: colors.danger }),
        };
    },
};
