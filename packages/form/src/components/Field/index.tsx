import { forwardRef } from 'react';

import { Input } from '@greensight/core-components-input';
import { useFieldHook } from '../../hooks/useFieldHook';

import { type IFormFieldProps } from './types';

export const FormField = forwardRef<HTMLInputElement, IFormFieldProps>(
    ({ name, className, wrapperCSS, block = true, ...props }, ref) => {
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
                    wrapperCSS={wrapperCSS}
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
