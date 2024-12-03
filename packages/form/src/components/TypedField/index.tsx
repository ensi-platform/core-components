import { Input } from '@ensi-platform/core-components-input';

import { type FormEvent, forwardRef, useCallback } from 'react';

import { useFieldHook } from '../../hooks/useFieldHook';
import { getValueByDataType, transformFloatValue } from './helpers';
import type { ITypedFieldProps } from './types';

/**
 * TypedField - is just Input, controlled with RHF, with onBlur-transformations according to fieldType prop
 */
export const FormTypedField = forwardRef<HTMLInputElement, ITypedFieldProps>(
    ({ name, className, wrapperCSS, block = true, fieldType = 'positiveInt', dataType = 'number', ...props }, ref) => {
        const { fieldState, field, onChange, setFieldValue, inputProps } = useFieldHook({
            name,
        });

        const transformValue = useCallback(
            (val: string) => {
                if (fieldType === 'positiveInt') {
                    return val.replace(/[^\d]+/g, '');
                }

                if (fieldType === 'positiveFloat') {
                    const res = transformFloatValue(val);
                    return res;
                }

                return val;
            },
            [fieldType]
        );

        const onBlurHandler = useCallback(() => {
            const parsedVal = getValueByDataType(field.value, dataType);
            const safeVal = Number.isNaN(parsedVal) ? '' : parsedVal;

            field.onChange(safeVal);
            onChange(name, safeVal);

            field.onBlur();
        }, [dataType, field, name, onChange]);

        const onChangeHandler = useCallback(
            (e: FormEvent<HTMLInputElement>) => {
                const val = transformValue((e.target as EventTarget & HTMLInputElement).value);
                field.onChange(val);
                onChange(name, val);
            },
            [field, name, onChange, transformValue]
        );

        const commonProps = {
            ...inputProps,
            ref,
            error: fieldState.error?.message,
            value: `${field.value}`,
            ...props,
            onBlur: onBlurHandler,
        };

        return (
            <div className={className} css={{ width: '100%' }}>
                <Input
                    {...commonProps}
                    value={field.value}
                    block={block}
                    wrapperCSS={wrapperCSS}
                    onInput={e => {
                        field.onChange(e);
                        onChangeHandler(e);
                    }}
                    onClear={() => {
                        setFieldValue('');
                    }}
                />
            </div>
        );
    }
);

export default FormTypedField;
