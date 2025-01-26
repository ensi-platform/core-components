import type { HTMLProps, ReactNode } from 'react';
import type { DefaultValues, FieldValues, UseFormProps, UseFormReturn } from 'react-hook-form';
import type { AnyObjectSchema } from 'yup';

/**
 * Form component interface
 */
export interface IFormProps<T extends FieldValues>
    extends Omit<UseFormProps<T>, 'children'>,
        Omit<HTMLProps<HTMLFormElement>, 'onSubmit' | 'ref' | 'onReset' | 'children' | 'onChange'> {
    /**
     * Initial values
     */
    initialValues: DefaultValues<T>;
    /**
     * Yup validation schema
     */
    validationSchema?: AnyObjectSchema;
    /**
     * Form content
     */
    children?: ReactNode | ((props: UseFormReturn<T, unknown>) => ReactNode);
    /**
     * Enable reinitialize on initialValues change
     */
    enableReinitialize?: boolean;
    /**
     * Render form tag
     */
    isForm?: boolean;
    /**
     * Disabled flag
     */
    disabled?: boolean;
    /**
     * Form submit handler
     */
    onSubmit: (values: T, formProps: UseFormReturn<T, unknown>) => void | Promise<void>;
    /**
     * Form reset handler
     */
    onReset?: (values: T, formProps: UseFormReturn<T, unknown>) => void | Promise<void>;
    /**
     * Form change handler
     */
    onChange?: (
        values: T,
        formProps: UseFormReturn<T, unknown>,
        exactChange: { [name: string]: unknown }
    ) => void | Promise<unknown>;
}
