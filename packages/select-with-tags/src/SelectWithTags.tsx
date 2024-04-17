import { ChangeEvent, forwardRef, useCallback, useMemo, useRef, useState } from 'react';

import FormikSelect, {
    BaseSelect,
    Arrow as DefaultArrow,
    Option as DefaultOption,
    OptionsList as DefaultOptionsList,
    SelectProps,
    SelectItem,
} from '@greensight/core-components-select';

import { useSelectClear } from '@greensight/core-components-select/src/components';
import { SelectWithTagsProps } from './types';
import { filterOptions } from './scripts/helpers';
import { TagList } from './components';

export const SimpleSelectWithTags = forwardRef<HTMLDivElement, SelectWithTagsProps>(
    (
        {
            OptionsList = DefaultOptionsList,
            Option = DefaultOption,
            Arrow = DefaultArrow,
            value,
            selected,
            size = 'md',
            onOpen,
            onInput,
            onChange,
            options,
            autocomplete = true,
            allowUnselect = true,
            collapseTagList = true,
            moveInputToNewLine = true,
            overflow,
            collapseOnClose = false,
            transformCollapsedTagText,
            transformTagText,
            Tag,
            optionsListProps,
            fieldProps,
            resetOnChange = true,
            resetOnClose = true,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onReset,
            isLoading = false,
            ...restProps
        },
        ref
    ) => {
        const controlled = Boolean(selected);

        const [selectedTags, setSelectedTags] = useState(selected || []);
        const [isPopoverOpen, setPopoverOpen] = useState<boolean | undefined>(false);
        const updatePopover = useRef<() => any>();

        const resetValue = useCallback(() => {
            const event = { target: { value: '' } };

            onInput(event as ChangeEvent<HTMLInputElement>);
        }, [onInput]);

        const handleUpdatePopover = useCallback(() => {
            if (updatePopover && updatePopover.current) {
                setTimeout(() => {
                    updatePopover.current?.();
                }, 0);
            }
        }, []);

        const handleDeleteTag = useCallback(
            (deletedKey: string) => {
                let tags = selected || selectedTags;

                tags = tags.filter(tag => {
                    const key = typeof tag === 'string' ? tag : tag.label;

                    return deletedKey !== key;
                });

                if (onChange) {
                    onChange({ target: { value: tags } }, { selected: tags });
                }

                if (!controlled) {
                    setSelectedTags(tags);
                }
            },
            [controlled, onChange, selected, selectedTags]
        );

        const handleChange = useCallback<Required<SelectProps>['onChange']>(
            (event, { selected, name, actionItem }) => {
                if (onChange) {
                    onChange(event, { selected, name, actionItem });
                }

                if (!controlled && selected) {
                    setSelectedTags(selected);
                }

                if (value && resetOnChange) {
                    resetValue();
                }
            },
            [onChange, controlled, value, resetOnChange, resetValue]
        );

        const handleOpen = useCallback<Required<SelectProps>['onOpen']>(
            payload => {
                const { open } = payload;

                if (!open && value && resetOnClose) {
                    resetValue();
                }

                setPopoverOpen(open);

                if (onOpen) onOpen(payload);
            },
            [onOpen, resetValue, value, resetOnClose]
        );

        const filteredOptions = filterOptions(options, value);

        const isAutocomplete = autocomplete;
        const selectedCount = selected ? selected.length : selectedTags.length;
        const isEverythingSelected = options && selectedCount >= options.length;

        const clearableProps = useSelectClear({ Field: TagList, onClearClick: onReset, disabled: restProps.disabled });

        return (
            <BaseSelect
                {...restProps}
                ref={ref}
                Option={Option}
                Field={clearableProps.Field}
                OptionsList={OptionsList}
                Arrow={Arrow}
                multiple
                updatePopover={updatePopover as any}
                allowUnselect={allowUnselect}
                showEmptyOptionsList
                optionsListProps={{
                    emptyPlaceholder: (
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            {isEverythingSelected ? 'Все элементы выбраны' : null}
                            {!isEverythingSelected ? <p>Ничего не нашлось</p> : null}
                        </div>
                    ),
                    ...optionsListProps,
                }}
                fieldProps={{
                    value,
                    autocomplete: isAutocomplete,
                    onInput,
                    handleDeleteTag,
                    Tag,
                    collapseTagList,
                    moveInputToNewLine,
                    collapseOnClose,
                    transformCollapsedTagText,
                    transformTagText,
                    handleUpdatePopover,
                    isPopoverOpen,
                    isLoading,
                    overflow,
                    disabled: restProps.disabled,
                    ...fieldProps,
                }}
                selected={selected || selectedTags}
                autocomplete={isAutocomplete}
                size={size}
                options={filteredOptions}
                onChange={handleChange}
                onOpen={handleOpen}
                hideSelectedOptions
            />
        );
    }
);

const getValue = (option: string | SelectItem) => (typeof option === 'string' ? option : option.value);

export const SelectWithTags = forwardRef<
    HTMLDivElement,
    Omit<SelectWithTagsProps, 'value' | 'onInput'> & {
        meta?: any;
        field?: { value: any; onChange: (val: any) => void };
    }
>(({ name, field, options, meta, onChange, onBlur, selected, ...props }, ref) => {
    const selectedValues = useMemo(() => {
        const selectedProps = selected ? (Array.isArray(selected) ? selected.map(getValue) : [getValue(selected)]) : [];

        return Array.isArray(field?.value) ? field?.value || [] : selectedProps;
    }, [field?.value, selected]);

    const selectedOptions = useMemo(
        () =>
            options.filter(e => {
                if ('value' in e) {
                    return selectedValues.includes(e.value);
                }
                return false;
            }),
        [options, selectedValues]
    );

    const [value, setValue] = useState('');
    const handleInput = (event: any) => {
        setValue(event.target.value);
    };

    return (
        <SimpleSelectWithTags
            ref={ref}
            name={name}
            options={options}
            {...props}
            value={value}
            onInput={handleInput}
            error={meta?.touched && meta?.error}
            selected={selectedOptions as any}
            collapseOnClose
            onChange={(event, payload) => {
                onChange?.(event, payload);

                if (!field?.onChange || payload.selected === null) return;

                const value = payload.selected.map(e => (typeof e === 'string' ? e : e.value));
                field.onChange({ target: { value } });
            }}
            onBlur={onBlur}
        />
    );
});

FormikSelect.displayName = 'FormikSelect';
