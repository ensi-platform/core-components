import { type ControllerFieldState, type ControllerRenderProps, type NativeFieldValue } from 'react-hook-form';

export type IFieldValueType = Exclude<NativeFieldValue, undefined | null>;

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
     * Hanlder for changing field value
     */
    setFieldValue: (value: T) => void;
    /**
     * Field error
     */
    error?: string;
}
