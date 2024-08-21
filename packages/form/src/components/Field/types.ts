import { type InputProps } from '@greensight/core-components-input';

export interface IFormFieldProps extends Omit<InputProps, 'children'> {
    /** Name of field */
    name: string;
}
