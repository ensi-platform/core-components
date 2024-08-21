import { type DeepPartial } from 'react-hook-form';

import { type ButtonProps } from '@greensight/gds';

export interface IFormResetProps<T> extends Omit<ButtonProps, 'as'> {
    /** Initial values to reset form */
    initialValues?: DeepPartial<T>;
}
