import { ChangeEvent, Children, FC, cloneElement, forwardRef, isValidElement, useCallback, useMemo } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { FieldProps } from '@greensight/core-components-form';
import { Input } from '@greensight/core-components-input';
import { FormFieldHelperProps } from '@greensight/core-components-common';
import { FormFieldProps } from './Field';
import useForm from '../hooks/useForm';

type DataType = 'string' | 'number';

export interface TypedFieldProps extends FormFieldProps {
    fieldType?: 'positiveInt' | 'positiveFloat';
    dataType?: DataType;
}

const transformFloatValue = (input: string): string => {
    let sanitizedString: string = input.trim();

    // Remove any non-digit and non-decimal point characters from the string
    sanitizedString = sanitizedString.replace(/[^0-9.]/g, '');

    const parts = sanitizedString.split('.');

    // If the string ends with a dot, remove it
    sanitizedString = (parts.length > 2 ? parts.slice(0, -1) : parts).join('.');

    return sanitizedString;
};

const getValueByDataType = (value: string, dataType?: DataType) => {
    if (!value) return '';
    return dataType === 'number' ? Number(value) : value;
};

export const TypedField = forwardRef<HTMLInputElement, TypedFieldProps>(
    (
        { name, children, size = 'md', className, wrapperCSS, block = true, fieldType, dataType = 'number', ...props },
        ref
    ) => {
        const { onChange, disabled } = useForm()!;
        const { control, setValue } = useFormContext(); // retrieve all hook methods
        const { field, fieldState: fieldStateForm } = useController({
            name,
            control,
        });

        const fieldState = useMemo(
            () => ({
                ...fieldStateForm,
                error: Array.isArray(fieldStateForm.error) ? fieldStateForm.error[0] : fieldStateForm.error,
            }),
            [fieldStateForm]
        );

        const onBlurHandler = useCallback(
            (...args: [any]) => {
                const parsedVal = getValueByDataType(field.value, dataType);
                const safeVal = Number.isNaN(parsedVal) ? '' : parsedVal;

                field.onChange(safeVal);
                onChange(name, safeVal);

                field.onBlur();

                if (typeof props.onBlur === 'function') {
                    props.onBlur(...args);
                }
            },
            [dataType, field, name, onChange, props]
        );

        const isCheckbox = isValidElement(children) && (children?.type as FC)?.name === 'Checkbox';
        const isRadio = isValidElement(children) && (children?.type as FC)?.name === 'Radio';

        const inputProps = {
            name,
            size,
            error: fieldState.error?.message,
            value: `${field.value}`,
            ref,
            label: props.label,
            ...(!isCheckbox && !isRadio && { isLegend: true, label: '' }),
            disabled,
            ...props,
            onBlur: onBlurHandler,
        };

        const transformValue = useCallback(
            (val: any) => {
                if (typeof val !== 'string') return val;

                if (fieldType === 'positiveInt') {
                    return val.replace(/[^\d]+/g, '');
                }

                if (fieldType === 'positiveFloat') {
                    const res = transformFloatValue(val);
                    return res;
                }

                return val;
            },
            [fieldType]
        );

        const onChangeHandler = useCallback(
            (e?: ChangeEvent<any>, initialValue?: any) => {
                const val = transformValue(initialValue || e?.target.value);
                field.onChange(val);
                onChange(name, val);
            },
            [field, name, onChange, transformValue]
        );

        const fieldProps = useMemo<FormFieldHelperProps>(
            () => ({
                field,
                meta: {
                    error: fieldState.error?.message,
                },
            }),
            [field, fieldState.error?.message]
        );

        return (
            <div css={{ width: '100%' }} className={className}>
                {children ? (
                    <>
                        {Children.map(children, child => {
                            if (isValidElement<any>(child)) {
                                const formProps: FieldProps<any> = {
                                    ...fieldProps,
                                    id: (child?.type as FC)?.displayName !== 'Legend' ? name : '',
                                    ...inputProps,
                                    ...child.props,
                                };
                                return cloneElement(child, { ...formProps });
                            }
                        })}
                    </>
                ) : (
                    <Input
                        block={block}
                        wrapperCSS={wrapperCSS}
                        onInput={e => {
                            field.onChange(e);
                            onChangeHandler(e);
                        }}
                        onClear={() => {
                            setValue(name, '');
                            onChangeHandler(undefined, '');
                        }}
                        {...inputProps}
                    />
                )}
            </div>
        );
    }
);

TypedField.displayName = 'TypedField';

export default TypedField;
