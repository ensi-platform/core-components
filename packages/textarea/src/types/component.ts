import type { IFormFieldComponent } from '@ensi-platform/core-components-form';
import type { IFormControlExtendsProps } from '@ensi-platform/core-components-form-control';

import type { TextareaAutosizeProps } from 'react-textarea-autosize';

export interface ITextareaBaseProps {
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

export interface ITextareaFormControlProps extends IFormControlExtendsProps {}

export type TTextareaProps = TextareaAutosizeProps & ITextareaFormControlProps & ITextareaBaseProps;

/**
 * Textarea form component props
 */
export type TFormTextareaFieldProps = Omit<TTextareaProps & IFormFieldComponent, 'value' | 'defaultValue' | 'error'>;
