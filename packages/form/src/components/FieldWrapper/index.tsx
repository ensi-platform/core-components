import type { IFieldValueType, IFieldWrapperProps } from '@ensi-platform/core-components-form';

import { Children, cloneElement, forwardRef, isValidElement } from 'react';

import { useFieldHook } from '../../hooks/useFieldHook';
import type { IFormFieldWrapperProps } from './types';

/**
 * FieldWrapper - is a wrapper for any field, controlled with RHF
 */
export const FormFieldWrapper = forwardRef<HTMLInputElement, IFormFieldWrapperProps>(
    ({ name, children, className, ...props }, ref) => {
        const { fieldState, setFieldValue, field, onChangeHandler, inputProps } = useFieldHook({
            name,
        });

        const commonProps = {
            ...inputProps,
            ref,
            ...props,
        };
        return (
            <div
                className={className}
                css={{
                    width: '100%',
                }}
            >
                {Children.map(children, child => {
                    if (isValidElement(child)) {
                        const fieldProps: IFieldWrapperProps<IFieldValueType> = {
                            fieldState,
                            error: fieldState.error?.message,
                            field: {
                                ...field,
                                onChange: onChangeHandler,
                            },
                            setFieldValue,
                            ...commonProps,
                            ...child.props,
                        };
                        return cloneElement(child, { ...fieldProps });
                    }
                })}
            </div>
        );
    }
);

export default FormFieldWrapper;
