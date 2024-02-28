import { OptionizedCSS, defaultTheme, extractCSSOption, scale } from '@greensight/core-components-common';

// eslint-disable-next-line import/no-cycle
import { TabsSize, TabsTheme } from '../../types';

const { colors, typography } = defaultTheme;

export const toggle: TabsTheme['toggle'] = state => {
    const sized: OptionizedCSS<typeof TabsSize> = {
        md: {
            minHeight: scale(6),
            padding: scale(1),
            ...typography('bodyMd'),
        },
    };

    return {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        transition: 'color 0.2s ease',
        border: 0,
        whiteSpace: 'nowrap',
        outline: 'none',
        ...(state.isCollapsed && {
            order: 99,
            visibility: 'collapse',
        }),
        cursor: 'pointer',
        color: colors.link,
        background: 'none',
        ...(state.isSelected && {
            color: colors.black,
            background: colors.white,
        }),
        ...(state.disabled && {
            cursor: 'not-allowed',
            color: colors.grey500,
        }),
        ':focus': {
            outline: `2px solid ${colors.black}`,
            outlineOffset: state.collapsible ? -2 : -2,
        },
        ...extractCSSOption(sized, state.size),
        ...(state.isOption && {
            minHeight: 0,
        }),
    };
};
