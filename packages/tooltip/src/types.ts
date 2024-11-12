import type { BaseThemeState, StyleDefinition, ValueOrFunction } from '@ensi-platform/core-components-common';
import type { PopoverProps, Position } from '@ensi-platform/core-components-popover';

import type { CSSObject } from '@emotion/react';

import type { MutableRefObject, ReactElement, ReactNode } from 'react';

export type Trigger = 'click' | 'hover';

export interface TooltipState {
    /**
     * Вид тултипа
     */
    view?: 'tooltip' | 'hint';

    /**
     * Тэг для target обертки
     * @default div
     */
    targetTag?: 'div' | 'span';
}

const TooltipVariant = {
    primary: 'primary',
} as const;

const TooltipSize = {
    md: 'md',
} as const;

export type TooltipThemeState = BaseThemeState<typeof TooltipVariant, typeof TooltipSize> & TooltipState;

export type TooltipTheme = ValueOrFunction<
    {
        content: StyleDefinition<TooltipThemeState>;
        target: StyleDefinition<TooltipThemeState>;
    },
    [TooltipThemeState]
>;

export type TooltipProps = TooltipState & {
    /**
     * Контент тултипа
     */
    content: ReactNode;

    /**
     * Позиционирование тултипа
     */
    position?: Position;

    /**
     * Задержка перед открытием тултипа
     */
    onOpenDelay?: number;

    /**
     * Задержка перед закрытием тултипа
     */
    onCloseDelay?: number;

    /**
     * Обработчик открытия тултипа
     */
    onOpen?: () => void;

    /**
     * Обработчик закрытия тултипа
     */
    onClose?: () => void;

    /**
     * Событие, по которому происходит открытие тултипа
     */
    trigger?: Trigger;

    /**
     * Если `true`, то тултип будет открыт
     */
    open?: boolean;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Дочерние элементы тултипа.
     * При срабатывании событий на них, тултип будет открываться
     */
    children: ReactElement;

    /**
     * Смещение тултипа
     */
    offset?: [number, number];

    /**
     * Функция, возвращающая контейнер, в который будет рендериться тултип
     */
    getPortalContainer?: () => HTMLElement;

    /**
     * Дополнительный стиль для стрелочки
     */
    arrowCSS?: CSSObject;

    /**
     * Дополнительный стиль для контента
     */
    contentCSS?: CSSObject;

    /**
     * Дополнительный класс для поповера
     */
    className?: string;

    /**
     * Дополнительный стиль для обертки над дочерними элементами
     */
    targetCSS?: CSSObject;

    /**
     * Хранит функцию, с помощью которой можно обновить положение компонента
     */
    updatePopover?: PopoverProps['update'];

    /**
     * z-index компонента
     */
    zIndex?: number;

    /**
     * Реф для обертки над дочерними элементами
     */
    targetRef?: MutableRefObject<HTMLElement | null>;

    /**
     * Если тултип не помещается в переданной позиции (position), он попробует открыться в другой позиции,
     * по очереди для каждой позиции из этого списка.
     * Если не передавать, то тултип открывается в противоположном направлении от переданного position.
     */
    fallbackPlacements?: PopoverProps['fallbackPlacements'];

    /**
     * Запрещает тултипу менять свою позицию, если он не влезает в видимую область.
     */
    preventOverflow?: PopoverProps['preventOverflow'];

    /**
     *  Позволяет тултипу подствраивать свою высоту под границы экрана, если из-за величины контента он выходит за рамки видимой области экрана
     */
    availableHeight?: PopoverProps['availableHeight'];

    /**
     *  Элемент, относительно которого будет позиционировать тултип.
     */
    anchor?: PopoverProps['anchorElement'];

    /**
     * Использовать ширину родительского элемента
     */
    useAnchorWidth?: boolean;

    /**
     * Тема
     */
    theme?: TooltipTheme;
};
