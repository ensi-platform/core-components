import { Children, type ReactElement, cloneElement } from 'react';

import { useTabsTheme } from '../../context';
import type { ITabsProps, TabPropsType } from '../../types/component';
import { ShowMoreButton as DefaultTooltipButton } from '../ShowMore';

const makeSureStringHasPrefix = (str: string, prefix: string) => {
    if (str.startsWith(`${prefix}_`)) return str;

    return `${prefix}_${str}`;
};

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
            id: `${idPrefix}_${id}`,
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
            : makeSureStringHasPrefix(`${propsSelectedId}`, idPrefix);

    const tabs = tabsArray
        .map(e => ({ ...e, id: `${idPrefix}_${e.props.id}` }))
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
