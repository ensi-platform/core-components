import type { IBackdropProps } from '@ensi-platform/core-components-backdrop';
import type { IPortalProps } from '@ensi-platform/core-components-portal';

import type { CSSObject } from '@emotion/react';

import type { FC, KeyboardEvent, MouseEvent, MutableRefObject, ReactNode } from 'react';
import type { TransitionStatus } from 'react-transition-state';

import type { ClosureReasonsEmum } from '../scripts';

export type ClosureReasonsType = `${ClosureReasonsEmum}`;

export interface IBaseModalProps {
    /**
     * BaseModal content
     */
    children?: ReactNode;

    /**
     * BaseModal backdrop
     */
    Backdrop?: FC<IBackdropProps>;

    /**
     * Props for BaseModal backdrop
     */
    backdropProps?: Partial<IBackdropProps> & Record<string, unknown>;

    /**
     * Нода, компонент или функция возвращающая их
     *
     * Контейнер к которому будут добавляться порталы
     */
    container?: IPortalProps['container'];

    /**
     * Отключает автоматический перевод фокуса на модалку при открытии
     * @default false
     */
    disableAutoFocus?: boolean;

    /**
     * Отключает ловушку фокуса
     * @default false
     */
    disableFocusLock?: boolean;

    /**
     * Отключает восстановление фокуса на предыдущем элементе после закрытия модалки
     * @default false
     */
    disableRestoreFocus?: boolean;

    /**
     * Отключает вызов `callback` при нажатии Escape
     * @default false
     */
    disableEscapeKeyDown?: boolean;

    /**
     * Отключает вызов `callback` при клике на бэкдроп
     * @default false
     */
    disableBackdropClick?: boolean;

    /**
     * Отключает блокировку скролла при открытии модального окна
     * @default false
     */
    disableBlockingScroll?: boolean;

    /**
     * Содержимое модалки всегда в DOM
     * @default false
     */
    keepMounted?: boolean;

    /**
     * Управление видимостью модалки
     */
    open: boolean;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Дополнительный стиль контента
     */
    contentCSS?: CSSObject;

    /**
     * Дополнительный стиль для обертки (Modal)
     */
    wrapperCSS?: CSSObject;

    /**
     * Обработчик скролла контента
     */
    scrollHandler?: 'wrapper' | 'content' | MutableRefObject<HTMLDivElement | null>;

    /**
     * Обработчик события нажатия на бэкдроп
     */
    onBackdropClick?: (event: MouseEvent) => void;

    /**
     * Обработчик события нажатия на Escape
     *
     * Если `disableEscapeKeyDown` - false и модальное окно в фокусе
     */
    onEscapeKeyDown?: (event: KeyboardEvent) => void;

    /**
     * Обработчик закрытия
     */
    onClose?: (event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>, reason?: ClosureReasonsType) => void;

    /**
     * Обработчик события onEntered компонента Transition
     */
    onMount?: () => void;

    /**
     * Обработчик события onExited компонента Transition
     */
    onUnmount?: () => void;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * z-index компонента
     */
    zIndex?: number;

    /**
     * Реф, который должен быть установлен компонентной области
     */
    componentRef?: MutableRefObject<HTMLDivElement | null>;

    /**
     * Animation time
     * @default 200
     */
    timeout?: number;

    /**
     * Набор стилей для разных состояний (открытие, закрытие)
     */
    transitionStyles?: Partial<Record<TransitionStatus, CSSObject>>;

    /**
     * ID для родительского элемента
     */
    id?: string;
}
