import type { IPopupProps } from '@ensi-platform/core-components-popup';

import type { KeyboardEvent, MouseEvent } from 'react';

import type { ActionEnum, ThemesEnum } from '../scripts/enums';

export interface IActionPopupProps extends Omit<IPopupProps, 'title' | 'onBackdropClick'> {
    action?: ActionEnum;
    title?: string;
    leftAddonIconTheme?: `${ThemesEnum}`;
    onAction?: () => void;
    disableAction?: boolean;
    disableClose?: boolean;
    disableFooter?: boolean;
    blockButtons?: boolean;
    onBackdropClick?: (
        event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>,
        reason?: 'backdropClick' | 'escapeKeyDown' | 'closerClick'
    ) => void;
}
