import { type ButtonProps } from '@ensi-platform/core-components-common';

import { type MouseEventHandler, type ReactNode } from 'react';
import { type DeepPartial } from 'react-hook-form';

export type FormResetProps<T> = ButtonProps & {
    children: ReactNode;
    /** simple onClick handler */
    onClick?: MouseEventHandler<HTMLButtonElement>;
    /** initial values to reset form status */
    initialValues?: DeepPartial<T>;
};
