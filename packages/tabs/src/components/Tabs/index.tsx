import { Children, type ReactElement, cloneElement } from 'react';

import { useTabsTheme } from '../../context';
import type { TabProps, TabsProps } from '../../types';
import { ShowMoreButton as DefaultTooltipButton } from '../ShowMore';

const makeSureStringHasPrefix = (str: string, prefix: string) => {
    if (str.startsWith(`${prefix}_`)) return str;

    return `${prefix}_${str}`;
};

/** Checks if requested tab is not blocked, returns this tab if so, otherwise returns first not blocked tab */
const findAllowedTabId = (requestedTabId: string, tabs: Array<ReactElement<TabProps>>) => {
    const tabsList = tabs.map(tab => ({ id: tab.props.id, blocked: tab.props.blocked }));

    const requestedTabBlocked = tabsList.find(tab => tab.id === requestedTabId)?.blocked;
    if (!requestedTabBlocked) return requestedTabId;

    const firstNotBlockedTabId = tabsList.find(tab => !tab.blocked)?.id || undefined;
    return firstNotBlockedTabId;
};

export const TabsComponent = ({
    TabList,
    ShowMoreButton = DefaultTooltipButton,
    className,
    containerCSS,
    defaultMatch,
    children,
    selectedId: propsSelectedId,
    scrollable,
    collapsible,
    collapsedTabsIds,
    keepMounted = false,
    dataTestId,
    breakpoint,
    countErrors,
    onChange,
}: Omit<TabsProps, 'view'>) => {
    const { idPrefix } = useTabsTheme();

    const tabsArray = Children.toArray(children) as Array<ReactElement<TabProps>>;

    const titles = tabsArray.map(
        ({
            props: {
                title,
                id,
                rightAddons,
                leftAddons,
                disabled,
                hidden,
                blocked,
                toggleCSS,
                className,
                renderTitle,
                unfocusable,
            },
        }) => ({
            title,
            id: `${idPrefix}_${id}`,
            disabled,
            rightAddons,
            leftAddons,
            hidden,
            blocked,
            toggleCSS,
            className,
            renderTitle,
            unfocusable,
            countErrors: countErrors?.find(item => item.id === id)?.count || 0,
        })
    );

    const selectedId =
        typeof propsSelectedId === 'undefined'
            ? findAllowedTabId(titles?.[0]?.id, tabsArray)
            : makeSureStringHasPrefix(`${findAllowedTabId(propsSelectedId, tabsArray)}`, idPrefix);

    const tabs = tabsArray
        .map(e => ({ ...e, id: `${idPrefix}_${e.props.id}` }))
        .filter(
            tab =>
                (tab.id === selectedId || tab.props.keepMounted || keepMounted) &&
                !tab.props.renderTitle &&
                !tab.props.blocked
        );

    return (
        <div className={className} role="navigation">
            <TabList
                ShowMoreButton={ShowMoreButton}
                containerCSS={containerCSS}
                titles={titles}
                selectedId={selectedId}
                scrollable={scrollable}
                collapsible={collapsible}
                collapsedTabsIds={collapsedTabsIds}
                onChange={onChange}
                dataTestId={dataTestId}
                defaultMatch={defaultMatch}
                breakpoint={breakpoint}
            />

            {tabs.map(
                tab => !tab.props.blocked && cloneElement(tab, { hidden: tab.id !== selectedId || tab.props.hidden })
            )}
        </div>
    );
};
