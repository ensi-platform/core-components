import type { TabsThemeType } from '../types';
import { basicTheme } from './basic';

export const TABS_THEMES = {
    basic: basicTheme,
};

export const setTabsTheme = (name: keyof typeof TABS_THEMES, theme: TabsThemeType) => {
    TABS_THEMES[name] = theme;
};
