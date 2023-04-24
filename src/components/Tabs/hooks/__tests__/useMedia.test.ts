import { act, renderHook } from '@testing-library/react-hooks';

import { useMedia } from '../useMedia';

describe('useMedia', () => {
    afterAll(() => {
        delete (window as any).matchMedia;
    });

    it('should set default value if window.matchMedia is not supported', () => {
        const { result } = renderHook(() =>
            useMedia<number>(
                [
                    [1, '(max-width: 700px)'],
                    [2, '(min-width: 701px) and (max-width: 900px)'],
                    [3, '(min-width: 901px)'],
                ],
                2
            )
        );

        expect(result.current).toEqual([2]);
    });

    it('should update the value when the media query changes', () => {
        const QUERIES = [
            [1, '(max-width: 700px)'],
            [2, '(min-width: 701px) and (max-width: 900px)'],
            [3, '(min-width: 901px)'],
        ];

        const onChangeHandlers: (() => void)[] = [];

        const matchFunctions = {
            addEventListener: jest.fn().mockImplementation((name, callback) => {
                if (name === 'change' && !onChangeHandlers.includes(callback)) onChangeHandlers.push(callback);
            }),
            removeEventListener: jest.fn().mockImplementation((name, callback) => {
                if (name === 'change' && onChangeHandlers.includes(callback))
                    onChangeHandlers.splice(onChangeHandlers.indexOf(callback, 1));
            }),
        };

        const mediaQueryResults: Record<
            string,
            {
                matches: boolean;
                addEventListener: any;
                removeEventListener: any;
            }
        > = {};

        const matchMediaMock = jest.fn().mockImplementation(query => {
            if (!(query in mediaQueryResults)) {
                mediaQueryResults[query] = {
                    matches: query === QUERIES[0][1],
                    ...matchFunctions,
                };
            }
            return mediaQueryResults[query];
        });
        window.matchMedia = matchMediaMock;

        const { result } = renderHook(() => useMedia<number>(QUERIES as any, 2));

        expect(result.current).toEqual([1]);
        expect(matchMediaMock).toBeCalledTimes(QUERIES.length);

        act(() => {
            Object.keys(mediaQueryResults).forEach((key, index) => {
                mediaQueryResults[key].matches = index === 2;
            });

            onChangeHandlers.forEach(callback => callback());
        });

        expect(result.current).toEqual([3]);
    });
});
