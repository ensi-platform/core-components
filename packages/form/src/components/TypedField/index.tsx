import { type ChangeEvent, forwardRef, useCallback } from 'react';
import { type FieldValues } from 'react-hook-form';

import { Input } from '@greensight/core-components-input';
import { type ITypedFieldProps } from './types';
import { getValueByDataType, transformFloatValue } from './helpers';
import { useFieldHook } from '../../hooks/useFieldHook';

export const TypedField = forwardRef<HTMLInputElement, ITypedFieldProps>(
    ({ name, className, wrapperCSS, block = true, fieldType = 'positiveInt', dataType = 'number', ...props }, ref) => {
        const { fieldState, field, onChange, inputProps } = useFieldHook({
            name,
        });

        const transformValue = useCallback(
            (val: any) => {
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

        const onBlurHandler = useCallback(
            (...args: [any]) => {
                const parsedVal = getValueByDataType(field.value, dataType);
                const safeVal = (Number.isNaN(parsedVal) ? '' : parsedVal) as never as FieldValues;

                field.onChange(safeVal);
                onChange(name, safeVal);

                field.onBlur();

                if (typeof props.onBlur === 'function') {
                    props.onBlur(...args);
                }
            },
            [dataType, field, name, onChange, props]
        );

        const onChangeHandler = useCallback(
            (e?: ChangeEvent<any>, initialValue?: any) => {
                const val = transformValue(initialValue || e?.target.value || '');
                console.log('val=', val);
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
                        console.log('clear');
                        onChangeHandler(undefined, '');
                    }}
                />
            </div>
        );
    }
);

export default TypedField;
