import { useFieldHook } from '@ensi-platform/core-components-form';

import { forwardRef, useCallback } from 'react';

import { Password } from './Component';
import type { TFormPasswordFieldProps } from './types';

export const FormPasswordField = forwardRef<HTMLInputElement, TFormPasswordFieldProps>(
    ({ name, onInput, onClear, ...props }, ref) => {
        const { fieldState, field, onChangeHandler, inputProps } = useFieldHook({
            name,
        });

        const commonProps = {
            ...inputProps,
            ref,
            ...props,
        };

        const onChangeInner: Required<TFormPasswordFieldProps>['onInput'] = useCallback(
            e => {
                onChangeHandler(e);
                onInput?.(e);
            },
            [onChangeHandler, onInput]
        );

        const onClearInner: Required<TFormPasswordFieldProps>['onClear'] = useCallback(
            e => {
                field.onChange(undefined, '');
                onClear?.(e);
            },
            [field, onClear]
        );
        return (
            <Password
                value={field.value}
                onInput={onChangeInner}
                error={fieldState.error?.message}
                onClear={onClearInner}
                {...commonProps}
            />
        );
    }
);
