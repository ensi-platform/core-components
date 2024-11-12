import { type FormFieldHelperProps, getValueFromObject } from '@ensi-platform/core-components-common';
import { Input, type InputProps } from '@ensi-platform/core-components-input';

import type { CSSObject } from '@emotion/react';

import {
    Children,
    type FC,
    type ReactNode,
    cloneElement,
    forwardRef,
    isValidElement,
    useCallback,
    useMemo,
} from 'react';
import { useController, useFormContext } from 'react-hook-form';

import useForm from '../hooks/useForm';

export interface FieldProps<T> {
    field?: {
        value: T;
        onChange: (
            eventOrValue:
                | {
                      target: {
                          value: T;
                      };
                  }
                | T
        ) => void;
    };
    meta?: {
        error?: string;
    };
    helpers?: { setValue: (value: T) => void };
}

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
