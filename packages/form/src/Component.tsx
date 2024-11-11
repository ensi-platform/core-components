import { usePrevious } from '@ensi-platform/core-components-common';

import { yupResolver } from '@hookform/resolvers/yup';

import { type SyntheticEvent, useCallback, useEffect, useMemo, useRef } from 'react';
import deepEqual from 'react-fast-compare';
import { type FieldValues, FormProvider, type NativeFieldValue, useForm } from 'react-hook-form';

import { FormContext } from './context/form';
import { type IFormProps } from './types';

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
}: IFormProps<T>) => {
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
        (key: string, value: NativeFieldValue) => {
            if (onChange) onChange(form.getValues(), form, { [key]: value });
        },
        [form, onChange]
    );

    const formHandlerRef = useRef<ReturnType<typeof form.handleSubmit>>();
    formHandlerRef.current = form.handleSubmit(v => onSubmit(v, form));

    const onSubmitHandler = useCallback((event: SyntheticEvent) => {
        event.stopPropagation();
        if (formHandlerRef.current) formHandlerRef.current(event);
    }, []);

    const providerValue = useMemo(() => ({ onChange: onChangeHandler, disabled }), [onChangeHandler, disabled]);
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

export default Form;
