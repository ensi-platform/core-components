import type { BaseThemeState, StyleDefinition } from '@ensi-platform/core-components-common';

import type { TabsState } from './component';

export enum TabsSize {
    md = 'md',
}

export enum TabsVariant {
    primary = 'primary',
}

export type TabsThemeState = BaseThemeState<typeof TabsVariant, typeof TabsSize, never> & TabsState;

export type TabsTheme = {
    container: StyleDefinition<TabsThemeState>;
    scrollableContainer: StyleDefinition<TabsThemeState>;
    tabList: StyleDefinition<TabsThemeState>;
    line: StyleDefinition<TabsThemeState>;
    tab: StyleDefinition<TabsThemeState & { hidden?: boolean }>;
    toggle: StyleDefinition<
        TabsThemeState & {
            isSelected?: boolean;
            disabled?: boolean;
            focused?: boolean;
            isOption?: boolean;
            hasErrors?: boolean;
            isCollapsed?: boolean;
        }
    >;
    showMoreButton: StyleDefinition<TabsThemeState>;
    toggleRightAddons: StyleDefinition<TabsThemeState>;
    toggleLeftAddons: StyleDefinition<TabsThemeState>;
    errorAddon: StyleDefinition<TabsThemeState>;
};
