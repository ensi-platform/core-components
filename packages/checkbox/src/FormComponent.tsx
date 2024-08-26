import { forwardRef } from 'react';
import { type IFormCheckboxProps } from './types';
import { Checkbox } from './Component';
import { CheckboxFormWrapper } from './FormCheckboxWrapper';

export const FormCheckbox = forwardRef<HTMLLabelElement, IFormCheckboxProps>(
    ({ value, onChange: onChangeProp, setFieldValue, field, fieldState, ...props }, ref) => (
        <CheckboxFormWrapper
            setFieldValue={setFieldValue}
            field={field}
            fieldState={fieldState}
            value={value}
            onChange={onChangeProp}
        >
            {({ onChange, id, checked }) => (
                <Checkbox ref={ref} id={id} checked={checked} onChange={onChange} {...props} />
            )}
        </CheckboxFormWrapper>
    )
);
