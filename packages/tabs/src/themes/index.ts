// eslint-disable-next-line import/no-cycle
import { basicTheme } from './basic';

import { TabsTheme } from '../types';

export const TABS_THEMES = {
    basic: basicTheme,
    secondary: basicTheme,
};

export const setTabsTheme = (name: keyof typeof TABS_THEMES, theme: TabsTheme) => {
    TABS_THEMES[name] = theme;
};
