/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import type { CSSObject } from '@emotion/react';

import { forwardRef } from 'react';

import type { IDialogDivProps } from '../types';

const dialogDivCSS: CSSObject = {
    position: 'fixed',
    inset: 0,
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    outline: 0,
};

const DialogDiv = forwardRef<HTMLDivElement, IDialogDivProps>(
    ({ children, dataTestId, id, className, ...props }, ref) => (
        <div
            role="dialog"
            ref={ref}
            css={dialogDivCSS}
            className={className}
            data-test-id={dataTestId}
            tabIndex={0}
            id={id}
            {...props}
        >
            {children}
        </div>
    )
);

export default DialogDiv;
