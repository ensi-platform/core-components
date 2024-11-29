import { defaultTheme } from '@ensi-platform/core-components-common';

import { type FC, type MouseEvent, useId, useMemo, useState } from 'react';

import { Tab } from './components/Tab';
import { TabHeadingList as DefaultTabList } from './components/TabHeadingList';
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

export type { ITabsProps };

type TabsComponentPropsType = Omit<ITabsProps, 'TabHeadingList'> & {
    TabHeadingList?: ITabsProps['TabHeadingList'];
};

interface ITabsCompositionProps {
    Tab: typeof Tab;
    LinkTitle: typeof TabLinkTitle;
}

export const TabList: FC<TabsComponentPropsType> & ITabsCompositionProps = ({
    breakpoint = Breakpoints.md,
    size = 'md',
    TabHeadingList = DefaultTabList,
    theme: themeName = 'basic',
    variant = 'primary',
    prefix: propsPrefix,
    selectedId: propsSelectedId,
    collapsible,
    fullWidthScroll,
    mobile: mobileProps,
    scrollable,
    onChange,
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
                TabHeadingList={TabHeadingList}
                selectedId={selectedId}
                collapsible={collapsible}
                onChange={handleChange}
                breakpoint={breakpoint}
                {...props}
            />
        </TabsThemeProvider>
    );
};

TabList.displayName = 'Tabs';
TabList.Tab = Tab;
TabList.LinkTitle = TabLinkTitle;
