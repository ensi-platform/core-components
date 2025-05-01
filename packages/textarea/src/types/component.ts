import type { IFormFieldComponent } from '@ensi-platform/core-components-form';
import type { TFormControlProps } from '@ensi-platform/core-components-form-control';

import type { CSSObject } from '@emotion/react';

import type { Ref } from 'react';
import type { TextareaAutosizeProps } from 'react-textarea-autosize';

export interface ITextareaBaseProps {
    /**
     * Form control Ref
     */
    wrapperRef?: Ref<HTMLDivElement>;
    /**
     * Form control wrapper css
     */
    wrapperCSS?: CSSObject;
    /**
     * Textarea value
     */
    value: string;
    /**
     * Maximum length of value
     */
    maxLength?: number;
    /**
     * Threshold in percentage of limit
     */
    threshold?: number;
    /**
     * resize flag
     */
    isResize?: boolean;
}

export interface ITextareaFormControlProps extends Omit<TFormControlProps, 'onInput' | 'onInput' | 'children'> {}

export type TTextareaProps = TextareaAutosizeProps & ITextareaFormControlProps & ITextareaBaseProps;

/**
 * Textarea form component props
 */
export type TFormTextareaFieldProps = Omit<TTextareaProps & IFormFieldComponent, 'value' | 'defaultValue' | 'error'>;
