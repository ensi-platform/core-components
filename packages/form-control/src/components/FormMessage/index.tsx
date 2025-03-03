import {
    IconSmallClosedCircle as ErrorIcon,
    IconSmallWarningCircle as WarningIcon,
    defaultTheme,
    scale,
} from '@ensi-platform/core-components-common';

import type { FC } from 'react';

import type { FormMessageProps, IMessageIconProps } from './types';

const useMessageColor = (type: FormMessageProps['type']) => {
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

const MessageIcon: FC<IMessageIconProps> = ({ type, ...props }) => {
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
    const { typography } = defaultTheme;

    return (
        <div role="alert" css={{ color, ...typography('bodySm') }} className={className} {...props}>
            <MessageIcon
                type={type}
                css={{ marginRight: scale(1, true), verticalAlign: 'text-bottom', fill: 'currentColor' }}
            />
            {message}
        </div>
    );
};

export default FormMessage;
