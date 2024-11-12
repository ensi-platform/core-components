import { usePrevious } from '@ensi-platform/core-components-common';

import { yupResolver } from '@hookform/resolvers/yup';

import { type SyntheticEvent, useCallback, useEffect, useMemo, useRef } from 'react';
import deepEqual from 'react-fast-compare';
import { type FieldValues, FormProvider, useForm } from 'react-hook-form';

import FormField from './components/Field';
import FormFieldArray from './components/FieldArray';
import FormMessage from './components/Message';
import FormReset from './components/Reset';
import TypedField from './components/TypedField';
import { FormContext } from './hooks/useForm';
import { type FormCompositionProps, type FormProps } from './types';

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
