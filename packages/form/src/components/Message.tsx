import { FC, HTMLProps } from 'react';

import { typography, useTheme } from '@greensight/gds';

export interface FormMessageProps extends HTMLProps<HTMLDivElement> {
    /** Error text */
    message: string;
    type?: 'error' | 'warning';
    className?: string;
}

export const useMessageColor = (type: FormMessageProps['type']) => {
    const { colors } = useTheme();

    switch (type) {
        case 'warning': {
            return colors?.warning;
        }
        case 'error':
        default: {
            return colors?.danger;
        }
    }
};

export const FormMessage: FC<FormMessageProps> = ({ message, type = 'error', className, ...props }) => {
    const color = useMessageColor(type);

    return (
        <div css={{ color, ...typography('bodySm') }} className={className} {...props}>
            {message}
        </div>
    );
};

export default FormMessage;
