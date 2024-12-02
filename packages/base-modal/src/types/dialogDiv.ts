import type { KeyboardEvent, MouseEvent, ReactNode } from 'react';

import type { IBaseModalProps } from './component';

export interface IDialogDivProps extends Pick<IBaseModalProps, 'wrapperCSS'> {
    children: ReactNode;
    handleKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
    handleBackdropMouseDown: (event: MouseEvent<HTMLElement>) => void;
    handleBackdropMouseUp: (event: MouseEvent<HTMLElement>) => void;
    dataTestId?: string;
    id?: string;
    className?: string;
}
