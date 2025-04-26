import { IconSmallClosedCircle as ErrorIcon, defaultTheme, scale } from '@ensi-platform/core-components-common';

import type { FC } from 'react';

import type { IFormControlErrorProps } from './types';

export const FormControlError: FC<IFormControlErrorProps> = ({ children, className, ...props }) => {
    const { colors } = defaultTheme;
    const { typography } = defaultTheme;

    return (
        <div role="alert" css={{ color: colors?.danger, ...typography('bodySm') }} className={className} {...props}>
            <ErrorIcon css={{ marginRight: scale(1, true), verticalAlign: 'text-bottom', fill: 'currentColor' }} />
            {children}
        </div>
    );
};

export default FormControlError;
