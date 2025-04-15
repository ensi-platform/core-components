'use client';

import { useCallback, useEffect, useId, useMemo, useState } from 'react';

import { type ITabsProps } from '../../types';

/** useFutureTabs - hook that returns prop getter for ```Tabs``` component
 * @param {string} name - used if multiple tabs are on the same page
 */
export const useTabSearchParam = (tabName = 'tab', defaultTab: string | number = 0) => {
    const query = useMemo(() => new URLSearchParams(window.location.search), []);
    const push = useCallback((newSearch: Record<string, string | number>) => {
        const searchParams = new URLSearchParams(window.location.search);
        Object.keys(newSearch).forEach(key => searchParams.set(key, String(newSearch[key])));

        window.history.pushState(null, '', `?${searchParams.toString()}`);
    }, []);

    const prefix = useId();
    const queryTab = query.get(tabName) as string;
    const tabIndex = queryTab || defaultTab;

    const [selectedId, setSelectedId] = useState(tabIndex);

    /** handle tabIndex change in URL */
    useEffect(() => {
        if (tabIndex) setSelectedId(tabIndex);
    }, [prefix, tabIndex]);

    /** handle going back in browser history */
    useEffect(() => {
        const handlePopState = () => {
            const newQuery = new URLSearchParams(window.location.search);
            const newTabIndex = (newQuery.get(tabName) as string) || defaultTab;
            setSelectedId(newTabIndex);
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [tabName, defaultTab]);

    const getTabsProps = useCallback(
        (): Partial<ITabsProps> => ({
            selectedId,
            onChange: (_: any, payload: any) => {
                const newQuery = JSON.parse(JSON.stringify(query));
                /** used for hiding ?tab=0 in URL */
                if (payload.selectedId === 0) {
                    delete newQuery[tabName];
                } else {
                    // eslint-disable-next-line prefer-destructuring
                    newQuery[tabName] = `${payload.selectedId}`.split('_')[1];
                }
                setSelectedId(payload.selectedId);
                push(newQuery);
            },
        }),
        [selectedId, push, tabName, query]
    );

    return {
        prefix,
        selectedId,
        getTabsProps,
    };
};
