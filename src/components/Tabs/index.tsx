import { FC, MouseEvent, ReactNode, useId, useMemo, useState } from 'react';

import { MEDIA_QUERIES } from '@scripts/gds';

import { Tab } from './components/Tab';
import { TabList as DefaultTabList } from './components/TabList';
import { TabsComponent } from './components/Tabs';
import { LinkTitle } from './components/Title/LinkTitle';
import { TabsThemeProvider } from './context';
import { useMedia } from './hooks/useMedia';
import { TABS_THEMES } from './themes';
import { SelectedId, TabsMatchMedia, TabsProps, TabsState } from './types';

export type { TabsProps };

interface TabsCompositionProps {
    Tab: typeof Tab;
    LinkTitle: typeof LinkTitle;
}

type TabsComponentProps = Omit<TabsProps, 'TabList' | 'children'> & {
    TabList?: TabsProps['TabList'];
    children: ReactNode | ReactNode[];
};

const Tabs: FC<TabsComponentProps> & TabsCompositionProps = ({
    TabList = DefaultTabList,
    variant = 'primary',
    size = 'md',
    isMobile: mobileProps,
    collapsible,
    fullWidthScroll,
    scrollable,
    onChange,
    selectedId: propsSelectedId,
    theme: themeName = 'basic',
    breakpoint = 'md',
    prefix: propsPrefix,
    children,
    ...props
}) => {
    const isControlled = typeof propsSelectedId !== 'undefined' && typeof onChange !== 'undefined';
    const theme = typeof themeName === 'string' ? TABS_THEMES[themeName] : themeName;

    const [view] = useMedia<TabsMatchMedia>([['desktop', MEDIA_QUERIES.mdMin]], 'desktop');
    const isMobile = typeof mobileProps === 'undefined' ? view === 'mobile' : mobileProps;

    const state = useMemo<TabsState>(
        () => ({
            isMobile,
            collapsible,
            fullWidthScroll,
            scrollable,
        }),
        [collapsible, fullWidthScroll, isMobile, scrollable]
    );

    const localPrefix = useId();
    const prefix = typeof propsPrefix === 'undefined' ? localPrefix : propsPrefix;

    const [localSelectedId, setLocalSelectedId] = useState<SelectedId>();

    const handleChange = (e: MouseEvent, payload: { selectedId: SelectedId }) => {
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
                scrollable={scrollable}
                collapsible={collapsible}
                onChange={handleChange}
                breakpoint={breakpoint}
                {...props}
            >
                {children as TabsProps['children']}
            </TabsComponent>
        </TabsThemeProvider>
    );
};

Tabs.Tab = Tab;
Tabs.LinkTitle = LinkTitle;
Tabs.displayName = 'Tabs';

export default Tabs;
