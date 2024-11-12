import {
    IconSmallClosedCircle as ErrorIcon,
    IconSmallWarningCircle as WarningIcon,
    defaultTheme,
    scale,
} from '@ensi-platform/core-components-common';

import { type FC, type HTMLProps, type SVGProps } from 'react';

export interface FormMessageProps extends HTMLProps<HTMLDivElement> {
    /** Error text */
    message: string;
    type?: 'error' | 'warning';
    className?: string;
}

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
