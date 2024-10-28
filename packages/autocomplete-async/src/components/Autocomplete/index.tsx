import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
    BaseSelect,
    Option as DefaultOption,
    OptionsList as DefaultOptionsList,
    Optgroup as DefaultOptgroup,
    Arrow as DefaultArrow,
    SelectItem,
    SelectPayload,
} from '@greensight/core-components-select';

import { TagList } from '@greensight/core-components-select-with-tags';

import { InputProps } from '@greensight/core-components-input';
import mergeRefs from 'react-merge-refs';
import { defaultTheme, FormFieldHelperProps } from '@greensight/core-components-common';
import { IAutocompleteProps } from './types';
import { AutocompleteField } from '../Field';
import { Clear } from '../Clear';

const { colors } = defaultTheme;

export const BaseAutocomplete = forwardRef<HTMLInputElement, IAutocompleteProps>(
    (
        {
            Arrow = DefaultArrow,
            OptionsList = DefaultOptionsList,
            Optgroup = DefaultOptgroup,
            Option = DefaultOption,
            Input,
            inputProps = {},
            onInput,
            value,
            readOnly,
            multiple,
            closeOnSelect = !multiple,
            options = [],
            fieldProps,
            ...restProps
        },
        ref
    ) => {
        const props = useMemo(
            () => ({
                ref,
                autocomplete: true,
                options,
                closeOnSelect,
                Option,
                Arrow,
                multiple,
                Field: multiple ? TagList : AutocompleteField,
                fieldProps: {
                    Input,
                    onInput,
                    value,
                    inputProps,
                    readOnly,
                    ...fieldProps,
                },
                Optgroup,
                OptionsList,
                ...restProps,
            }),
            [
                multiple,
                Arrow,
                Input,
                Optgroup,
                Option,
                OptionsList,
                closeOnSelect,
                fieldProps,
                inputProps,
                onInput,
                options,
                readOnly,
                ref,
                restProps,
                value,
            ]
        );

        return <BaseSelect emitChangeOnClick {...props} />;
    }
);

BaseAutocomplete.displayName = 'BaseAutocomplete';

/**
 * Фичи:
 * 1) если кликнуть на опцию, она выберется. при этом текстовый инпут примет значение опции
 * 2) если извне изменится значение, то текстовый инпут примет значение label соответствующего value
 * 3) если пользователь закроет выпадающий список, при этом не выбрав значение, то инпут примет последнее label
 */

export const useAutocomplete = (
    initialSelectedValues: any[],
    multiple: boolean,
    options: IAutocompleteProps['options'],
    reinitialize = true,
    showSelected = true
) => {
    const [selectedValues, setSelectedValues] = useState(initialSelectedValues);
    const selectedOptions = useMemo(
        () =>
            options.filter(e => {
                if ('value' in e) return selectedValues.includes(e.value);
                return false;
            }) as SelectItem[],
        [options, selectedValues]
    );

    const currentSelectedOptions = useRef(selectedOptions);
    currentSelectedOptions.current = selectedOptions;

    const [search, setSearch] = useState('');

    const getKeyByValue = useCallback(
        (value: any) => {
            const result = options.find(e => {
                if ('value' in e) return e.value === value;
                return false;
            });

            if (!result || !('label' in result)) return null;

            return result.label;
        },
        [options]
    );

    // если извне изменится значение, то текстовый инпут примет значение label соответствующего value
    useEffect(() => {
        if (!reinitialize) return;

        if (!multiple && initialSelectedValues.length > 0) {
            const label = getKeyByValue(initialSelectedValues[0]);

            if (label !== null) {
                setSearch(label);
            }
        }

        setSelectedValues(initialSelectedValues);
    }, [initialSelectedValues, multiple, getKeyByValue, reinitialize]);

    const matchOption = useCallback((option: SelectItem, inputValue: string) => {
        if (!inputValue) return true;

        if ('label' in option) {
            return option.label?.toLowerCase().includes(inputValue.toLowerCase());
        }

        return false;
    }, []);

    const [isDirtySearch, setDirtySearch] = useState(false);

    const handleInput = useCallback<Exclude<InputProps['onChange'], undefined>>((_, payload) => {
        setSearch(payload.value);
        setDirtySearch(!!payload.value.length);
    }, []);

    const handleChange = (payload: SelectPayload) => {
        setTimeout(() => {
            if (multiple) {
                setSearch('');
            } else {
                setSearch(payload.actionItem ? payload.actionItem.label : '');
            }
        }, 0);

        if (payload.actionItem) {
            if (multiple) {
                const vals = new Set(selectedValues);
                vals.add(payload.actionItem.value);
                setSelectedValues([...vals.values()]);
            } else {
                setSelectedValues([payload.actionItem.value]);
            }
        }
    };

    const filteredOptions = useMemo(
        () =>
            !isDirtySearch
                ? options
                : options.filter(option => {
                      if (!('value' in option)) return false;
                      const isSelected = selectedValues.includes(option.value);
                      const isMatched = matchOption(option, search);

                      return (!isSelected || showSelected) && isMatched;
                  }),
        [isDirtySearch, options, selectedValues, matchOption, search, showSelected]
    );

    const onClose = useCallback(() => {
        setDirtySearch(false);

        setTimeout(() => {
            if (!multiple) {
                setSearch(currentSelectedOptions.current?.[0]?.label || '');
            } else {
                setSearch('');
            }
        }, 0);
    }, [multiple]);

    return {
        value: search,
        setValue: setSearch,
        filteredOptions,
        handleInput,
        selectedValues,
        handleChange,
        matchOption,
        setSelectedValues,
        selectedOptions,
        onClose,
    };
};

