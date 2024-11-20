import type { IBaseModalProps } from '@ensi-platform/core-components-base-modal';
import type { BaseThemeState } from '@ensi-platform/core-components-common';

import type { ReactNode } from 'react';

import type { PopupSizesEnum, PopupVariantsEnum } from '../scripts';
import type { PopupThemeType } from './theme';

export type View = 'desktop' | 'mobile';
export type Align = 'left' | 'center' | 'right';

export interface IPopupState {
    /**
     * Растягивает контент на всю высоту
     */
    flex?: boolean;

    /**
     * Скроллбар в контенте вместо компонента
     */
    innerScroll?: boolean;

    /**
     * Фиксирует футер
     */
    stickyFooter?: boolean;

    /**
     * Фиксирует шапку
     */
    stickyHeader?: boolean;

    /**
     * Выравнивание заголовка
     */
    align?: Align;

    /**
     * Наличие компонента крестика
     */
    hasCloser?: ReactNode;

    /**
     * Обрезать ли заголовок
     */
    trim?: boolean;

    /**
     * Мобильный или десктопный вид
     */
    view?: View;

    /**
     * Фиксирует позицию модального окна после открытия,
     * предотвращая скачки, если контент внутри будет меняться
     */
    fixedPosition?: boolean;

    offset?: number;
    hasContent?: boolean;
    highlighted?: boolean;

    /**
     * Отображение на весь экран контента
     */
    isFullscreen?: boolean;
}

export interface IPopupProps
    extends BaseThemeState<typeof PopupVariantsEnum, typeof PopupSizesEnum, PopupThemeType>,
        IPopupState,
        IBaseModalProps {
    children?: ReactNode;
    className?: string;
}

export interface IModalDesktopProps extends IPopupProps {
    /**
     * Ширина модального окна
     * @default "md"
     */
    size?: PopupSizesEnum | keyof typeof PopupSizesEnum;
}

export interface IModalMobileProps extends Omit<IModalDesktopProps, 'size' | 'fixedPosition'> {}

export interface IModalResponsiveProps extends IModalDesktopProps {
    /**
     * Контрольная точка, с нее начинается desktop версия
     * @default 1024
     */
    breakpoint?: number;
}
