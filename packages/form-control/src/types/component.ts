import type { CSSObject } from '@emotion/react';
import type { BaseThemeState } from '@greensight/gds';

import type { HTMLAttributes, ReactNode } from 'react';

import type { formControlThemes } from '../themes';
import type { FormControlSizeEnum, FormControlVariantEnum, IFormControlState, TFormControlTheme } from './themes';

export type TPartComponentNode = ReactNode;
export type TPartObjComponent = {
    Component: TPartComponentNode;
    css?: CSSObject;
    className?: string;
};
export type TPartComponent<T = {}> = TPartComponentNode | (TPartObjComponent & T);

export type THintProps = TPartComponent;
export type TAddonsProps = TPartComponent;
export type TBottomAddonsProps = TPartComponentNode;

export type TLabelAdditionalProps = { props?: Omit<HTMLAttributes<HTMLLabelElement>, 'className'> };
export type TLabelProps = TPartComponent<TLabelAdditionalProps>;

export type TErrorAdditionalProps = { visible?: boolean; placement: IFormControlState['errorPlacement'] };
export type TErrorProps = TPartComponent<TErrorAdditionalProps>;

export interface IFormControlParts {
    /**
     * Hint text
     */
    hint?: THintProps;

    /**
     * Component label
     */
    label?: TLabelProps;
    /**
     * Slot on the left
     */
    leftAddons?: TAddonsProps;

    /**
     * Slot on the right
     */
    rightAddons?: TAddonsProps;

    /**
     * Slot on the bottom
     */
    bottomAddons?: TBottomAddonsProps;
    /**
     * Error text
     */
    error?: TErrorProps;
}

export interface IFormControlCSS {
    /**
     * Wrapper class
     */
    className?: string;

    /**
     * Styles for field
     */
    fieldCSS?: CSSObject;

    /**
     * Styles for control wrapper
     */
    controlWrapperCSS?: CSSObject;
}

type TFormControlComponentTheme = Partial<
    Omit<BaseThemeState<typeof FormControlVariantEnum, typeof FormControlSizeEnum, TFormControlTheme>, 'theme'>
> & {
    theme?: TFormControlTheme | keyof typeof formControlThemes;
};

type TFormControlStateProps = Partial<
    Omit<IFormControlState, 'hasInnerLabel' | 'hasError' | 'hasRightAddons' | 'hasLeftAddons' | 'errorPlacement'>
>;

export type TFormControlProps = TFormControlComponentTheme &
    TFormControlStateProps &
    IFormControlParts &
    IFormControlCSS &
    HTMLAttributes<HTMLDivElement> & {
        /**
         * ID of the element to which the label refers
         */
        htmlFor?: string;

        /**
         * Field component (input, textarea, etc.)
         */
        children?: ReactNode;
    };
