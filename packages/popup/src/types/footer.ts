import type { LayoutProps } from '@ensi-platform/core-components-common';

import type { ReactNode } from 'react';

export interface IFooterProps extends Omit<LayoutProps, 'children'> {
    /**
     * Контент футера
     */
    children?: ReactNode;

    /**
     * Дополнительный класс
     */
    className?: string;
}
