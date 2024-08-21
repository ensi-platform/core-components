import { forwardRef } from 'react';

import { Input } from '@greensight/core-components-input';
import { useFieldHook } from '../../hooks/useFieldHook';

import { type IFormFieldProps } from './types';

export const FormField = forwardRef<HTMLInputElement, IFormFieldProps>(
    ({ name, className, wrapperCSS, block = true, ...props }, ref) => {
        const { fieldState, field, onChangeHandler, inputProps } = useFieldHook({
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
                        onChangeHandler(undefined, '');
                    }}
                    {...commonProps}
                />
            </div>
        );
    }
);

export default FormField;
