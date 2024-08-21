import { type DeepPartial } from 'react-hook-form';

import { type ButtonProps } from '@greensight/gds';

export interface IFormResetProps<T> extends Omit<ButtonProps, 'as'> {
    /** initial values to reset formik statu to */
    initialValues?: DeepPartial<T>;
}
