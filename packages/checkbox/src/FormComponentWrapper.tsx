import { type ChangeEvent, forwardRef, useCallback, useId, useRef } from 'react';

import { type CheckboxValueType, type ICheckboxWrapperProps } from './types';

const parseValue = (value?: CheckboxValueType) => (typeof value === 'undefined' ? false : value);

/**
 * Wrapper for controlling checkbox by RHF
 */
export const CheckboxFormWrapper = forwardRef<HTMLInputElement, ICheckboxWrapperProps>(
    ({ field, setFieldValue, error, value = '', children: childrenProp, onChange: onChangeProp }) => {
        const inputId = useId();

        const formValue = field?.value;

        const checked = Array.isArray(formValue) ? formValue.includes(value) : !!formValue;

        const formValueRef = useRef<string[] | boolean>(parseValue(formValue));
        formValueRef.current = parseValue(formValue);

        const onChangeArray = useCallback(
            (e: ChangeEvent<HTMLInputElement>) => {
                const v = [...(formValueRef.current as string[])];
                const index = v.indexOf(value);
                if (index !== -1) {
                    v.splice(index, 1);
                    setFieldValue?.(v);
                } else {
                    v.push(value);
                    setFieldValue?.(v);
                }
                onChangeProp?.(e);
            },
            [onChangeProp, setFieldValue, value]
        );

        const onChange = Array.isArray(formValueRef.current)
            ? onChangeArray
            : (e: ChangeEvent<HTMLInputElement>) => {
                  field?.onChange(e);
                  onChangeProp?.(e);
              };

        return childrenProp({ onChange, id: inputId, checked, error });
    }
);
