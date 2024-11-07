import { type SelectItem } from '@ensi-platform/core-components-select';

export const DEBOUNCE_TIMEOUT = 300;

export const actions = {
    fetchOptionsStart() {
        return { type: 'FETCH_OPTIONS_START' } as const;
    },
    fetchOptionsBreak() {
        return { type: 'FETCH_OPTIONS_BREAK' } as const;
    },
    fetchOptionsSuccess(payload: { options: SelectItem[]; hasMore: boolean }) {
        return { type: 'FETCH_OPTIONS_SUCCESS', payload } as const;
    },
    setIsOpened(opened: boolean) {
        return { type: 'SET_IS_OPENED', payload: opened } as const;
    },
    setQueryString(qs: string, resetOptions: boolean = true) {
        return { type: 'SET_QUERY_STRING', payload: { qs, resetOptions } } as const;
    },
    reset() {
        return { type: 'RESET' } as const;
    },
};
