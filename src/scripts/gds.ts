import { CSSObject } from '@emotion/core';
import {
    ComponentsTheme,
    Theme,
    createMediaQueries,
    createTheme,
    typography as gdsTypography,
    useTheme as useGDSTheme,
} from '@greensight/gds';

import tokens from '../../public/tokens.json';
import { Button } from './themes/button';
import { global } from './themes/global';

interface ComponentsThemeExtended extends ComponentsTheme {}

export const {
    colors,
    shadows,
    layout: { breakpoints: Breakpoints },
} = tokens;
export type BreakpointParam = keyof typeof Breakpoints;
export type ColorsTheme = typeof colors;
export type TypographyParam = keyof typeof tokens.typography.styles;
export type BreakpointParam = keyof typeof tokens.layout.breakpoints;

export const MEDIA_QUERIES = createMediaQueries(tokens.layout.breakpoints);

export interface ExtendedTheme extends Omit<Theme, 'colors'> {
    components?: ComponentsThemeExtended;
    colors?: ColorsTheme;
}

const settings: ExtendedTheme = {
    global,
    components: {
        Button,
    },
};

const theme = createTheme({
    tokens,
    settings,
}) as ExtendedTheme;

const typography = (name: TypographyParam = 'bodySm') => gdsTypography(name, theme) as CSSObject;
const useTheme = () => useGDSTheme() as ExtendedTheme;

export * from '@greensight/gds';
export { typography, theme, useTheme };
