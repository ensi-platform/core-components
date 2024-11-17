import type { BaseThemeState, StyleDefinition, ValueOrFunction } from '@ensi-platform/core-components-common';

import type { CSSObject } from '@emotion/react';

import type { ICheckboxState } from './component';

export const CheckboxSize = {
    md: 'md',
} as const;

export const CheckboxVariant = {
    primary: 'primary',
} as const;

export interface ICheckboxCSS {
    /**
     * Доп. класс чекбокса
     */
    boxCSS?: CSSObject;

    /**
     * Доп. класс контента
     */
    contentCSS?: CSSObject;
    hintCSS?: CSSObject;
    css?: CSSObject;
    labelCSS?: CSSObject;
    iconCSS?: CSSObject;
    indeterminateLineCSS?: CSSObject;
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
