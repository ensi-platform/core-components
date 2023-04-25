import { FC, HTMLProps, SVGProps } from 'react';

import { scale, typography, useTheme } from '@scripts/gds';

import ErrorIcon from '@icons/small/closedCircle.svg';
import WarningIcon from '@icons/small/warningCircle.svg';

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

interface MessageIconProps extends SVGProps<SVGSVGElement> {
    type: FormMessageProps['type'];
}

const MessageIcon: FC<MessageIconProps> = ({ type, ...props }) => {
    switch (type) {
        case 'warning': {
            return <WarningIcon {...props} />;
        }
        case 'error':
        default: {
            return <ErrorIcon {...props} />;
        }
    }
};

export const FormMessage: FC<FormMessageProps> = ({ message, type = 'error', className, ...props }) => {
    const color = useMessageColor(type);

    return (
        <div css={{ color, ...typography('bodySm') }} className={className} {...props}>
            <MessageIcon
                type={type}
                css={{ marginRight: scale(1, true), verticalAlign: 'text-bottom', fill: 'currentColor' }}
            />
            {message}
        </div>
    );
};

export default FormMessage;
