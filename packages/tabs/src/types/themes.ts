import type { BaseThemeState, StyleDefinition } from '@ensi-platform/core-components-common';

import type { ITabsState } from './component';

export enum TabsSize {
    md = 'md',
}

export enum TabsVariant {
    primary = 'primary',
}

export type TabsThemeStateType = BaseThemeState<typeof TabsVariant, typeof TabsSize, never> & ITabsState;

export type TabsThemeType = {
    container: StyleDefinition<TabsThemeStateType>;
    scrollableContainer: StyleDefinition<TabsThemeStateType>;
    tabList: StyleDefinition<TabsThemeStateType>;
    line: StyleDefinition<TabsThemeStateType>;
    tab: StyleDefinition<TabsThemeStateType & { hidden?: boolean }>;
    toggle: StyleDefinition<
        TabsThemeStateType & {
            isSelected?: boolean;
            disabled?: boolean;
            focused?: boolean;
            isOption?: boolean;
            hasErrors?: boolean;
            isCollapsed?: boolean;
        }
    >;
    showMoreButton: StyleDefinition<TabsThemeStateType>;
    toggleRightAddons: StyleDefinition<TabsThemeStateType>;
    toggleLeftAddons: StyleDefinition<TabsThemeStateType>;
    errorAddon: StyleDefinition<TabsThemeStateType>;
};
