import { type HTMLProps, type ReactNode } from 'react';
import {
    type NativeFieldValue,
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
    /** Render form tag */
    isForm?: boolean;
    /** Disabled flag */
    disabled?: boolean;
}

export type IFieldValueType = Exclude<NativeFieldValue, undefined | null>;

export interface IControllerRenderProps<T extends IFieldValueType> extends Omit<ControllerRenderProps, 'value'> {
    value: T;
}

// PathValue<TFieldValues, TFieldPath>
/** Interface props passed by the field wrapper component */
export interface IFieldWrapperProps<T extends IFieldValueType> {
    /**
     * Return value of useController
     * Contains a meta
     * https://react-hook-form.com/docs/usecontroller
     * */
    fieldState: ControllerFieldState;
    /**
     * Return value of useController.
     * Contains a value and a value change handler
     * https://react-hook-form.com/docs/usecontroller
     * */
    field: IControllerRenderProps<T>;
    /**
     * Hanlder for changing field value
     */
    setFieldValue: (value: T) => void;
    /**
     * Field error
     */
    error?: string;
}
