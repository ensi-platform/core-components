import type { TInputProps } from '@ensi-platform/core-components-input';

export interface IFormFieldProps extends Omit<TInputProps, 'children'> {
    /**
     * Name of field
     */
    name: string;
}
