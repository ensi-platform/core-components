import type { CSSObject } from '@emotion/react';

import type { ReactNode } from 'react';

export interface IPopupHeaderProps {
    /**
     * Content
     */
    children?: ReactNode;

    /**
     * Left addon
     */
    leftAddons?: ReactNode;

    /**
     * Additional header styles
     */
    className?: string;

    /**
     * Additional addon styles
     */
    addonCSS?: CSSObject;

    /**
     * Additional content styles
     */
    contentCSS?: CSSObject;

    /**
     * Title
     */
    title?: string;
}
