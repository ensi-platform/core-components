import type { MouseEvent } from 'react';
import { useFormContext } from 'react-hook-form';

import { Button } from '@greensight/gds';
import { type IFormResetProps } from './types';

export const FormReset = <T,>({ children, onClick, initialValues, ...props }: IFormResetProps<T>) => {
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
