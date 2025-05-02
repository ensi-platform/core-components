import type { IFormControlExtendsProps, TFormControlProps } from '@ensi-platform/core-components-form-control';

import type { CSSObject } from '@emotion/react';

import type { ChangeEvent, InputHTMLAttributes, MouseEvent } from 'react';

export interface IInputNativeProps
    extends Omit<
        InputHTMLAttributes<HTMLInputElement>,
        'size' | 'type' | 'value' | 'defaultValue' | 'onChange' | 'onClick' | 'onMouseDown' | 'enterKeyHint'
    > {}

export interface IInputFormControlProps extends IFormControlExtendsProps {}

export interface IInputBaseProps {
    /**
     * Input value
     */
    value?: string;

    /**
     * Default input value
     */
    defaultValue?: string;

    /**
     * Clear state
     */
    clear?: boolean;

    /**
     * Input type
     */
    type?:
        | 'number'
        | 'card'
        | 'email'
        | 'money'
        | 'password'
        | 'tel'
        | 'text'
        | 'time'
        | 'color'
        | 'url'
        | 'datetime-local'
        | 'date'
        | 'link';

    /**
     * Form control class
     */
    className?: string;

    /**
     * Max number of characters
     */
    maxLength?: number;

    /**
     * input class
     */
    inputClassName?: string;
    /**
     * input css
     */
    inputCSS?: CSSObject;
    /**
     * Input handler
     */
    onInput?: (event: ChangeEvent<HTMLInputElement>, payload: { value: string }) => void;

    /**
     * Change handler
     */
    onChange?: (event: ChangeEvent<HTMLInputElement>, payload: { value: string }) => void;

    /**
     * Clear handler
     */
    onClear?: (event: MouseEvent<HTMLButtonElement>) => void;

    /**
     * Mouse down handler
     */
    onMouseDown?: (event: MouseEvent<HTMLDivElement>) => void;

    /**
     * Mouse up handler
     */
    onMouseUp?: (event: MouseEvent<HTMLDivElement>) => void;
}

export type TInputProps = Omit<TFormControlProps & IInputNativeProps & IInputFormControlProps, keyof IInputBaseProps> &
    IInputBaseProps;
