import { type SyntheticEvent, useCallback } from 'react';
import { type NativeFieldValue, useController, useFormContext } from 'react-hook-form';

import { type IFormFieldWrapperProps } from '../components/FormFieldWrapper/types';
import useForm from '../context/form';

/**
 * Prepare props for controlled field by its name
 */
export const useFieldHook = ({ name }: Pick<IFormFieldWrapperProps, 'name'>) => {
    // Get common form props from our context
    const { onChange, disabled } = useForm();
    // Get props from useForm hook, passed to FormProvider
    const { control, setValue } = useFormContext();

    // Get rhf's props for controlled input
    const { field, fieldState: fieldStateForm } = useController({
        name,
        control,
    });

    const fieldState = {
        ...fieldStateForm,
        error: Array.isArray(fieldStateForm.error) ? fieldStateForm.error[0] : fieldStateForm.error,
    };

    const inputProps = {
        name,
        onBlur: field.onBlur,
        disabled,
    };

    /**
     * Change field value, trigger onBlur and form onChange,
     * accepts field value (not event)
     */
    const setFieldValue = useCallback(
        (value: NativeFieldValue) => {
            field.onChange(value);
            onChange(name, value);
            field.onBlur();
        },
        [field, name, onChange]
    );

    /**
     * Change field value, trigger onBlur and form onChange,
     * accepts input event with target value
     */
    const onChangeHandler = useCallback(
        <T extends HTMLInputElement, E extends Event>(e: SyntheticEvent<T, E>) => {
            field.onChange(e);
            onChange(name, (e.target as EventTarget & HTMLInputElement).value);
            field.onBlur();
        },
        [field, name, onChange]
    );

    return { field, onChange, setValue, fieldState, inputProps, setFieldValue, onChangeHandler };
};
