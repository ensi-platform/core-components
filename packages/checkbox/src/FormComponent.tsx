import { forwardRef } from 'react';

import { Checkbox } from './Component';
import { CheckboxFormWrapper } from './FormComponentWrapper';
import { checkboxThemes } from './themes';
import { CheckboxSizeEnum, CheckboxVariantEnum, type IFormCheckboxProps } from './types';

export * from './types';

export { checkboxThemes, CheckboxSizeEnum, CheckboxVariantEnum };

/**
 * Controlled by RHF checkbox component
 */
export const FormCheckbox = forwardRef<HTMLLabelElement, IFormCheckboxProps>(
    ({ value, onChange: onChangeProp, setFieldValue, field, fieldState, ...props }, ref) => (
        <CheckboxFormWrapper
            value={value}
            field={field}
            fieldState={fieldState}
            setFieldValue={setFieldValue}
            onChange={onChangeProp}
        >
            {({ onChange, id, checked }) => (
                <Checkbox ref={ref} id={id} checked={checked} onChange={onChange} {...props} />
            )}
        </CheckboxFormWrapper>
    )
);
