import { forwardRef, useMemo } from 'react';

import { SimpleSelect } from './SimpleSelect';
import { useSelectClear } from './components';
import type { SelectItem, SelectProps } from './types';

const getValue = (option: string | SelectItem) =>
    typeof option === 'object' && 'label' in option && 'value' in option ? option.value : option;

export const Select = forwardRef<HTMLDivElement, SelectProps>(
    (
        {
            name,
            multiple,
            field,
            setFieldValue,
            error,
            options,
            onChange,
            onBlur,
            selected,
            hideClearButton = false,
            closeOnClear,
            onClear,
            ...props
        },
        ref
    ) => {
        const onClearClick = useMemo(
            () =>
                onClear ||
                (() => {
                    setTimeout(() => {
                        setFieldValue?.(null);
                    }, 0);
                }),
            [field, onClear]
        );
        const clearProps = useSelectClear({
            closeOnClear,
            onClearClick,
            disabled: props.disabled,
        });

        const isValueArray = Array.isArray(field?.value);

        const selectedValues = useMemo(() => {
            // eslint-disable-next-line no-nested-ternary
            const selectedProps = selected
                ? Array.isArray(selected)
                    ? selected.map(getValue)
                    : [getValue(selected)]
                : [];

            if (multiple) return Array.isArray(field?.value) ? field?.value || [] : selectedProps;
            if (field?.value === undefined) return selectedProps;

            return Array.isArray(field?.value) ? field.value : [field?.value];
        }, [field?.value, multiple, selected]);

        const selectedOptions = useMemo(
            () =>
                options.filter(e => {
                    if ('value' in e) {
                        return selectedValues.includes(e.value);
                    }
                    return false;
                }) as SelectItem[],
            [options, selectedValues]
        );

        return (
            <SimpleSelect
                ref={ref}
                name={name}
                options={options}
                {...(!hideClearButton && { ...clearProps })}
                {...props}
                error={error}
                selected={selectedOptions}
                onChange={(event, payload) => {
                    onChange?.(event, payload);

                    if (typeof setFieldValue === 'function') {
                        const value =
                            (multiple || isValueArray) && payload?.selected
                                ? payload?.selected.map(e => e.value) || []
                                : (payload?.actionItem?.value ?? null);

                        if (!hideClearButton || payload?.selected !== null) {
                            setFieldValue(value);
                        }
                    }
                }}
                onBlur={onBlur}
                fieldProps={
                    {
                        // fieldState,
                    }
                }
            />
        );
    }
);

Select.displayName = 'Select';
