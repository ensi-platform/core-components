import type { BaseThemeState, StyleDefinition } from '@ensi-platform/core-components-common';

import type { ITabsState } from './component';

export enum TabsSize {
    md = 'md',
}

export enum TabsVariant {
    primary = 'primary',
}

interface ITabState {
    hidden?: Boolean;
}

interface IToggleState {
    isSelected?: boolean;
    disabled?: boolean;
    focused?: boolean;
    isOption?: boolean;
    hasErrors?: boolean;
    isCollapsed?: boolean;
}

export type TabsThemeStateType = BaseThemeState<typeof TabsVariant, typeof TabsSize, never> &
    ITabsState &
    ITabState &
    IToggleState;

enum TabsParts {
    container,
    scrollableContainer,
    tabList,
    line,
    tab,
    toggle,
    showMoreButton,
    toggleRightAddons,
    toggleLeftAddons,
    errorAddon,
}

export type TabsThemeType = Record<keyof typeof TabsParts, StyleDefinition<TabsThemeStateType>>;
