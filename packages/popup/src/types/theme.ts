import type { BaseThemeState, StyleDefinition, ValueOrFunction } from '@ensi-platform/core-components-common';

import type { PopupSizesEnum, PopupThemePartsEnum, PopupVariantsEnum } from '../scripts';
import type { IPopupState } from './component';

export type PopupStateFullType = BaseThemeState<typeof PopupVariantsEnum, typeof PopupSizesEnum> & IPopupState;

export type PopupThemeType = ValueOrFunction<
    Record<keyof typeof PopupThemePartsEnum, StyleDefinition<PopupStateFullType>>,
    [PopupStateFullType]
>;
