import { CSSObject } from '@emotion/react';

import { BaseModalProps } from '@greensight/core-components-base-modal';
import { BaseThemeState, StyleDefinition, ValueOrFunction } from '@greensight/core-components-common';

export interface DrawerState {
    /**
     * Край экрана, с которого может появиться Drawer.
     * @default "right"
     */
    placement?: 'left' | 'right';
}

export const DrawerVariant = {
    primary: 'primary',
} as const;

export const DrawerSize = {
    md: 'md',
} as const;

export type DrawerThemeState = BaseThemeState<typeof DrawerVariant, typeof DrawerSize> & DrawerState;

export type DrawerTheme = ValueOrFunction<
    {
        component: StyleDefinition<DrawerThemeState>;
        header: StyleDefinition<DrawerThemeState & { hasCloser?: boolean }>;
        closer: StyleDefinition<DrawerThemeState>;

        content: StyleDefinition<DrawerThemeState>;
        footer: StyleDefinition<DrawerThemeState>;
    },
    [DrawerThemeState]
>;

export type DrawerProps = Partial<DrawerState> &
    Partial<Omit<BaseThemeState<typeof DrawerVariant, typeof DrawerSize, DrawerTheme>, 'theme'>> &
    Omit<BaseModalProps, 'container'> & {
        /**
         * Стили для контента
         */
        contentCss?: CSSObject;

        /**
         * Время анимации открытия/закрытия
         */
        timeout?: number;

        /**
         * Объект настроек темы
         */
        theme?: DrawerTheme;
    };
