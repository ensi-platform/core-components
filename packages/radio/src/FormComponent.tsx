import { forwardRef } from 'react';

import Radio from './Component';
import RadioFormWrapper from './FormComponentWrapper';
import { type IFormRadioProps } from './types';

const FormRadio = forwardRef<HTMLInputElement, IFormRadioProps>(
    ({ value: valueProp, onChange: onChangeProp, setFieldValue, field, fieldState, ...props }, ref) => (
        <RadioFormWrapper
            setFieldValue={setFieldValue}
            field={field}
            fieldState={fieldState}
            value={valueProp}
            onChange={onChangeProp}
        >
            {({ onChange, id, checked, value }) => (
                <Radio ref={ref} id={id} checked={checked} onChange={onChange} value={value} {...props} />
            )}
        </RadioFormWrapper>
    )
);

export default FormRadio;
