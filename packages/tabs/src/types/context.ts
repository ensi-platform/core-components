import { type BaseThemeState, useThemeCSSPart } from '@ensi-platform/core-components-common';

import type { ITabsState } from './component';
import type { TabsSize, TabsThemeStateType, TabsThemeType, TabsVariant } from './themes';

const useTabsCSS = () =>
    useThemeCSSPart<Omit<TabsThemeStateType, 'theme'>, TabsThemeType>(...([] as never as [any, any]));

export interface ITabsThemeContext
    extends Required<BaseThemeState<typeof TabsVariant, typeof TabsSize, TabsThemeType>> {
    state: ITabsState;
    getCSS: ReturnType<typeof useTabsCSS>;
    idPrefix: string;
}

export interface ITabsContextProps
    extends Required<BaseThemeState<typeof TabsVariant, typeof TabsSize, TabsThemeType>> {
    idPrefix: string;
    state: ITabsState;
}
