import type { BaseThemeState } from '@ensi-platform/core-components-common';
import { type IFieldWrapperProps } from '@ensi-platform/core-components-form';

import type { ChangeEventHandler, FormEventHandler, HTMLProps, ReactNode } from 'react';

import type { CheckboxSize, CheckboxTheme, CheckboxVariant, ICheckboxCSS } from './theme';

export type CheckboxValueType = string[] | boolean;

type Align = 'start' | 'center';

export interface ICheckboxWrapperReturn {
    id: string;
    checked: boolean;
    onChange: FormEventHandler<HTMLInputElement>;
    error?: string;
}

export interface ICheckboxWrapperProps extends Partial<IFieldWrapperProps<CheckboxValueType>> {
    value?: string;
    children: (params: ICheckboxWrapperReturn) => ReactNode;
    onChange?: ChangeEventHandler;
}

export interface ICheckboxState {
    /**
     * Control indeterminate checkbox state
     */
    indeterminate?: boolean;
    /**
     * Control checkbox on/off state (native prop)
     */
    checked?: boolean;
    /**
     * Stretch component to it's full width
     */
    block?: boolean;
    /**
     * Выравнивание
     */
    align?: Align;
    /**
     * Is input focused
     */
    focused?: boolean;
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
     *
     */
    hint?: ReactNode;
}

export interface ICheckboxProps
    extends Omit<HTMLProps<HTMLInputElement>, 'size' | 'css'>,
        Partial<Omit<BaseThemeState<typeof CheckboxVariant, typeof CheckboxSize, CheckboxTheme>, 'theme'>>,
        ICheckboxState,
        ICheckboxCSS,
        ICheckboxParts {}

export interface IFormCheckboxProps
    extends Omit<ICheckboxWrapperProps, 'children'>,
        Omit<ICheckboxProps, keyof Omit<ICheckboxWrapperProps, 'children'> | keyof ICheckboxWrapperReturn | 'ref'> {}
