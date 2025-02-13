import type { ButtonProps } from '@ensi-platform/core-components-common';

import type { DeepPartial } from 'react-hook-form';

export interface IFormResetProps<T> extends Omit<ButtonProps, 'as'> {
    /**
     * Initial values to reset form
     */
    initialValues?: DeepPartial<T>;
}
