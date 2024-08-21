import { type InputProps } from '@greensight/core-components-input';

export interface IFormFieldProps extends Omit<InputProps, 'success' | 'children'> {
    /** Name of field */
    name: string;
}
