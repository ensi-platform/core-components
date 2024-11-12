import { Button } from '@ensi-platform/core-components-common';

import type { MouseEvent } from 'react';
import { useFormContext } from 'react-hook-form';

import { type FormResetProps } from './types';

const FormReset = <T extends any>({ children, onClick, initialValues, ...props }: FormResetProps<T>) => {
    const { reset } = useFormContext();

    return (
        <Button
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
                if (onClick) onClick(e);
                if (initialValues) {
                    reset(initialValues);
                    return;
                }
                reset();
            }}
            {...props}
        >
            {children}
        </Button>
    );
};

export default FormReset;
