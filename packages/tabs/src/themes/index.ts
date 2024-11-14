// eslint-disable-next-line import/no-cycle
import type { TabsTheme } from '../types';
import { basicTheme } from './basic';

export const TABS_THEMES = {
    basic: basicTheme,
};

export const setTabsTheme = (name: keyof typeof TABS_THEMES, theme: TabsTheme) => {
    TABS_THEMES[name] = theme;
};
