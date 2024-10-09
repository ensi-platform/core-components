import { scale, defaultTheme } from '@greensight/core-components-common';
import { TooltipThemeType } from '../types';

const { colors, shadows } = defaultTheme;

const basicTheme: TooltipThemeType = {
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
    basic: basicTheme as TooltipThemeType,
};

export const setBasicTooltipTheme = (theme: TooltipThemeType) => {
    tooltipThemes.basic = theme;
};
