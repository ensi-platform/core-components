import { defaultTheme, scale } from '@ensi-platform/core-components-common';

import type { TooltipThemeType } from '../types';

const { colors, shadows } = defaultTheme;

const basicTheme: TooltipThemeType = {
    content: {
        maxWidth: scale(46),
        background: colors.white,
        boxShadow: shadows.small,
    },
    target: {
        display: 'inline-block',
        cursor: 'pointer',
        position: 'relative',
    },
};

export const tooltipThemes = {
    basic: basicTheme as TooltipThemeType,
};

export const setBasicTooltipTheme = (theme: TooltipThemeType) => {
    tooltipThemes.basic = theme;
};
