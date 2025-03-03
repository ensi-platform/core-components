import type { InputProps } from '@ensi-platform/core-components-input';

export interface IFormFieldProps extends Omit<InputProps, 'children'> {
    /**
     * Name of field
     */
    name: string;
}
