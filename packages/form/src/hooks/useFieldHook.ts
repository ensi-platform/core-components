import { useCallback } from 'react';

import { useController, useFormContext } from 'react-hook-form';

import { type IFormFieldWrapperProps } from '../components/FieldWrapper/types';
import useForm from '../context/form';

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
        (value: any) => {
            field.onChange();
            setValue(name, value);
            onChange(name, value);
            field.onBlur();
        },
        [field, name, onChange, setValue]
    );

    const onChangeHandler = useCallback(
        (e: any, val?: any) => {
            if (e) field.onChange(e);
            else setFieldValue(val);
            const value = e !== undefined ? e.target.value : val;
            onChange(name, value);
        },
        [field, name, onChange, setFieldValue]
    );

    return { field, onChange, setValue, fieldState, inputProps, setFieldValue, onChangeHandler };
};
