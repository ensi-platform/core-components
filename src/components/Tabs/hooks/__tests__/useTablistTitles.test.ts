import { renderHook } from '@testing-library/react-hooks';

import { BreakpointParam } from '@scripts/gds';

import { useTablistTitles } from '../useTablistTitles';

describe('useTablistTitles', () => {
    it('should return the correct tablist titles', () => {
        const titles = [
            { id: '1', title: 'Title 1', content: 'Content 1' },
            { id: '2', title: 'Title 2', content: 'Content 2' },
            { id: '3', title: 'Title 3', content: 'Content 3' },
        ];
        const selectedId = 1;
        const collapsible = true;
        const collapsedTabsIds = ['2'];
        const breakpoint: BreakpointParam = 'md';
        const onChange = () => {};

        const { result } = renderHook(() =>
            useTablistTitles({ titles, selectedId, collapsible, collapsedTabsIds, breakpoint, onChange })
        );

        expect(result.current.tablistTitles).toEqual([
            {
                id: '1',
                title: 'Title 1',
                content: 'Content 1',
                collapsed: false,
                selected: false,
            },
            {
                id: '3',
                title: 'Title 3',
                content: 'Content 3',
                collapsed: false,
                selected: false,
            },
            {
                id: '2',
                title: 'Title 2',
                content: 'Content 2',
                collapsed: true,
                selected: false,
            },
        ]);
    });
});
