import type { IBaseModalProps } from '@ensi-platform/core-components-base-modal';
import type { BaseThemeState } from '@ensi-platform/core-components-common';

import type { CSSObject } from '@emotion/react';

import type { DrawerSizesEnum, DrawerVariantsEnum } from '../scripts';
import type { DrawerThemeType } from './theme';

export interface IDrawerState {
    /**
     * position of the Drawer on the screen
     * @default "right"
     */
    placement?: 'left' | 'right';
}

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
