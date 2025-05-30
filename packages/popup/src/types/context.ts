import type { BaseThemeState, useThemeCSSPart } from '@ensi-platform/core-components-common';

import type { ReactNode } from 'react';

import type { PopupSizesEnum, PopupVariantsEnum } from '../scripts';
import type { IPopupState } from './component';
import type { PopupStateFullType, PopupThemeType } from './theme';

type getCSSType = ReturnType<typeof useThemeCSSPart<PopupStateFullType, PopupThemeType>>;

export interface IContext
    extends Omit<Required<BaseThemeState<typeof PopupVariantsEnum, typeof PopupSizesEnum>>, 'theme'> {
    getCSS: getCSSType;
    state: IPopupState;
}

export interface IContextProps extends IContext {
    children?: ReactNode;
}
