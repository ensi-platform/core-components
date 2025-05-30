import { defaultTheme, scale } from '@ensi-platform/core-components-common';

import type { TooltipTheme } from '../types';

const { colors, shadows } = defaultTheme;

const basicTheme: TooltipTheme = {
    content: {
        padding: scale(2),
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
    basic: basicTheme as TooltipTheme,
};

export const setBasicTooltipTheme = (theme: TooltipTheme) => {
    tooltipThemes.basic = theme;
};
