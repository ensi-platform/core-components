import type { BaseThemeState, StyleDefinition, ValueOrFunction } from '@ensi-platform/core-components-common';

import type { ITooltipState } from './common';

/**
 * Tooltip variants
 */
const TooltipVariant = {
    primary: 'primary',
} as const;

/**
 * Tooltip sizes
 */
const TooltipSize = {
    md: 'md',
} as const;

/**
 * Tooltip theme state
 */
export type TooltipThemeStateType = BaseThemeState<typeof TooltipVariant, typeof TooltipSize> & ITooltipState;

/**
 * Tooltip theme definition
 */
export type TooltipThemeType = ValueOrFunction<
    {
        content: StyleDefinition<TooltipThemeStateType>;
        target: StyleDefinition<TooltipThemeStateType>;
    },
    [TooltipThemeStateType]
>;
