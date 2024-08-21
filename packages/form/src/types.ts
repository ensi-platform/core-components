import { type HTMLProps, type ReactNode } from 'react';
import {
    type ControllerFieldState,
    type ControllerRenderProps,
    type DefaultValues,
    type FieldValues,
    type UseFormProps,
    type UseFormReturn,
} from 'react-hook-form';
import type { AnyObjectSchema } from 'yup';

/** Form component interface */
export interface IFormProps<T extends FieldValues>
    extends Omit<UseFormProps<T>, 'children'>,
        Omit<HTMLProps<HTMLFormElement>, 'onSubmit' | 'ref' | 'onReset' | 'children' | 'onChange'> {
    /** Initial formik values */
    initialValues: DefaultValues<T>;
    /** Yup validation schema */
    validationSchema?: AnyObjectSchema;
    /** Form submit handler */
    onSubmit: (values: T, formProps: UseFormReturn<T, unknown>) => void | Promise<unknown>;
    /** Form reset handler */
    onReset?: (values: T, formProps: UseFormReturn<T, unknown>) => void | Promise<unknown>;
    /** Form change handler */
    onChange?: (
        values: T,
        formProps: UseFormReturn<T, unknown>,
        exactChange: { [name: string]: unknown }
    ) => void | Promise<unknown>;
    /** Enable reinitialize on initialvalues change */
    enableReinitialize?: boolean;
    /** Enable validate on change */
    validateOnChange?: boolean;
    /** Enable validate on blur */
    validateOnBlur?: boolean;
    /** Form content */
    children?: ReactNode | ((props: UseFormReturn<T, unknown>) => ReactNode);
    /** ${props.isForm} */
    isForm?: boolean;
    /** Disabled flag */
    disabled?: boolean;
}

/** Interface props passed by the field wrapper component */
export interface IFieldWrapperProps<T extends FieldValues> {
    /**  */
    fieldState: ControllerFieldState;
    field: ControllerRenderProps<T>;
    setFieldValue: (value: T) => void;
}

export interface IFieldProps<T extends FieldValues> extends HTMLProps<HTMLInputElement>, IFieldWrapperProps<T> {}
