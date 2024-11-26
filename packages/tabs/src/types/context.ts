import { type BaseThemeState, useThemeCSSPart } from '@ensi-platform/core-components-common';

import type { TabsState, TabsTheme, TabsThemeState } from '../types';
import type { TabsSize, TabsVariant } from './themes';

const useTabsCSS = () => useThemeCSSPart<Omit<TabsThemeState, 'theme'>, TabsTheme>(...([] as never as [any, any]));

export interface ITabsThemeContext extends Required<BaseThemeState<typeof TabsVariant, typeof TabsSize, TabsTheme>> {
    state: TabsState;
    getCSS: ReturnType<typeof useTabsCSS>;
    idPrefix: string;
}

export interface ITabsContextProps extends Required<BaseThemeState<typeof TabsVariant, typeof TabsSize, TabsTheme>> {
    idPrefix: string;
    state: TabsState;
}
