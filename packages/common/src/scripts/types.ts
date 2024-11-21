import type { ControllerRenderProps } from 'react-hook-form';

type FieldValue = boolean | number | File | string | Record<string, any> | null;

export interface FormFieldHelperProps<TValue extends FieldValue = FieldValue> {
    field: ControllerRenderProps<Record<string, TValue>>;
    meta: {
        error?: string;
    };
}
