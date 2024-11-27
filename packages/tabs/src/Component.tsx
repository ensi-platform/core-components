import { defaultTheme } from '@ensi-platform/core-components-common';

import { type FC, type MouseEvent, useId, useMemo, useState } from 'react';

import { Tab } from './components/Tab';
import { TabList as DefaultTabList } from './components/TabList';
import { TabsComponent } from './components/Tabs';
import { TabLinkTitle } from './components/Title/LinkTitle';
import { TabsThemeProvider } from './context';
import { useMedia } from './scripts/hooks/useMedia';
import { TABS_THEMES } from './themes';
import type { ITabsProps, ITabsState, SelectedIdType, TabsMatchMediaType } from './types/component';

const {
    mediaQueries: MEDIA_QUERIES,
    tokens: {
        layout: { breakpoints: Breakpoints },
    },
} = defaultTheme;

export type { ITabsProps as TabsProps };

type TabsComponentPropsType = Omit<ITabsProps, 'TabList'> & {
    TabList?: ITabsProps['TabList'];
};

interface ITabsCompositionProps {
    Tab: typeof Tab;
    LinkTitle: typeof TabLinkTitle;
}

export const TabsList: FC<TabsComponentPropsType> & ITabsCompositionProps = ({
    TabList = DefaultTabList,
    variant = 'primary',
    size = 'md',
    mobile: mobileProps,
    collapsible,
    fullWidthScroll,
    scrollable,
    onChange,
    selectedId: propsSelectedId,
    theme: themeName = 'basic',
    breakpoint = Breakpoints.md,
    prefix: propsPrefix,
    ...props
}) => {
    const isControlled = typeof propsSelectedId !== 'undefined' && typeof onChange !== 'undefined';
    const theme = typeof themeName === 'string' ? TABS_THEMES[themeName] : themeName;

    const [view] = useMedia<TabsMatchMediaType>([['desktop', MEDIA_QUERIES.mdMin]], 'desktop');
    const mobile = typeof mobileProps === 'undefined' ? view === 'mobile' : mobileProps;

    const state = useMemo<ITabsState>(
        () => ({
            mobile,
            collapsible,
            fullWidthScroll,
            scrollable,
        }),
        [collapsible, fullWidthScroll, mobile, scrollable]
    );

    const localPrefix = useId();
    const prefix = typeof propsPrefix === 'undefined' ? localPrefix : propsPrefix;

    const [localSelectedId, setLocalSelectedId] = useState<SelectedIdType>();

    const handleChange = (e: MouseEvent, payload: { selectedId: SelectedIdType }) => {
        if (isControlled) {
            onChange?.(e, payload);
            return;
        }

        setLocalSelectedId(payload.selectedId);
    };

    const selectedId = isControlled ? propsSelectedId : localSelectedId;

    return (
        <TabsThemeProvider idPrefix={prefix} size={size} state={state} theme={theme} variant={variant}>
            <TabsComponent
                TabList={TabList}
                selectedId={selectedId}
                collapsible={collapsible}
                onChange={handleChange}
                breakpoint={breakpoint}
                {...props}
            />
        </TabsThemeProvider>
    );
};

TabsList.displayName = 'Tabs';
TabsList.Tab = Tab;
TabsList.LinkTitle = TabLinkTitle;
