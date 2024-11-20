import type { IBaseModalProps } from '@ensi-platform/core-components-base-modal';
import type { BaseThemeState, StyleDefinition, ValueOrFunction } from '@ensi-platform/core-components-common';

import type { CSSObject } from '@emotion/react';

import type { DrawerSizesEnum, DrawerVariantsEnum } from '../scripts';

export interface IDrawerState {
    /**
     * position of the Drawer on the screen
     * @default "right"
     */
    placement?: 'left' | 'right';
}

export type DrawerStateFullType = BaseThemeState<typeof DrawerVariantsEnum, typeof DrawerSizesEnum> & IDrawerState;

export type DrawerThemeType = ValueOrFunction<
    {
        component: StyleDefinition<DrawerStateFullType>;
        header: StyleDefinition<DrawerStateFullType & { hasCloser?: boolean }>;
        closer: StyleDefinition<DrawerStateFullType>;

        content: StyleDefinition<DrawerStateFullType>;
        footer: StyleDefinition<DrawerStateFullType>;
    },
    [DrawerStateFullType]
>;

export interface IDrawerProps
    extends Partial<IDrawerState>,
        Partial<Omit<BaseThemeState<typeof DrawerVariantsEnum, typeof DrawerSizesEnum, DrawerThemeType>, 'theme'>>,
        Omit<IBaseModalProps, 'container'> {
    /**
     * Styles for Drawer content
     */
    contentCSS?: CSSObject;

    /**
     * Animation time
     * @default 200
     */
    timeout?: number;

    /**
     * Drawer GDS theme
     */
    theme?: DrawerThemeType;
}
