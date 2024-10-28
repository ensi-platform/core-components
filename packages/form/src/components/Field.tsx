import { Children, FC, ReactNode, cloneElement, forwardRef, isValidElement, useCallback, useMemo } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import type { CSSObject } from '@emotion/react';

import { FieldProps } from '@greensight/core-components-form';
import { Input, InputProps } from '@greensight/core-components-input';
import { FormFieldHelperProps, getValueFromObject } from '@greensight/core-components-common';

import useForm from '../hooks/useForm';

export interface FormFieldProps extends Omit<InputProps, 'size' | 'label'> {
    size?: InputProps['size'];
    /** Name of field */
    name: string;
    /** Label for FormControl */
    label?: string | ReactNode;
    /** class name */
    className?: string;

    wrapperCSS?: CSSObject;
    /**
     * Флаг отображения ошибки
     */
    showError?: boolean;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
    ({ name, children, size = 'md', className, wrapperCSS, block = true, ...props }, ref) => {
        const { onChange, disabled } = useForm()!;
        const { control, setValue, trigger, setError, formState } = useFormContext(); // retrieve all hook methods
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

        const isCheckbox = isValidElement(children) && (children?.type as FC)?.name === 'Checkbox';
        const isRadio = isValidElement(children) && (children?.type as FC)?.name === 'Radio';

        const onChangeHandler = useCallback(
            (e?: any, val?: any) => {
                field.onChange(e);
                const value = e !== undefined ? e.target.value : val;
                onChange(name, value);
            },
            [field, name, onChange]
        );

        const fieldProps = useMemo<FormFieldHelperProps>(
            () => ({
                field,
                name,
                trigger,
                setError,
                setValue,
                helpers: {
                    setError(value: any) {
                        setError(name, { message: value });
                    },
                    setValue(value: any, shouldValidate: boolean) {
                        onChangeHandler(undefined, value);

                        setValue(name, value);

                        field.onBlur();

                        if (shouldValidate) {
                            trigger(name);
                        }
                    },
                },
                meta: {
                    isDirty: fieldState.isDirty,
                    touched: fieldState.isTouched || formState.isSubmitted,
                    error: fieldState.error?.message,
                    value: field.value,
                    initialValue: getValueFromObject(name, formState.defaultValues || {}, null),
                },
            }),
            [field, fieldState.error?.message]
        );

        const inputProps = {
            name,
            size,
            error: fieldState.error?.message,
            value: field.value,
            ref,
            label: props.label,
            ...(!isCheckbox && !isRadio && { isLegend: true, label: '' }),
            disabled,
            ...props,
            onBlur: (...args: [any]) => {
                field.onBlur();

                if (typeof props.onBlur === 'function') {
                    props.onBlur(...args);
                }
            },
        };

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

FormField.displayName = 'FormField';

export default FormField;
