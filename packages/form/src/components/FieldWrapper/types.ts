import { type IInputProps } from '@controls/Input';

export interface IFormFieldWrapperProps extends Omit<IInputProps, 'success' | 'wrapperClassName' | 'block'> {
    /** Name of field */
    name: string;
}
