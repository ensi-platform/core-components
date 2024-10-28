import { ChangeEvent, Reducer, useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import deepEqual from 'react-fast-compare';
import { type OptionProps, type SelectItem, Option as DefaultOption } from '@greensight/core-components-select';
import { scale } from '@greensight/core-components-common';
import { InputProps } from '@greensight/core-components-input';

import { LoadingSkeleton } from '@greensight/core-components-loading-skeleton';
import { Actions, IOptionsFetcherResponse, IUseLazyLoadingProps } from '../types';
import { actions, DEBOUNCE_TIMEOUT } from './constants';

export function useLazyLoading({
    limit = 10,
    initialOffset = 0,
    optionsFetcher,
    onOptionsChange,
    skeleton = <LoadingSkeleton css={{}} height={scale(3)} />,
    Option = DefaultOption,
    isValuesLoading = false,
    clearOnClose = true,
}: IUseLazyLoadingProps) {
    const lazyLoadingInitialState = useMemo(
        () => ({
            opened: false,
            offset: initialOffset,
            options: [] as SelectItem[],
            loading: false,
            allOptionsLoaded: false,
            queryString: '',
        }),
        [initialOffset]
    );

    const lazyLoadingReducer: Reducer<typeof lazyLoadingInitialState, Actions> = (state, action) => {
        switch (action.type) {
            case 'FETCH_OPTIONS_START': {
                return {
                    ...state,
                    loading: true,
                };
            }
            case 'FETCH_OPTIONS_BREAK': {
                return {
                    ...state,
                    loading: false,
                };
            }
            case 'FETCH_OPTIONS_SUCCESS': {
                const optionsMap = new Map<any, SelectItem>();

                if (!action.payload.options.length) {
                    state.options.forEach(option => {
                        optionsMap.set(option.value, option);
                    });
                }

                action.payload.options.forEach(option => {
                    optionsMap.set(option.value, option);
                });

                const options = [...optionsMap.values()].filter((option, index, arr) => {
                    const i = arr.findIndex(item => item.label === option.label);
                    if (i === index) return true;
                    return !deepEqual(option, arr[i]);
                });

                setTimeout(() => {
                    onOptionsChange?.(options);
                }, 0);

                return {
                    ...state,
                    options,
                    offset: state.offset + (options.length ? limit : 0),
                    allOptionsLoaded: !action.payload.hasMore,
                    loading: false,
                };
            }
            case 'SET_IS_OPENED': {
                return {
                    ...state,
                    opened: action.payload,
                };
            }
            case 'SET_QUERY_STRING': {
                return {
                    ...lazyLoadingInitialState,
                    opened: state.opened,
                    loading: true,
                    queryString: action.payload.qs,
                    ...(!action.payload.resetOptions && {
                        options: state.options,
                    }),
                };
            }
            case 'RESET': {
                return {
                    ...lazyLoadingInitialState,
                };
            }
            default: {
                return state;
            }
        }
    };

    const [{ opened, offset, options, loading, allOptionsLoaded, queryString }, dispatch] = useReducer(
        lazyLoadingReducer,
        lazyLoadingInitialState
    );

    const abortFetchingOptionsRef = useRef<() => void>();

    const fetchNextOffsetOptions = useCallback(() => {
        dispatch(actions.fetchOptionsStart());

        new Promise<IOptionsFetcherResponse>((resolve, reject) => {
            abortFetchingOptionsRef.current?.();
            abortFetchingOptionsRef.current = reject;
            optionsFetcher(queryString, offset, limit).then(res => {
                resolve(res);
            });
        })
            .then(res => {
                dispatch(actions.fetchOptionsSuccess(res));
                abortFetchingOptionsRef.current = undefined;
            })
            .catch(() => {});
    }, [optionsFetcher, offset, limit, queryString]);

    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let observer: IntersectionObserver;

        if (opened && !loading && !allOptionsLoaded) {
            observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        if (observer) {
                            observer.disconnect();
                        }
                        fetchNextOffsetOptions();
                    }
                },
                {
                    root: listRef.current,
                }
            );

            /*
             * Обсервим пересечение последней опции с контейнером.
             * Таким образом, загрузка следующей "страницы" начнется когда юзер доскроллит список
             * до верхнего края последней опции, что обеспечивает плавность
             */
            const options = listRef.current?.querySelectorAll('[role="option"]');
            const lastOption = options?.[options.length - 1];

            if (lastOption) {
                observer.observe(lastOption);
            }
        }

        return () => {
            if (observer) {
                observer.disconnect();
            }
        };
    }, [offset, fetchNextOffsetOptions, opened, allOptionsLoaded, initialOffset, loading]);

    const onOpen = useCallback(
        (payload: { open?: boolean }) => {
            if (payload.open) {
                fetchNextOffsetOptions();
            } else {
                abortFetchingOptionsRef.current?.();

                if (clearOnClose) {
                    dispatch(actions.setQueryString('', false));
                }
                dispatch(actions.fetchOptionsBreak());
            }

            dispatch(actions.setIsOpened(payload.open ?? false));
        },
        [fetchNextOffsetOptions, clearOnClose]
    );

    const fetchNextOptionsRef = useRef<() => void>();
    const fetchNextOptionsTimerRef = useRef<ReturnType<typeof setTimeout>>();

    useEffect(() => {
        fetchNextOptionsRef.current = fetchNextOffsetOptions;
    }, [fetchNextOffsetOptions]);

    const onQueryStringChange = useCallback<Exclude<InputProps['onChange'], undefined>>((_, payload) => {
        dispatch(actions.setQueryString(payload.value));
        /* eslint-disable no-unused-expressions */

        /*
         * Если во время загрузки опций юзер ввел новый текст в инпут,
         * нужно прервать текущую загрузку, чтобы неактуальные опции не попали в выдачу
         */
        abortFetchingOptionsRef.current?.();

        listRef.current?.scrollTo({ top: 0 });

        /* Дебаунсим ввод текста, чтобы не отправлять запрос к новым опциям на каждый чих */
        if (fetchNextOptionsTimerRef.current) {
            clearTimeout(fetchNextOptionsTimerRef.current);
        }
        fetchNextOptionsTimerRef.current = setTimeout(() => {
            /*
             * После дебаунса необходимо вызвать функцию-загрузчик,
             * содержащую актуальные на данный момент данные оффсета и queryString.
             * Поэтому мы не можем обратиться напрямую к функции fetchNextOptions,
             * так как она будет замкнута на старые значения, актуальные на момент вызова хэндлера,
             * так что берем ее из обновляемого рефа
             */
            fetchNextOptionsRef.current?.();
        }, DEBOUNCE_TIMEOUT);
    }, []);

    const renderOption = (props: OptionProps) => (
        <Option {...props} highlighted={loading ? false : props.highlighted} />
    );

    const skeletonOptions: SelectItem[] = useMemo(
        () =>
            Array(loading ? limit : 0)
                .fill(0)
                .map((_, key) => ({
                    label: `loading-${key}`,
                    disabled: true,
                    content: skeleton,
                    isPreloader: true,
                })),
        [loading, limit, skeleton]
    );

    const reset = useCallback(() => {
        dispatch(actions.reset());
    }, []);

    return {
        isLoading: loading || isValuesLoading,
        isNotFound: !loading && !!queryString.length,
        optionsProps: {
            Option: renderOption,
            options: [...options, ...skeletonOptions],
            optionsListProps: {
                ref: listRef,
                inputProps: {
                    onChange: onQueryStringChange,
                    value: queryString,
                },
            },
            onOpen,
        },
        setValue: (value: string, revalidate = true) => {
            if (typeof value !== 'string')
                throw new Error(`Call of setValue with value ${JSON.stringify(value)}, expected type "string"`);

            if (revalidate) {
                const fakeEvent = {
                    target: {
                        value,
                    },
                } as ChangeEvent<HTMLInputElement>;
                onQueryStringChange(fakeEvent, { value });
                return;
            }

            dispatch(actions.setQueryString(value, false));

            if (!revalidate) {
                dispatch(actions.fetchOptionsBreak());
            }
        },
        reset,
    };
}
