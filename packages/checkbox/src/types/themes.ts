import type { BaseThemeState, StyleDefinition, ValueOrFunction } from '@ensi-platform/core-components-common';

import type { CSSObject } from '@emotion/react';

import type { ICheckboxState } from './component';

export enum CheckboxSizeEnum {
    md = 'md',
}

export enum CheckboxVariantEnum {
    primary = 'primary',
}

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
     * Message container with error message and hint
     */
    messageCSS?: CSSObject;
    /**
     * Container with label
     */
    labelCSS?: CSSObject;
    /**
     * Container with hint message
     */
    hintCSS?: CSSObject;
}

export type CheckboxThemeStateType = BaseThemeState<typeof CheckboxVariantEnum, typeof CheckboxSizeEnum> &
    ICheckboxState;

enum CheckboxThemeParts {
    container,
    message,
    label,
    box,
    icon,
    indeterminateLine,
    hint,
}

export type CheckboxThemeType = ValueOrFunction<
    Record<keyof typeof CheckboxThemeParts, StyleDefinition<CheckboxThemeStateType>>,
    [CheckboxThemeStateType]
>;
