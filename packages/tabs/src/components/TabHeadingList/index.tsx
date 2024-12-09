import { useEffect, useMemo, useRef } from 'react';

import { useTabsTheme } from '../../context';
import { createSyntheticMouseEvent, useMedia, useTablistTitles } from '../../scripts';
import type { IShowMoreButtonOption, ITabHeadingListProps, TabsMatchMediaType } from '../../types';
import { KeyboardFocusable } from '../KeyboardFocusable';
import { ScrollableContainer } from '../ScrollableContainer';
import { ShowMoreButton as DefaultTooltipButton } from '../ShowMore';
import { Title } from '../Title';

/**
 * Parent component for list of ```Tab``` components
 * @param breakpoint width breakpoint for desktop version
 * @param className additional class for tab headings list
 * @param containerCSS additional CSS for list container
 * @param ShowMoreButton custom component for 'Show more' button
 * @param titles list of tabs heading
 * @param selectedId current selected tab id
 * @param collapsedTabsIds list of collapsed tabs ids
 * @param scrollable use scrollable container for tab headings
 * @param collpsible collapse extra tab headings into dropdown list
 * @param onChange handler for tab change event
 * @param dataTestId id for automatic testing
 */
export const TabHeadingList = ({
    breakpoint = 1024,
    className,
    containerCSS,
    ShowMoreButton: TooltipButton = DefaultTooltipButton,
    titles = [],
    collapsedTabsIds,
    selectedId = titles.length ? titles[0].id : undefined,
    scrollable: propsScrollable = true,
    collapsible: propsCollapsible,
    onChange,
    dataTestId,
}: ITabHeadingListProps) => {
    const lineRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const [view] = useMedia<TabsMatchMediaType>([['desktop', `(min-width: ${breakpoint}px)`]], 'desktop');

    const scrollable = view === 'desktop' ? propsScrollable : true;
    const collapsible = view === 'desktop' ? propsCollapsible : false;

    const { containerRef, addonRef, tablistTitles, selectedTab, focusedTab, getTabListItemProps } = useTablistTitles({
        titles,
        selectedId,
        collapsible,
        collapsedTabsIds,
        breakpoint,
        onChange,
    });

    useEffect(() => {
        if (selectedTab && lineRef.current) {
            lineRef.current.style.width = `${selectedTab.offsetWidth}px`;
            lineRef.current.style.transform = `translateX(${selectedTab.offsetLeft}px)`;
        }
    }, [selectedTab, tablistTitles]);

    const collapsedOptions = useMemo(
        () =>
            tablistTitles.reduce<IShowMoreButtonOption[]>((options, title) => {
                if (title.collapsed) {
                    options.push({
                        label: title.title,
                        value: title.id,
                        content: <Title {...title} isOption />,
                    });
                }

                return options;
            }, []),
        [tablistTitles]
    );

    const handleOptionsChange = (_: any, { selected }: { selected: any }) => {
        if (selected?.value && onChange) {
            const nativeMouseEvent = new MouseEvent('change');
            const syntheticMouseEvent = createSyntheticMouseEvent(nativeMouseEvent);

            onChange(syntheticMouseEvent, { selectedId: selected?.value });
        }
    };

    const { getCSS } = useTabsTheme();

    const collapsedCount = tablistTitles.filter(title => title.collapsed).length;

    const renderContent = () => (
        <div role="tablist" data-test-id={dataTestId} className={className} css={getCSS('tabList')} ref={wrapperRef}>
            {tablistTitles.map((title, index) => (
                <KeyboardFocusable key={title.id}>
                    {(ref, focused) =>
                        title.renderTitle ? (
                            title.renderTitle({
                                ...getTabListItemProps(index, ref),
                                ...title,
                                focused,
                            })
                        ) : (
                            <Title {...getTabListItemProps(index, ref)} {...title} focused={focused} />
                        )
                    }
                </KeyboardFocusable>
            ))}

            {collapsedOptions.length ? (
                <div ref={addonRef} role="tablist">
                    <TooltipButton
                        options={collapsedOptions}
                        onChange={handleOptionsChange}
                        count={collapsedCount}
                        data-collapse="true"
                    />
                </div>
            ) : null}

            <div css={getCSS('line')} ref={lineRef} />
        </div>
    );

    return scrollable && !collapsible ? (
        <ScrollableContainer activeChild={focusedTab || selectedTab} containerCSS={containerCSS}>
            {renderContent()}
        </ScrollableContainer>
    ) : (
        <div
            ref={containerRef}
            css={{
                overflow: 'hidden',
                ...containerCSS,
            }}
        >
            {renderContent()}
        </div>
    );
};
