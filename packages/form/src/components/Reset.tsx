import type { MouseEvent, MouseEventHandler, ReactNode } from 'react';
import { DeepPartial, useFormContext } from 'react-hook-form';

import { Button, ButtonProps } from '@greensight/gds';

export type FormResetProps<T> = ButtonProps & {
    children: ReactNode;
    /** simple onClick handler */
    onClick?: MouseEventHandler<HTMLButtonElement>;
    /** initial values to reset form status */
    initialValues?: DeepPartial<T>;
};

export const FormReset = <T extends any>({ children, onClick, initialValues, ...props }: FormResetProps<T>) => {
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
