import { CSSObject } from '@emotion/core';

import { BaseModalProps } from '@components/BaseModal';

export type DrawerProps = Omit<BaseModalProps, 'container'> & {
    /**
     * Край экрана, с которого может появиться Drawer.
     * @default "right"
     */
    placement?: 'left' | 'right';

    /**
     * Стили для контента
     */
    contentCss?: CSSObject;
    /**
     * Время анимации открытия/закрытия
     */
    timeout?: number;
};
