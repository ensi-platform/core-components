import { type ControllerFieldState, type ControllerRenderProps, type NativeFieldValue } from 'react-hook-form';

type ExtendedValue<T> = T | T[] | Record<string, T> | Record<string, T>[];

export type IFieldValueType = Exclude<ExtendedValue<NativeFieldValue>, undefined>;

export interface IControllerRenderProps<T extends IFieldValueType> extends Omit<ControllerRenderProps, 'value'> {
    value: T;
}

/**
 * Interface props passed by the field wrapper component
 */
export interface IFieldWrapperProps<T extends IFieldValueType> {
    /**
     * Returned property of useController
     * Contains a meta
     * https://react-hook-form.com/docs/usecontroller
     * */
    fieldState: ControllerFieldState;
    /**
     * Returned property of useController
     * Contains a value and a value change handler
     * https://react-hook-form.com/docs/usecontroller
     * */
    field: IControllerRenderProps<T>;
    /**
     * Handler for changing field value
     * @param value - field value, not event
     */
    setFieldValue: (value: T) => void;
    /**
     * Field error
     */
    error?: string;
}
