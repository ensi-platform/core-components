import type { BaseThemeState, useThemeCSSPart } from '@ensi-platform/core-components-common';

import type { ReactNode } from 'react';

import type { DrawerSizesEnum, DrawerVariantsEnum } from '../scripts';
import type { DrawerStateFullType, DrawerThemeType, IDrawerState } from './index';

type getCSSType = ReturnType<typeof useThemeCSSPart<DrawerStateFullType, DrawerThemeType>>;

export interface IContext
    extends Required<BaseThemeState<typeof DrawerVariantsEnum, typeof DrawerSizesEnum, DrawerThemeType>> {
    state: IDrawerState;
    getCSS: getCSSType;
}

export interface IContextProps extends Omit<IContext, 'getCSS'> {
    children: ReactNode;
}
