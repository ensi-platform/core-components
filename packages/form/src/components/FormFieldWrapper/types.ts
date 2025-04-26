import { type HTMLProps, type ReactNode } from 'react';

export interface IFormFieldWrapperProps extends Omit<HTMLProps<HTMLDivElement>, 'children'> {
    /** Name of field */
    name: string;
    /** Form component */
    children: ReactNode;
}
