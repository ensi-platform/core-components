import type { BaseThemeState, StyleDefinition, ValueOrFunction } from '@ensi-platform/core-components-common';

import type { CSSObject } from '@emotion/react';

import type { ICheckboxState } from './component';

export const CheckboxSize = {
    md: 'md',
} as const;

export const CheckboxVariant = {
    primary: 'primary',
} as const;

/**
 * Interface of additional classes for checkbox
 */
export interface ICheckboxCSS {
    /**
     * Root container
     */
    css?: CSSObject;
    /**
     * Container with check icon
     */
    boxCSS?: CSSObject;
    /**
     * Icon
     */
    iconCSS?: CSSObject;
    /**
     * Container for indeterminate state style
     */
    indeterminateLineCSS?: CSSObject;
    /**
     * Container with label, error message and hint
     */
    contentCSS?: CSSObject;
    /**
     * Container with label
     */
    labelCSS?: CSSObject;
    /**
     * Container with hint message
     */
    hintCSS?: CSSObject;
}

export type CheckboxThemeState = BaseThemeState<typeof CheckboxVariant, typeof CheckboxSize> & ICheckboxState;

export type CheckboxTheme = ValueOrFunction<
    {
        container: StyleDefinition<CheckboxThemeState>;
        content: StyleDefinition<CheckboxThemeState>;
        box: StyleDefinition<CheckboxThemeState>;
        icon: StyleDefinition<CheckboxThemeState>;
        indeterminateLine: StyleDefinition<CheckboxThemeState>;
        hint: StyleDefinition<CheckboxThemeState>;
    },
    [CheckboxThemeState]
>;
