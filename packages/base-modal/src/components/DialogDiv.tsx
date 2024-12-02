/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { forwardRef } from 'react';

import { componentDivCSS } from '../scripts';
import type { IDialogDivProps } from '../types';

const DialogDiv = forwardRef<HTMLDivElement, IDialogDivProps>(
    ({ children, handleKeyDown, handleBackdropMouseDown, handleBackdropMouseUp, dataTestId, id, className }, ref) => (
        <div
            role="dialog"
            ref={ref}
            css={componentDivCSS}
            className={className}
            onKeyDown={handleKeyDown}
            onMouseDown={handleBackdropMouseDown}
            onMouseUp={handleBackdropMouseUp}
            data-test-id={dataTestId}
            tabIndex={0}
            id={id}
        >
            {children}
        </div>
    )
);

export default DialogDiv;
