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
import { Accordion, AccordionTheme } from './themes/accordion';
import { Button } from './themes/button';
import { Calendar, CalendarTheme } from './themes/calendar';
import { global } from './themes/global';
import { Input, InputTheme } from './themes/input';
import { Select, SelectTheme } from './themes/select';
import { Tabs, TabsTheme } from './themes/tabs';

interface ComponentsThemeExtended extends ComponentsTheme {
    Calendar?: CalendarTheme;
    Tabs?: TabsTheme;
    Input?: InputTheme;
    Select?: SelectTheme;
    Accordion?: AccordionTheme;
}

export const {
    colors,
    shadows,
    layout: { breakpoints: Breakpoints },
} = tokens;
export type ColorsTheme = typeof colors;
export type TypographyParam = keyof typeof tokens.typography.styles;

export const MEDIA_QUERIES = createMediaQueries(tokens.layout.breakpoints);

export interface ExtendedTheme extends Omit<Theme, 'colors'> {
    components?: ComponentsThemeExtended;
    colors?: ColorsTheme;
}

const settings: ExtendedTheme = {
    global,
    components: {
        Button,
        Calendar,
        Tabs,
        Input,
        Select,
        Accordion,
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
