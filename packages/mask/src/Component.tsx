'use client';

import { Input } from '@ensi-platform/core-components-input';

import { type MouseEvent, type Ref, forwardRef, useCallback, useEffect, useRef } from 'react';
import { useIMask } from 'react-imask';
import mergeRefs from 'react-merge-refs';

import { type TMaskProps } from './types';

export const Mask = forwardRef(
    ({ opts, value: valueProps, onChange, onClear, ...props }: TMaskProps, rootRef: Ref<HTMLInputElement>) => {
        const { value, ref, maskRef, setValue } = useIMask(opts, {
            onAccept: (val: string) => {
                if (val === value) return;

                const e = {
                    target: {
                        value: val,
                    },
                };

                onChange?.(e);
            },
        });

        const valueRef = useRef(maskRef.current?.value);
        useEffect(() => {
            if (valueProps !== undefined && valueProps !== valueRef.current) {
                setValue(valueProps);
            }
        }, [valueProps, setValue]);

        const onClearHandler = useCallback(
            (event: MouseEvent<HTMLButtonElement>) => {
                setValue('');

                if (onClear) onClear(event);
            },
            [onClear, setValue]
        );

        return <Input ref={mergeRefs([rootRef, ref])} value={value} onClear={onClearHandler} {...props} />;
    }
);
