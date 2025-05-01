import { useFieldHook } from '@ensi-platform/core-components-form';

import { forwardRef, useCallback } from 'react';

import { Mask } from './Component';
import type { TFormFieldMaskProps } from './types';

export const FormMaskField = forwardRef<HTMLInputElement, TFormFieldMaskProps>(
    ({ name, onInput, onClear, ...props }, ref) => {
        const { fieldState, field, onChangeHandler, inputProps } = useFieldHook({
            name,
        });

        const commonProps = {
            ...inputProps,
            ref,
            ...props,
        };

        const onChangeInner: Required<TFormFieldMaskProps>['onInput'] = useCallback(
            e => {
                onChangeHandler(e);
                onInput?.(e);
            },
            [onChangeHandler, onInput]
        );

        const onClearInner: Required<TFormFieldMaskProps>['onClear'] = useCallback(
            e => {
                field.onChange(undefined, '');
                onClear?.(e);
            },
            [field, onClear]
        );
        return (
            <Mask
                value={field.value}
                onInput={onChangeInner}
                error={fieldState.error?.message}
                onClear={onClearInner}
                {...commonProps}
            />
        );
    }
);
