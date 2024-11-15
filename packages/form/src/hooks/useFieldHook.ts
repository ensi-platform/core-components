import { type SyntheticEvent, useCallback } from 'react';
import { type NativeFieldValue, useController, useFormContext } from 'react-hook-form';

import { type IFormFieldWrapperProps } from '../components/FieldWrapper/types';
import useForm from '../context/form';

/**
 * Prepare props for controlled field by its name
 */
export const useFieldHook = ({ name }: Pick<IFormFieldWrapperProps, 'name'>) => {
    const { onChange, disabled } = useForm();
    const { control, setValue } = useFormContext();
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

    const setFieldValue = useCallback(
        (value: NativeFieldValue) => {
            field.onChange();
            setValue(name, value);
            onChange(name, value);
            field.onBlur();
        },
        [field, name, onChange, setValue]
    );

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
