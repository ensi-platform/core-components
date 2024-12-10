import { Children, type ReactElement, cloneElement } from 'react';

import { useTabsTheme } from '../../context';
import type { ITabsProps, TabPropsType } from '../../types/component';
import { ShowMoreButton as DefaultTooltipButton } from '../ShowMore';

/**
 * Add string prefix to id if its exists
 */
const makeSureStringHasPrefix = (str: string, prefix: string) => {
    if (!prefix) return str;
    if (`${str}`.startsWith(`${prefix}_`)) return str;

    return `${prefix}_${str}`;
};

/**
 * Prepends prefix if its a valid string
 */
const addPrefix = (str: string, prefix: string) => {
    if (!prefix) return str;
    return `${prefix}_${str}`;
};

/**
 * Root component that renders tabs heading and tabs content
 * @param TabHeadingList component for rendering tabs headings
 * @param ShowMoreButton component for 'Show more' button
 * @param breakpoint width breakpoint for desktop appearance
 * @param className additional class for tabs component
 * @param containerCSS additional CSS for tabs headings list container
 * @param defaultMatch default component appearance
 * @param children list of tabs
 * @param selectedId id of current selected tab
 * @param countErrors array of errors by each tab
 * @param scrollable use scrollable container for headings
 * @param collapsible collapse extra tab headings
 * @param collapsedTabsIds ids of tabs to collapse into dropdown menu
 * @param keepMounted render tabs even if they are not visible
 * @param dataTestId id for automatic testing
 * @param onChange tab change event handler
 */
export const TabsComponent = ({
    TabHeadingList,
    ShowMoreButton = DefaultTooltipButton,
    breakpoint,
    className,
    containerCSS,
    defaultMatch,
    children,
    selectedId: propsSelectedId,
    countErrors,
    scrollable,
    collapsible,
    collapsedTabsIds,
    keepMounted = false,
    dataTestId,
    onChange,
}: Omit<ITabsProps, 'view'>) => {
    const { idPrefix } = useTabsTheme();

    const tabsArray = Children.toArray(children) as Array<ReactElement<TabPropsType>>;

    const titles = tabsArray.map(
        ({
            props: {
                title,
                id,
                rightAddons,
                leftAddons,
                disabled,
                hidden,
                toggleCSS,
                className,
                renderTitle,
                unfocusable,
            },
        }) => ({
            title,
            id: addPrefix(id, idPrefix),
            disabled,
            rightAddons,
            leftAddons,
            hidden,
            toggleCSS,
            className,
            renderTitle,
            unfocusable,
            countErrors: countErrors?.find(item => item.id === id)?.count || 0,
        })
    );

    const selectedId =
        typeof propsSelectedId === 'undefined'
            ? titles?.[0]?.id || undefined
            : makeSureStringHasPrefix(propsSelectedId, idPrefix);

    const tabs = tabsArray
        .map(e => ({ ...e, id: addPrefix(e.props.id, idPrefix) }))
        .filter(tab => (tab.id === selectedId || tab.props.keepMounted || keepMounted) && !tab.props.renderTitle);

    return (
        <div className={className} role="navigation">
            <TabHeadingList
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

            {tabs.map(tab => cloneElement(tab, { hidden: tab.id !== selectedId }))}
        </div>
    );
};
