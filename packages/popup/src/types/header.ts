import type { CSSObject } from '@emotion/react';

import type { ReactNode } from 'react';

export interface IHeaderProps {
    /**
     * Контент шапки
     */
    children?: ReactNode;

    /**
     * Слот слева
     */
    leftAddons?: ReactNode;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Дополнительный стиль для аддонов
     */
    addonCSS?: CSSObject;

    /**
     * Дополнительный стиль для контента
     */
    contentCSS?: CSSObject;

    /**
     * Заголовок шапки
     */
    title?: string;
}
