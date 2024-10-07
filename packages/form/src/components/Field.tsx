import type { CSSObject } from '@emotion/react';
import type {
    FieldHelperProps as FormikFieldHelperProps,
    FieldMetaProps as FormikFieldMetaProps,
    FieldInputProps as FormikFieldProps,
} from 'formik';

import { Input, InputProps } from '@greensight/core-components-input';

import {
    ChangeEvent,
    Children,
    FC,
    ReactNode,
    cloneElement,
    forwardRef,
    isValidElement,
    useCallback,
    useMemo,
} from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { FieldProps } from '@greensight/core-components-form';
import useForm from '../hooks/useForm';

export interface FormFieldProps extends Omit<InputProps, 'size'> {
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

export interface FormikCompatibleFieldProps {
    helpers?: FormikFieldHelperProps<any>;
    field?: FormikFieldProps<any>;
    meta?: FormikFieldMetaProps<any>;
}

export const useFormikCompatibleFieldProps = ({
    field,
    error,
    isTouched,
    name,
    onChangeHandler,
    setError,
    setValue,
    trigger,
}: {
    field: FormikFieldProps<any>;
    error: any;
    isTouched: boolean;
    name: string;
    onChangeHandler: (e?: ChangeEvent<any>, val?: any) => void;
    setError: (...args: any[]) => void;
    setValue: (...args: any[]) => void;
    trigger: (...args: any[]) => void;
}) =>
    useMemo<FormikCompatibleFieldProps>(
        () => ({
            field: {
                name: field.name,
                onBlur: field.onBlur,
                onChange: onChangeHandler,
                value: field.value,
            },
            helpers: {
                setError(val) {
                    setError(name, { message: val });
                },
                setTouched() {
                    throw new Error('Unsupported function');
                },
                setValue(value, shouldValidate) {
                    onChangeHandler(undefined, value);

                    setValue(name, value);

                    field.onBlur(undefined);

                    if (shouldValidate) {
                        trigger(name);
                    }
                },
            },
            meta: {
                initialTouched: false,
                touched: isTouched,
                value: field.value,
                error,
            },
        }),
        [field, error, isTouched, name, onChangeHandler, setError, setValue, trigger]
    );

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

        const fieldProps = useFormikCompatibleFieldProps({
            error: inputProps.error,
            field,
            isTouched: fieldState.isTouched || formState.isSubmitted,
            name,
            onChangeHandler,
            setError,
            setValue,
            trigger,
        });

        return (
            <div css={{ width: '100%' }} className={className}>
                {children ? (
                    <>
                        {Children.map(children, child => {
                            if (isValidElement<any>(child)) {
                                const formikProps: FieldProps<any> = {
                                    ...fieldProps,
                                    id: (child?.type as FC)?.displayName !== 'Legend' ? name : '',
                                    ...inputProps,
                                    ...child.props,
                                };
                                return cloneElement(child, { ...formikProps });
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
