import type { BaseThemeState } from '@ensi-platform/core-components-common';
import { type IFieldWrapperProps } from '@ensi-platform/core-components-form';

import type { ChangeEventHandler, FormEventHandler, HTMLProps, ReactNode } from 'react';

import type { CheckboxSize, CheckboxTheme, CheckboxVariant, ICheckboxCSS } from './theme';

export type CheckboxValueType = string[] | boolean;

type Align = 'start' | 'center';

/**
 * Interface for basic checkbox component to control it by form wrapper
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
    onChange?: ChangeEventHandler;
}

export interface ICheckboxState {
    /**
     * Manage checkbox checked state (native prop)
     */
    checked?: boolean;

    /**
     * Manage checkbox indeterminate state
     */
    indeterminate?: boolean;

    /**
     * Manage focus(element select) state
     */
    focused?: boolean;

    /**
     * Checkbox horizontal alignment
     */
    align?: Align;

    /**
     * Use 100% of parent width
     */
    block?: boolean;

    /**
     * Is input disabled
     */
    disabled?: boolean;

    /**
     * Field error
     */
    error?: string;
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
        Partial<Omit<BaseThemeState<typeof CheckboxVariant, typeof CheckboxSize, CheckboxTheme>, 'theme'>>,
        ICheckboxState,
        ICheckboxCSS,
        ICheckboxParts {}

/**
 * Interface for checkbox, controlled by Form
 */
export interface IFormCheckboxProps
    extends Omit<ICheckboxWrapperProps, 'children'>,
        Omit<ICheckboxProps, keyof Omit<ICheckboxWrapperProps, 'children'> | keyof ICheckboxWrapperReturn | 'ref'> {}
