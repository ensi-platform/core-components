import {
    Button,
    IconSmallClosed as CloseIcon,
    IconPreloader as PreloaderIcon,
    scale,
    usePrevious,
} from '@ensi-platform/core-components-common';
import { type OptionProps, type SelectItem } from '@ensi-platform/core-components-select';
import { SimpleSelectWithTags } from '@ensi-platform/core-components-select-with-tags';

import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import deepEqual from 'react-fast-compare';

import { BaseAutocomplete } from './components';
import { DEBOUNCE_TIMEOUT } from './scripts/constants';
import { useLazyLoading } from './scripts/hooks';
import { type AutocompleteAsyncPropsType } from './types';

export const AutocompleteAsync = forwardRef<HTMLInputElement, AutocompleteAsyncPropsType>(
    (
        {
            collapseTagList = false,
            multiple = false,
            clearOnSelect = true,
            meta,
            field,
            onOpen,
            onChange,
            onInput,
            asyncOptionsByValuesFn,
            asyncSearchFn,
            onOptionsChange,
            fieldProps = {},
            extractKeyFromValue = val => `${val}`,
            onClear,
            ...props
        },
        ref
    ) => {
        const [valuesMap, setValuesMap] = useState(new Map<any, SelectItem>());

        const selectedValues = useMemo(() => {
            if (Array.isArray(field?.value)) return field?.value.filter(v => v !== '');

            return field?.value !== null && field?.value !== undefined && field?.value !== '' ? [field?.value] : [];
        }, [field?.value]);

        const prevSelectedValues = usePrevious(selectedValues);

        const [isFetchingValues, setFetchingValues] = useState(false);

        const {
            setValue,
            reset,
            isLoading,
            isNotFound,
            optionsProps: { optionsListProps, ...lazyProps },
        } = useLazyLoading({
            onOptionsChange,
            optionsFetcher: async (queryString, offset, limit) => {
                if (!asyncSearchFn) {
                    return {
                        options: [],
                        hasMore: false,
                    };
                }
                try {
                    const res = await asyncSearchFn(queryString, offset, queryString.length > 0 ? limit : -1);
                    return res;
                } catch {
                    return {
                        options: [],
                        hasMore: false,
                    };
                }
            },
            initialOffset: 0,
            limit: 15,
            isValuesLoading: isFetchingValues,
            clearOnClose: multiple,
        });

        const abortFetchingSelectedOptionsRef = useRef<() => void>();
        const selectedOptionsFetchingAbortControllerRef = useRef<AbortController>();

        const fetchOptionsByValuesRef = useRef<typeof asyncOptionsByValuesFn>();
        fetchOptionsByValuesRef.current = asyncOptionsByValuesFn;

        const valuesMapRef = useRef(valuesMap);
        valuesMapRef.current = valuesMap;

        const fetchUnknownValues = useCallback(() => {
            const unknownValues = selectedValues.filter(e => !valuesMapRef.current.has(e));

            if (!unknownValues.length) return;

            setFetchingValues(true);
            new Promise<SelectItem[]>((resolve, reject) => {
                selectedOptionsFetchingAbortControllerRef.current?.abort();
                const abortController = new AbortController();
                selectedOptionsFetchingAbortControllerRef.current = abortController;
                abortFetchingSelectedOptionsRef.current?.();
                abortFetchingSelectedOptionsRef.current = reject;
                fetchOptionsByValuesRef
                    .current?.(unknownValues, abortController)
                    .then(res => {
                        resolve(res);
                    })
                    .catch(() => {});
            })
                .then(res => {
                    abortFetchingSelectedOptionsRef.current = undefined;

                    res.forEach(e => {
                        valuesMapRef.current.set(e.value, e);
                    });

                    setValuesMap(new Map(valuesMapRef.current));

                    setFetchingValues(false);
                })
                .catch(() => {});
        }, [selectedValues]);

        const fetchRef = useRef<() => void>();

        useEffect(() => {
            fetchRef.current = fetchUnknownValues;
        }, [fetchUnknownValues]);

        const fetchTimerRef = useRef<ReturnType<typeof setTimeout>>();

        useEffect(() => {
            abortFetchingSelectedOptionsRef.current?.();

            /* Дебаунсим изменения, чтобы не отправлять запрос на каждый чих */
            if (fetchTimerRef.current) {
                clearTimeout(fetchTimerRef.current);
            }

            fetchTimerRef.current = setTimeout(() => {
                /*
                 * После дебаунса необходимо вызвать функцию-загрузчик
                 */
                fetchRef.current?.();
            }, DEBOUNCE_TIMEOUT);

            fetchUnknownValues();
        }, [fetchUnknownValues]);

        const selectedOptions = useMemo(() => {
            const valuesWithKnownKey = selectedValues.filter(e => valuesMap.has(e));
            const valuesWithUnKnownKey = selectedValues.filter(e => !valuesMap.has(e));
            const knownTags = valuesWithKnownKey.map<SelectItem>(e => ({
                label: valuesMap.get(e)!.label,
                disabled: valuesMap.get(e)!.disabled,
                value: e,
            }));

            const loadingTags = valuesWithUnKnownKey.map<SelectItem>(e => ({
                label: extractKeyFromValue(e),
                isPreloader: true,
                value: e,
            }));

            return [...knownTags, ...loadingTags];
        }, [selectedValues, valuesMap, extractKeyFromValue]);

        const [isSingleValueSet, setSingleValueSet] = useState(false);

        const prevFieldValue = usePrevious(field?.value);
        useEffect(() => {
            if (
                field?.value !== undefined &&
                !deepEqual(prevFieldValue, field?.value) &&
                selectedOptions[0]?.label !== optionsListProps.inputProps.value
            ) {
                setSingleValueSet(false);
            }
        }, [field?.value, optionsListProps.inputProps.value, prevFieldValue, props.name, selectedOptions]);

        useEffect(() => {
            if (isSingleValueSet) return;
            if (multiple) return;
            if (!selectedValues.length) return;

            if (selectedOptions.length && !selectedOptions[0].isPreloader) {
                setValue(selectedOptions[0].label, false);
                setSingleValueSet(true);
            }
        }, [isSingleValueSet, multiple, selectedOptions, selectedValues.length, setValue]);

        useEffect(() => {
            if (!selectedValues.length && prevSelectedValues?.length) {
                setValue('');
            }
        }, [selectedValues.length, prevSelectedValues?.length, setValue]);

        const wasSettingValueRef = useRef(false);

        if (!multiple) {
            return (
                <BaseAutocomplete
                    ref={ref}
                    {...props}
                    onInput={e => {
                        optionsListProps.inputProps.onChange(e, { value: e.currentTarget.value });
                        onInput?.(e);

                        if (!e.currentTarget.value) {
                            reset();

                            field?.onChange({
                                target: {
                                    value: null,
                                },
                            });
                        }
                    }}
                    selected={selectedOptions}
                    onChange={(event, payload) => {
                        wasSettingValueRef.current = true;

                        if (payload.selected !== null) {
                            onChange?.(payload);
                            setValue(payload.selected[0].label, false);

                            payload.selected.forEach(e => {
                                if (typeof e === 'string') return;
                                valuesMapRef.current.set(e.value, e);
                            });

                            setValuesMap(new Map(valuesMapRef.current));

                            const newValue = payload.selected.map(e => (typeof e === 'string' ? e : e.value))[0];

                            field?.onChange({
                                target: {
                                    value: newValue,
                                },
                            });
                        }
                    }}
                    error={meta?.error}
                    fieldProps={{
                        ...fieldProps,
                        inputProps: {
                            ...fieldProps.inputProps,
                            ...(!isLoading && {
                                placeholder: props.placeholder,
                            }),
                        },
                        rightAddons: (
                            <>
                                {!!selectedValues.length && !isLoading && !props.hideClearButton && !props.disabled && (
                                    <button
                                        type="button"
                                        onClick={e => {
                                            e.stopPropagation();

                                            field?.onChange({
                                                target: {
                                                    value: null,
                                                },
                                            });
                                            reset();

                                            wasSettingValueRef.current = true;

                                            onClear?.();
                                        }}
                                        css={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            ':hover': {
                                                opacity: 0.5,
                                            },
                                        }}
                                    >
                                        <CloseIcon />
                                    </button>
                                )}
                                {isLoading ? <PreloaderIcon css={{ width: scale(2) }} /> : null}
                            </>
                        ),
                    }}
                    optionsListProps={{
                        ...optionsListProps,
                        emptyPlaceholder: (
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                {isNotFound ? (
                                    <div
                                        css={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            gap: scale(1),
                                        }}
                                    >
                                        <p>Ничего не найдено</p>
                                        <Button
                                            onClick={() => {
                                                reset();
                                            }}
                                            theme="outline"
                                        >
                                            Сбросить
                                        </Button>
                                    </div>
                                ) : null}
                                {isLoading ? 'Поиск...' : null}
                                {!isLoading && !isNotFound ? 'Начинайте вводить' : null}
                            </div>
                        ),
                    }}
                    {...lazyProps}
                    showEmptyOptionsList
                    multiple={false}
                    onOpen={payload => {
                        onOpen?.(payload);
                        lazyProps.onOpen(payload);

                        if (!payload.open && selectedOptions.length) {
                            if (wasSettingValueRef.current) {
                                wasSettingValueRef.current = false;
                            } else {
                                setValue(selectedOptions[0].label);
                            }
                        }
                    }}
                    Option={(optionProps: OptionProps) =>
                        lazyProps.Option({
                            ...optionProps,
                            selected: selectedValues.includes(optionProps.option.value),
                        })
                    }
                    {...props}
                    value={optionsListProps.inputProps.value}
                />
            );
        }

        return (
            <SimpleSelectWithTags
                ref={ref}
                onInput={e => {
                    optionsListProps.inputProps.onChange(e, { value: e.target.value });
                    onInput?.(e);
                }}
                selected={selectedOptions}
                onChange={(_, payload) => {
                    onChange?.(payload);

                    payload.selected?.forEach(e => {
                        if (typeof e === 'string') return;
                        valuesMapRef.current.set(e.value, e);
                    });

                    setValuesMap(new Map(valuesMapRef.current));

                    if (clearOnSelect) reset();

                    if (!field) return;

                    if (payload.selected === null && multiple) {
                        field.onChange({
                            target: {
                                value: [],
                            },
                        });
                    } else {
                        field.onChange({
                            target: {
                                value: payload.selected?.map(e => (typeof e === 'string' ? e : e.value)),
                            },
                        });
                    }
                }}
                collapseTagList={collapseTagList}
                resetOnChange={false}
                resetOnClose={false}
                error={meta?.error}
                fieldProps={{
                    ...fieldProps,
                    ...(isLoading && {
                        rightAddons: <PreloaderIcon css={{ width: scale(2) }} />,
                    }),
                }}
                optionsListProps={{
                    ...optionsListProps,
                    emptyPlaceholder: (
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            {isNotFound ? (
                                <div>
                                    <p>Ничего не найдено</p>
                                    <Button
                                        onClick={() => {
                                            reset();
                                        }}
                                    >
                                        Сбросить
                                    </Button>
                                </div>
                            ) : null}
                            {isLoading ? 'Поиск...' : null}
                            {!isLoading && !isNotFound ? 'Начинайте вводить' : null}
                        </div>
                    ),
                }}
                isLoading={isFetchingValues}
                {...lazyProps}
                {...props}
                value={optionsListProps.inputProps.value}
            />
        );
    }
);

AutocompleteAsync.displayName = 'AutocompleteAsync';
