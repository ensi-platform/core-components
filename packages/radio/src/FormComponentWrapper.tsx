import { type ChangeEvent, type FC, useCallback, useId, useRef } from 'react';

import type { IFormRadioWrapperProps, RadioValueType } from './types';

const parseValue = (value?: RadioValueType) => (typeof value === 'undefined' ? false : value);

const RadioFormWrapper: FC<IFormRadioWrapperProps> = ({
    field,
    setFieldValue,
    error,
    value = '',
    children: childrenProp,
    onChange: onChangeProp,
}) => {
    const inputId = useId();

    const formValue = field?.value;

    const checked = Array.isArray(formValue) ? formValue.includes(value) : formValue === value;

    const formValueRef = useRef<string[] | string | boolean>(parseValue(formValue));
    formValueRef.current = parseValue(formValue);

    const onChangeArray = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const v = [...(formValueRef.current as string[])];
            v.push(value);
            setFieldValue?.(v);
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

    return childrenProp({ onChange, id: inputId, checked, error, value });
};

export default RadioFormWrapper;
