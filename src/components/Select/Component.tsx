import { forwardRef, useMemo } from 'react';

import { Arrow as DefaultArrow } from './components/arrow';
import { BaseSelect } from './components/base-select';
import { Field as DefaultField } from './components/field';
import { Optgroup as DefaultOptgroup } from './components/optgroup';
import { Option as DefaultOption } from './components/option';
import { OptionsList as DefaultOptionsList } from './components/options-list';
import useSelectClear from './presets/useSelectClear';
import { BaseSelectProps, OptionShape } from './types';

export type SelectProps = BaseSelectProps & {
    hideClearButton?: boolean;
};

export const SimpleSelect = forwardRef<HTMLDivElement, SelectProps>(
    (
        {
            Arrow = DefaultArrow,
            Field = DefaultField,
            OptionsList = DefaultOptionsList,
            Optgroup = DefaultOptgroup,
            Option = DefaultOption,
            ...restProps
        },
        ref
    ) => {
        const props = useMemo(
            () => ({
                ref,
                Option,
                Field,
                Optgroup,
                OptionsList,
                Arrow,
                ...restProps,
            }),
            [Arrow, Field, Optgroup, Option, OptionsList, ref, restProps]
        );

        return <BaseSelect {...props} />;
    }
);

SimpleSelect.displayName = 'SimpleSelect';

const getValue = (option: string | OptionShape) =>
    typeof option === 'object' && 'key' in option && 'value' in option ? option.value : option;

export const FormikSelect = forwardRef<
    HTMLDivElement,
    SelectProps & {
        field?: { value: any };
        meta?: any;
        helpers?: { setValue: (value: any) => void };
    }
>(
    (
        {
            name,
            multiple,
            field,
            options,
            meta,
            helpers,
            onChange,
            onBlur,
            selected,
            hideClearButton = false,
            ...props
        },
        ref
    ) => {
        const clearProps = useSelectClear();

        const selectedValues = useMemo(() => {
            // eslint-disable-next-line no-nested-ternary
            const selectedProps = selected
                ? Array.isArray(selected)
                    ? selected.map(getValue)
                    : [getValue(selected)]
                : [];

            if (multiple) return Array.isArray(field?.value) ? field?.value || [] : selectedProps;
            if (field?.value === undefined) return selectedProps;

            return [field?.value];
        }, [field?.value, multiple, selected]);

        const selectedOptions = useMemo(
            () =>
                options.filter(e => {
                    if ('value' in e) {
                        return selectedValues.includes(e.value);
                    }
                    return false;
                }) as OptionShape[],
            [options, selectedValues]
        );

        return (
            <SimpleSelect
                ref={ref}
                name={name}
                options={options}
                {...(!hideClearButton && { ...clearProps })}
                {...props}
                multiple={multiple}
                error={!!meta?.error && meta.touched}
                selected={selectedOptions}
                onChange={payload => {
                    onChange?.(payload);

                    if (!helpers) return;

                    if (!multiple) {
                        helpers.setValue(payload.selected?.value);
                    } else {
                        helpers.setValue(payload.selectedMultiple.map(e => e.value));
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

FormikSelect.displayName = 'FormikSelect';
