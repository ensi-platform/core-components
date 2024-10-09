import { OptionizedCSS, extractCSSOption, scale, defaultTheme } from '@greensight/core-components-common';

import { SelectTheme, SelectSize } from '../types';

const { colors, shadows, typography } = defaultTheme;

export const basicTheme: SelectTheme = {
    arrowButton: {
        display: 'flex',
        alignItems: 'center',
    },
    closeButton: {},
    option: ({ isDisabled, isPreloader, isHover, isSelected, size = 'md' }) => {
        const sized: OptionizedCSS<typeof SelectSize> = {
            sm: {
                ...typography('bodySm'),
                padding: `${scale(1, true)}px ${scale(1)}px`,
            },
            md: {
                ...typography('bodySm'),
                padding: `6px ${scale(1)}px`,
            },
            lg: {
                ...typography('bodyMd'),
                padding: `${scale(3, true)}px ${scale(2)}px`,
            },
        };
        return {
            cursor: isDisabled ? 'not-allowed' : 'pointer',
            ...extractCSSOption(sized, size),
            ...(isHover && {
                background: colors.lightBlue,
                color: colors.black,
            }),
            ...(isSelected && {
                fontWeight: 'bold',
                background: colors.primary,
                color: colors.white,
            }),
            ...(isDisabled &&
                !isPreloader && {
                    color: colors.grey800,
                    background: colors.grey400,
                }),
            border: 'none',
        };
    },
    optionList: {
        overflow: 'auto',
        width: '100%',
        border: `1px solid ${colors.grey400}`,
        background: colors.white,
        boxShadow: shadows.box,
        '::-webkit-scrollbar-thumb': {
            backgroundColor: colors?.grey600,
            borderRadius: scale(4),
        },
        '::-webkit-scrollbar': {
            maxWidth: 8,
        },

        '::-webkit-scrollbar-track': {
            backgroundColor: colors?.grey100,
            borderRadius: scale(4),
        },
    },
    optionListWrapper: {
        '::-webkit-scrollbar-thumb': {
            backgroundColor: colors?.grey600,
            borderRadius: scale(4),
        },
        '::-webkit-scrollbar': {
            maxWidth: 8,
        },

        '::-webkit-scrollbar-track': {
            backgroundColor: colors?.grey100,
            borderRadius: scale(4),
        },
    },
    optgroup: {
        flexGrow: 1,
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'left',
        display: 'flex',
        alignItems: 'center',
    },
    field: ({ disabled }) => ({
        ...typography('bodySm'),
        flexGrow: 1,
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'left',
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'flex',
        alignItems: 'center',
    }),
};
