import type { BaseThemeState, StyleDefinition, ValueOrFunction } from '@ensi-platform/core-components-common';

import type { PopupSizesEnum, PopupVariantsEnum } from '../scripts';
import type { IPopupState } from './component';

export type PopupStateFullType = BaseThemeState<typeof PopupVariantsEnum, typeof PopupSizesEnum> & IPopupState;

export type PopupThemeType = ValueOrFunction<
    {
        wrapper: StyleDefinition<PopupStateFullType>;
        component: StyleDefinition<PopupStateFullType>;
        header: StyleDefinition<PopupStateFullType>;
        headerContent: StyleDefinition<PopupStateFullType>;
        headerCloser: StyleDefinition<PopupStateFullType>;
        headerTitle: StyleDefinition<PopupStateFullType>;
        content: StyleDefinition<PopupStateFullType>;
        footer: StyleDefinition<PopupStateFullType>;
    },
    [PopupStateFullType]
>;
