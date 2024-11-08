import { type PopupProps } from '@ensi-platform/core-components-popup';

import { type KeyboardEvent, type MouseEvent } from 'react';

import { type ActionEnum, type ThemesEnum } from '../scripts/enums';

export interface IActionPopupProps extends Omit<PopupProps, 'title' | 'onBackdropClick'> {
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
