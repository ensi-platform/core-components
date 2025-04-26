import { Component as Input } from '@ensi-platform/core-components-input';

import { forwardRef } from 'react';

import { useFieldHook } from '../../hooks/useFieldHook';
import type { IFormFieldProps } from './types';

/**
 * Field - is just Input, controlled with RHF
 */
export const FormField = forwardRef<HTMLInputElement, IFormFieldProps>(
    ({ name, className, block = true, ...props }, ref) => {
        const { fieldState, field, setFieldValue, onChangeHandler, inputProps } = useFieldHook({
            name,
        });

        const commonProps = {
            ...inputProps,
            ref,
            ...props,
        };

        return (
            <div className={className} css={{ width: '100%' }}>
                <Input
                    block={block}
                    value={field.value}
                    onInput={e => {
                        field.onChange(e);
                        onChangeHandler(e);
                    }}
                    error={fieldState.error?.message}
                    onClear={() => {
                        setFieldValue('');
                    }}
                    {...commonProps}
                />
            </div>
        );
    }
);

export default FormField;