export const Autocomplete = forwardRef<HTMLInputElement, IAutocompleteProps & Partial<FormFieldHelperProps<any>> & {}>(
    (
        {
            multiple = false,
            meta,
            field,
            onOpen,
            onChange,
            onInput,
            onBlur,
            options,
            fieldProps,
            withTags = multiple,
            placeholderSelected,
            collapseTagList = false,
            moveInputToNewLine = true,
            transformCollapsedTagText,
            transformTagText,
            ...props
        },
        ref
    ) => {
        const initialSelectedValues = useMemo(() => {
            if (multiple) return Array.isArray(field?.value) ? field?.value || [] : [];

            return field?.value === null ? [] : [field?.value];
        }, [field?.value, multiple]);

        const {
            value,
            setValue,
            setSelectedValues,
            handleInput,
            onClose,
            handleChange,
            selectedOptions,
            filteredOptions,
        } = useAutocomplete(initialSelectedValues, multiple, options);

        const inputRef = useRef<HTMLInputElement | null>(null);

        const selectedCount = selectedOptions.length;
        const hasValue = !!value;

        const showSelectedPlaceholder = !!placeholderSelected && !hasValue && selectedCount > 0;

        const isOpenRef = useRef(false);

        const hasSelected = selectedCount > 0;
        let canClear;

        if (!multiple) {
            canClear = hasValue;
        } else {
            canClear = hasValue || hasSelected;
        }

        if (props.hideClearButton) {
            canClear = false;
        }

        const isEverythingSelected = options && selectedCount >= options.length;

        const [isPopoverOpen, setPopoverOpen] = useState<boolean | undefined>(false);

        const handleDeleteTag = useCallback(
            (deletedKey: string) => {
                const tags = selectedOptions.filter(tag => {
                    const key = typeof tag === 'string' ? tag : tag.label;

                    return deletedKey !== key;
                });

                const newValues = tags.map(e => e.value);
                if (onChange) {
                    onChange({ target: { value: deletedKey } }, { selected: tags });
                }

                setSelectedValues(newValues);
                field?.onChange({
                    target: {
                        value: newValues,
                    },
                });
            },
            [onChange, selectedOptions, field]
        );

        return (
            <BaseAutocomplete
                ref={ref}
                {...(withTags && {
                    hideSelectedOptions: true,
                    showEmptyOptionsList: true,
                })}
                options={filteredOptions}
                {...props}
                value={value}
                selected={selectedOptions}
                onOpen={payload => {
                    setPopoverOpen(payload.open);

                    onOpen?.(payload);
                    if (typeof payload.open === 'boolean') {
                        isOpenRef.current = payload.open;
                    }

                    if (!payload.open) {
                        onClose();
                    }
                }}
                onInput={e => {
                    handleInput(e, {
                        value: e.currentTarget.value,
                    });

                    onInput?.(e);

                    if (!multiple && !e.currentTarget.value) {
                        field?.onChange({
                            target: {
                                value: null,
                            },
                        });
                    }
                }}
                onChange={(event, payload) => {
                    handleChange(payload);

                    const value =
                        payload?.selected && multiple
                            ? payload?.selected.map(e => e.value)
                            : payload?.actionItem?.value;

                    field?.onChange({
                        target: {
                            value,
                        },
                    });

                    onChange?.(event, payload);

                    if (!multiple) {
                        onClose();
                    }
                }}
                allowUnselect={multiple}
                multiple={multiple}
                onBlur={onBlur}
                inputProps={{
                    ref: mergeRefs([inputRef /* props.inputProps!.ref */]),
                    placeholder: props.placeholder,
                    ...(showSelectedPlaceholder && {
                        placeholder: `${placeholderSelected} ${selectedCount}`,
                    }),
                }}
                fieldCSS={{
                    ...(showSelectedPlaceholder && {
                        'input::placeholder': {
                            transition: 'color .2s ease',
                            willChange: 'color',
                        },
                        'input:not(:focus)::placeholder': {
                            color: colors.black,
                        },
                    }),
                }}
                fieldProps={{
                    error: meta?.error,
                    ...(withTags && {
                        handleDeleteTag,
                        collapseTagList,
                        moveInputToNewLine,
                        transformCollapsedTagText,
                        transformTagText,
                        value,
                        autocomplete: true,
                        isPopoverOpen,
                    }),
                    rightAddons: (
                        <Clear
                            visible={canClear && !props.disabled}
                            clear={() => {
                                setValue('');
                                setSelectedValues([]);
                                if (!props.allowUnselect) {
                                    setTimeout(() => {
                                        inputRef.current?.focus();
                                    }, 10);
                                    return;
                                }

                                field?.onChange({
                                    target: {
                                        value: multiple ? [] : null,
                                    },
                                });
                            }}
                            focus={() => {
                                if (isOpenRef.current) {
                                    inputRef.current?.focus();
                                } else {
                                    inputRef.current?.blur();
                                }
                            }}
                            css={{ marginLeft: 'auto' }}
                        />
                    ),
                    ...fieldProps,
                }}
                optionsListProps={{
                    emptyPlaceholder: (
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            {isEverythingSelected ? 'Все элементы выбраны' : null}
                            {!isEverythingSelected && hasValue ? <p>Ничего не нашлось</p> : null}
                            {!isEverythingSelected && !hasValue ? <p>Начинайте вводить</p> : null}
                        </div>
                    ),
                }}
            />
        );
    }
);

Autocomplete.displayName = 'Autocomplete';
