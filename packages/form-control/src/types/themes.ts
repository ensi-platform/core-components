import type { BaseThemeState, StyleDefinition, ValueOrFunction } from '@ensi-platform/core-components-common';

export enum FormControlSizeEnum {
    sm = 'sm',
    md = 'md',
    lg = 'lg',
}

export enum FormControlVariantEnum {
    primary = 'primary',
}

export interface IFormControlState {
    /**
     * Stretches the component to the width of the container
     */
    block?: boolean;

    /**
     * Disabled state
     */
    disabled?: boolean;

    /**
     * Read-only state
     */
    readOnly?: boolean;

    /**
     * Filled state
     */
    filled?: boolean;

    /**
     * Focused state
     */
    focused?: boolean;

    /**
     * Error state
     */
    hasError?: boolean;

    /**
     * Allow label to wrap across lines
     */
    labelWrap?: boolean;

    /**
     * Has left addons
     */
    hasLeftAddons?: boolean;

    /**
     * Has right addons
     */
    hasRightAddons?: boolean;

    /**
     * Label inside the component
     */
    hasInnerLabel?: boolean;

    /**
     * Position of the error relative to the component
     * @default 'above'
     */
    errorPlacement?: 'under' | 'above';
}

export type TFormControlThemeState = BaseThemeState<typeof FormControlVariantEnum, typeof FormControlSizeEnum, never> &
    IFormControlState;

enum FormControlPartsEnum {
    wrapper,
    field,
    label,
    hint,
    control,
    error,
    clear,
}

export type TFormControlTheme = ValueOrFunction<
    Record<keyof typeof FormControlPartsEnum, StyleDefinition<TFormControlThemeState>> & {
        addons: StyleDefinition<TFormControlThemeState & { isLeft: boolean }>;
    },
    [TFormControlThemeState]
>;
