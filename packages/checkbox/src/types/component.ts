import type { BaseThemeState } from '@ensi-platform/core-components-common';
import { type IFieldWrapperProps } from '@ensi-platform/core-components-form';

import type { ChangeEventHandler, FormEventHandler, HTMLProps, ReactNode } from 'react';
import type { checkboxThemes } from 'src/themes';

import type { CheckboxSizeEnum, CheckboxThemeType, CheckboxVariantEnum, ICheckboxCSS } from './themes';

export type CheckboxValueType = string[] | boolean;

type Align = 'start' | 'center';

/**
 * Interface for basic checkbox component to control it by FormWrapper
 */
export interface ICheckboxWrapperReturn {
    id: string;
    error?: string;
    checked: boolean;
    onChange: FormEventHandler<HTMLInputElement>;
}

/**
 * Interface of wrapper for controlling checkbox by RHF
 */
export interface ICheckboxWrapperProps extends Partial<IFieldWrapperProps<CheckboxValueType>> {
    value?: string;
    children: (params: ICheckboxWrapperReturn) => ReactNode;
    onChange?: ChangeEventHandler<HTMLInputElement>;
}

export interface ICheckboxState {
    /**
     * Manage checkbox checked state (native prop)
     * @default false
     */
    checked?: boolean;

    /**
     * Manage checkbox indeterminate state
     * @default false
     */
    indeterminate?: boolean;

    /**
     * Checkbox vertical alignment relative to its label. Available values:
     * * `start` align-items: flex-start;
     * * `center` align-items: center;
     * @default 'start'
     */
    align?: Align;

    /**
     * Use 100% of parent width
     * @default false
     */
    block?: boolean;

    /**
     * Manage focus(element select) state
     * @default false
     */
    focused?: boolean;

    /**
     * Is input disabled
     * @default false
     */
    disabled?: boolean;

    /**
     * Checkbox label
     */
    label?: string;

    /**
     * Field error
     */
    error?: string;

    /**
     * Hide error message
     * @default false
     */
    hideError?: boolean;
}

interface ICheckboxParts {
    /**
     * Text of the hint at the bottom of field
     */
    hint?: ReactNode;
}

/**
 * Interface for common checkbox props
 */
export interface ICheckboxProps
    extends Omit<HTMLProps<HTMLInputElement>, 'size' | 'css'>,
        Partial<Omit<BaseThemeState<typeof CheckboxVariantEnum, typeof CheckboxSizeEnum, CheckboxThemeType>, 'theme'>>,
        ICheckboxState,
        ICheckboxCSS,
        ICheckboxParts {
    theme?: CheckboxThemeType | keyof typeof checkboxThemes;
}

/**
 * Interface for checkbox, controlled by Form
 */
export interface IFormCheckboxProps
    extends Omit<ICheckboxWrapperProps, 'children'>,
        Omit<ICheckboxProps, keyof Omit<ICheckboxWrapperProps, 'children'> | keyof ICheckboxWrapperReturn | 'ref'> {}
