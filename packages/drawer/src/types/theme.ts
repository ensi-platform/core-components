import type { BaseThemeState, StyleDefinition, ValueOrFunction } from '@ensi-platform/core-components-common';

import type { DrawerSizesEnum, DrawerVariantsEnum } from '../scripts';
import type { IDrawerState } from './component';

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
