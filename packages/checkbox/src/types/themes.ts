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

export type CheckboxThemeStateType = BaseThemeState<typeof CheckboxVariant, typeof CheckboxSize> & ICheckboxState;

enum CheckboxThemeParts {
    container,
    content,
    box,
    icon,
    indeterminateLine,
    hint,
}

export type CheckboxThemeType = ValueOrFunction<
    Record<keyof typeof CheckboxThemeParts, StyleDefinition<CheckboxThemeStateType>>,
    [CheckboxThemeStateType]
>;
