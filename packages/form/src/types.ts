import { type FC, type HTMLProps, type ReactNode } from 'react';
import { type DefaultValues, type FieldValues, type UseFormProps, type UseFormReturn } from 'react-hook-form';
import type { AnyObjectSchema } from 'yup';

import { type FormFieldProps } from './components/Field/types';
import type FormFieldArray from './components/FieldArray';
import { type FormMessageProps } from './components/Message/types';
import type FormReset from './components/Reset';
import { type TypedFieldProps } from './components/TypedField/types';

export type NumberFieldValue = number | '';

export interface FormCompositionProps {
    Field: FC<FormFieldProps>;
    TypedField: FC<TypedFieldProps>;
    Message: FC<FormMessageProps>;
    FieldArray: typeof FormFieldArray;
    Reset: typeof FormReset;
}

export interface FormProps<T extends FieldValues>
    extends Omit<UseFormProps<T>, 'children'>,
        Omit<HTMLProps<HTMLFormElement>, 'onSubmit' | 'ref' | 'onReset' | 'children' | 'onChange'> {
    /** Initial form values */
    initialValues: DefaultValues<T>;
    /** Yup validation schema */
    validationSchema?: AnyObjectSchema;
    /** Form submit handler */
    onSubmit: (values: T, formProps: UseFormReturn<T, any>) => void | Promise<any>;
    /** Form reset handler */
    onReset?: (values: T, formProps: UseFormReturn<T, any>) => void | Promise<any>;
    onChange?: (
        values: T,
        formProps: UseFormReturn<T, any>,
        exactChange: { [name: string]: any }
    ) => void | Promise<any>;
    /** enable reinitialize on initialvalues change */
    enableReinitialize?: boolean;
    /** enable validate on change */
    validateOnChange?: boolean;
    /** enable validate on blur */
    validateOnBlur?: boolean;
    children?: ReactNode | ReactNode[] | ((props: UseFormReturn<T, any>) => ReactNode | ReactNode[]);
    isForm?: boolean;
    className?: string;
    disabled?: boolean;
}
