import { useMemo } from 'react';

import type { ITabListProps, TabsMatchMediaType } from '../../types';
import { useCollapsibleElements } from './useCollapsibleElements';
import { useMedia } from './useMedia';
import { useTabs } from './useTabs';

/**
 * Custom hook to manage tablist titles with collapsible functionality.
 *
 * @param titles - The list of tab titles.
 * @param selectedId - The ID of the currently selected tab.
 * @param collapsible - Flag that indicates if the tabs are collapsible.
 * @param collapsedTabsIds - The list of IDs of collapsed tabs.
 * @param breakpoint - The breakpoint for media queries.
 * @param onChange - The callback function for when the selected tab changes.
 * @returns ```containerRef``` - The reference for the container element.
 * @returns ```addonRef``` - The reference for the addon element.
 * @returns ```tablistTitles``` - The list of tab titles with collapsible status.
 * @returns ```selectedTab``` - The currently selected tab.
 * @returns ```focusedTab``` - The currently focused tab.
 * @returns ```getTabListItemProps``` - Function to get properties for tab list items.
 */

export const useTablistTitles = ({
    titles = [],
    selectedId,
    collapsible,
    collapsedTabsIds,
    breakpoint,
    onChange,
}: Pick<ITabListProps, 'titles' | 'selectedId' | 'collapsible' | 'collapsedTabsIds' | 'onChange'> &
    Required<Pick<ITabListProps, 'breakpoint'>>) => {
    const { containerRef, addonRef, idsCollapsedElements } = useCollapsibleElements<HTMLDivElement, HTMLInputElement>(
        '[role=tab]',
        [titles]
    );

    const [view] = useMedia<TabsMatchMediaType>([['desktop', `(min-width: ${breakpoint}px)`]], 'desktop');

    const tablistTitles = useMemo(() => {
        const idsCollapsedTitles: string[] = [];
        const idsCollapsed = idsCollapsedElements.concat(collapsedTabsIds || []);

        if (view === 'desktop' && collapsible) {
            const visibleTitles = titles.filter(({ id }) => !idsCollapsed.includes(String(id)));
            const lastVisibleTitle = collapsedTabsIds ? null : visibleTitles[visibleTitles.length - 1];

            idsCollapsed.forEach(id => {
                if (selectedId === id && lastVisibleTitle) {
                    idsCollapsedTitles.push(String(lastVisibleTitle.id));
                }
                if (selectedId !== id) {
                    idsCollapsedTitles.push(id);
                }
            });
        }

        const titlesMapped = titles.map(title => ({
            ...title,
            collapsed: idsCollapsedTitles.includes(String(title.id)),
            selected: title.id === selectedId,
        }));

        if (collapsedTabsIds?.length) {
            titlesMapped.sort((a, b) => {
                const hasA = collapsedTabsIds.includes(String(a.id));
                const hasB = collapsedTabsIds.includes(String(b.id));

                if (hasA === hasB) {
                    return 0;
                }

                return hasA ? 1 : -1;
            });
        }

        return titlesMapped.sort((a, b) => {
            if (a.collapsed === b.collapsed) {
                return 0;
            }

            return a.collapsed ? 1 : -1;
        });
    }, [collapsedTabsIds, idsCollapsedElements, view, collapsible, titles, selectedId]);

    const { selectedTab, focusedTab, getTabListItemProps } = useTabs({
        titles: tablistTitles,
        selectedId,
        onChange,
    });

    return {
        containerRef,
        addonRef,
        tablistTitles,
        selectedTab,
        focusedTab,
        getTabListItemProps,
    };
};
