import {
    IconSmallClosedCircle as ErrorIcon,
    IconSmallWarningCircle as WarningIcon,
    defaultTheme,
    scale,
} from '@ensi-platform/core-components-common';

import { type FC } from 'react';

import { type FormMessageProps, type MessageIconProps } from './types';

export const useMessageColor = (type: FormMessageProps['type']) => {
    const { colors } = defaultTheme;

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

const FormMessage = ({ message, type = 'error', className, ...props }: FormMessageProps) => {
    const color = useMessageColor(type);
    const { typography } = defaultTheme;

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
