import { useIMask } from 'react-imask';
import { forwardRef, Ref, useEffect, useRef } from 'react';
import { Input } from '@greensight/core-components-input';
import mergeRefs from 'react-merge-refs';
import { FormFieldDescendantProps } from '@greensight/core-components-common';

type MaskType = Exclude<Parameters<typeof useIMask>[0]['mask'], undefined>;

export interface MaskProps extends FormFieldDescendantProps<string> {
    /** Mask for input */
    mask: MaskType;
    /** Placeholder for mask */
    placeholderChar?: string;
    /** Is show placholder */
    lazy?: boolean;
    label?: string;
    className?: string;
    blocks?: Record<string, any>;
    format?: (input: any) => string;
    unmask?: (val: string) => any;
    autofix?: boolean;
    overwrite?: boolean;
    hint?: string;
}

export const Mask = forwardRef(
    (
        { hint, mask, label, meta, field, placeholderChar = '_', lazy = true, className, ...props }: MaskProps,
        rootRef: Ref<HTMLInputElement>
    ) => {
        const isInnerChangeRef = useRef(false);
        const isOuterChangeRef = useRef(false);
        const formValue = field?.value || '';

        const { ref, value, setValue } = useIMask(
            {
                mask: mask as string,
                ...props,
                lazy,
                placeholderChar,
            },
            {
                onAccept: (val: string) => {
                    if (val === value) return;

                    if (isOuterChangeRef.current) {
                        isOuterChangeRef.current = false;
                        return;
                    }

                    isInnerChangeRef.current = true;

                    field?.onChange({
                        target: {
                            value: val,
                        },
                    });
                },
            }
        );

        useEffect(() => {
            if (isInnerChangeRef.current) {
                isInnerChangeRef.current = false;
                return;
            }

            isOuterChangeRef.current = true;

            setValue(formValue);
        }, [formValue, setValue]);

        return (
            <Input
                label={label}
                hint={hint}
                error={meta?.error}
                ref={mergeRefs([rootRef, ref])}
                className={className}
                value={value}
            />
        );
    }
);
