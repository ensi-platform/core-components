import { yupResolver } from '@hookform/resolvers/yup';
import { FC, HTMLProps, ReactNode, SyntheticEvent, useCallback, useEffect, useMemo, useRef } from 'react';
import deepEqual from 'react-fast-compare';
import { DefaultValues, FieldValues, FormProvider, UseFormProps, UseFormReturn, useForm } from 'react-hook-form';
import type { AnyObjectSchema } from 'yup';
import { FormField, FormFieldProps } from './components/Field';
import { TypedField, TypedFieldProps } from './components/TypedField';
import { FormMessage, FormMessageProps } from './components/Message';
import FormFieldArray from './components/FieldArray';
import FormReset from './components/Reset';
import { usePrevious } from './hooks/usePrevious';
import { FormContext } from './hooks/useForm';

export type NumberFieldValue = number | '';

export interface FormCompositionProps {
    Field: FC<FormFieldProps>;
    TypedField: FC<TypedFieldProps>;
    Message: FC<FormMessageProps>;
    FieldArray: typeof FormFieldArray;
    Reset: typeof FormReset;
}

export interface FormProps<T extends FieldValues>
    extends Omit<UseFormProps<T>, 'children'>,
        Omit<HTMLProps<HTMLFormElement>, 'onSubmit' | 'ref' | 'onReset' | 'children' | 'onChange'> {
    /** Initial formik values */
    initialValues: DefaultValues<T>;
    /** Yup validation schema */
    validationSchema?: AnyObjectSchema;
    /** Form submit handler */
    onSubmit: (values: T, formProps: UseFormReturn<T, any>) => void | Promise<any>;
    /** Form reset handler */
    onReset?: (values: T, formProps: UseFormReturn<T, any>) => void | Promise<any>;
    onChange?: (
        values: T,
        formProps: UseFormReturn<T, any>,
        exactChange: { [name: string]: any }
    ) => void | Promise<any>;
    /** enable reinitialize on initialvalues change */
    enableReinitialize?: boolean;
    /** enable validate on change */
    validateOnChange?: boolean;
    /** enable validate on blur */
    validateOnBlur?: boolean;
    children?: ReactNode | ReactNode[] | ((props: UseFormReturn<T, any>) => ReactNode | ReactNode[]);
    isForm?: boolean;
    className?: string;
    disabled?: boolean;
}

export const Form = <T extends FieldValues>({
    initialValues,
    validationSchema,
    onSubmit,
    onReset,
    children: childrenProp,
    enableReinitialize = false,
    onChange,
    isForm = true,
    mode = 'all',
    className,
    disabled,
    ...props
}: FormProps<T> & Partial<FormCompositionProps>) => {
    const form = useForm<T>({
        defaultValues: initialValues,
        mode,
        ...(validationSchema && { resolver: yupResolver(validationSchema) }),
        ...props,
    });

    const reset: typeof form.reset = useCallback(
        (newValues, keepStateOptions) => {
            form.reset(newValues, keepStateOptions);
            const values = form.getValues();
            if (onReset) onReset(values, form);
        },
        [form, onReset]
    );

    const children: typeof childrenProp = useMemo(
        () => (typeof childrenProp === 'function' ? childrenProp({ ...form, reset }) : childrenProp),
        [childrenProp, form, reset]
    );

    const prevInitialValues = usePrevious(initialValues);
    useEffect(() => {
        if (enableReinitialize && !deepEqual(prevInitialValues, initialValues)) {
            form.reset(initialValues);
        }
    }, [enableReinitialize, initialValues, form, prevInitialValues]);

    const onChangeHandler = useCallback(
        (key: string, value: any) => {
            if (onChange) onChange(form.getValues(), form, { [key]: value });
        },
        [form, onChange]
    );

    const formHandlerRef = useRef<any>();
    formHandlerRef.current = form.handleSubmit(v => onSubmit(v, form));

    const onSubmitHandler = useCallback((event: SyntheticEvent) => {
        event.stopPropagation();
        if (formHandlerRef.current) formHandlerRef.current(event);
    }, []);

    const providerValue = useMemo(
        () => ({ onChange: onChangeHandler, disabled, onSubmitHandler }),
        [onChangeHandler, disabled, onSubmitHandler]
    );
    return (
        <FormProvider {...form} reset={reset}>
            <FormContext.Provider value={providerValue}>
                {isForm ? (
                    <form onSubmit={onSubmitHandler} noValidate className={className}>
                        {children}
                    </form>
                ) : (
                    <div className={className}>{children}</div>
                )}
            </FormContext.Provider>
        </FormProvider>
    );
};

Form.Field = FormField;
Form.TypedField = TypedField;
Form.Message = FormMessage;
Form.Reset = FormReset;
Form.FieldArray = FormFieldArray;
