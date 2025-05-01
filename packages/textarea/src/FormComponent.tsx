'use client';

import { useFieldHook } from '@ensi-platform/core-components-form';

import { forwardRef, useCallback, useRef } from 'react';

import { Textarea } from './Component';
import { type TFormTextareaFieldProps } from './types';

export const FormTextareaField = forwardRef<HTMLTextAreaElement, TFormTextareaFieldProps>(
    ({ name, onInput, ...props }, ref) => {
        const { fieldState, field, onChangeHandler, inputProps } = useFieldHook({
            name,
        });

        const commonProps = {
            ...inputProps,
            ref,
            ...props,
        };

        const valueRef = useRef<string>(field?.value || '');
        valueRef.current = field?.value || '';

        const onInputHandler = useCallback<Required<TFormTextareaFieldProps>['onInput']>(
            event => {
                onChangeHandler(event);
                if (onInput) onInput(event);
            },
            [onChangeHandler, onInput]
        );

        return (
            <Textarea
                onInput={onInputHandler}
                error={fieldState.error?.message}
                {...props}
                value={field?.value || ''}
                {...commonProps}
            />
        );
    }
);
