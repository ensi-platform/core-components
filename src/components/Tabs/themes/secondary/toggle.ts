/* eslint-disable import/no-cycle */
import { OptionizedCSS, colors, extractCSSOption, scale, shadows, typography } from '@scripts/gds';

import { TabsSize, TabsTheme } from '../../types';

export const toggle: TabsTheme['toggle'] = state => {
    const sized: OptionizedCSS<typeof TabsSize> = {
        md: {
            height: scale(6),
            padding: `${scale(2)}px ${scale(3)}px`,
            borderRadius: scale(2),
            ...typography('bodyMd'),
            ...(state.isOption && {
                height: scale(5),
            }),
        },
    };

    return {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        transition: 'color 0.2s ease, box-shadow 0.2s ease-in-out',
        whiteSpace: 'nowrap',
        outline: 'none',
        border: `1px solid transparent`,
        boxShadow: 'none',
        ...(state.isCollapsed && {
            order: 99,
            visibility: 'collapse',
        }),
        ...(state.disabled
            ? {
                  cursor: 'not-allowed',
                  background: 'transparent',
                  borderColor: colors.grey400,
                  color: colors.grey500,
              }
            : {
                  cursor: 'pointer',
                  background: colors.grey100,
                  color: colors.grey700,
                  ':hover': {
                      color: colors.link,
                  },
              }),
        ...(state.isSelected && {
            background: colors.white,
            color: colors.link,
            borderColor: colors.link,
            boxShadow: shadows?.small,
        }),
        ':focus': {
            outlineOffset: state.collapsible ? -2 : 2,
        },
        ...extractCSSOption(sized, state.size),
        ...(state.isOption && {
            background: 'transparent',
            boxShadow: 'none',
            borderColor: 'transparent',
            minHeight: 0,
        }),
    };
};
