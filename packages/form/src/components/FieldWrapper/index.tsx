import { Children, cloneElement, forwardRef, isValidElement } from 'react';

import { type FieldValues } from 'react-hook-form';
import { type IFieldWrapperProps } from '../../types';
import { useFieldHook } from '../../hooks/useFieldHook';

import { type IFormFieldWrapperProps } from './types';

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
                        const fieldProps: IFieldWrapperProps<FieldValues> = {
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
