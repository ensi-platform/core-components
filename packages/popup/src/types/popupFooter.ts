import type { LayoutProps } from '@ensi-platform/core-components-common';

import type { ReactNode } from 'react';

export interface IPopupFooterProps extends Omit<LayoutProps, 'children'> {
    /**
     * Content
     */
    children?: ReactNode;

    /**
     * Additional footer styles
     */
    className?: string;
}
