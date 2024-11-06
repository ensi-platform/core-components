import { CSSObject } from '@emotion/react';
import { FieldInputProps, FieldMetaProps } from 'formik';
import { HTMLProps, ReactNode, Ref } from 'react';
import { FormControlProps } from '@ensi-platform/core-components-form-control';

interface ITextareaInputProps {
    size?: FormControlProps['size'];
    /** Maximum length of value */
    maxLength?: number;
    /** Threshold in percentage of limit */
    threshold?: number;

    block?: boolean;

    /** resize flag */
    isResize?: boolean;
    /**
     * Лейбл компонента
     */
    label?: ReactNode;
    /**
     * Слот под инпутом
     */
    bottomAddons?: ReactNode;

    labelWrap?: FormControlProps['labelWrap'];
    /**
     * Отображение ошибки
     */
    error?: ReactNode | boolean;
    /**
     * Текст подсказки
     */
    hint?: ReactNode;
    /**
     * Дополнительный класс
     */
    className?: string;
    /**
     * Дополнительный стиль поля ввода
     */
    textAreaCSS?: CSSObject;
    /**
     * Дополнительный стиль для лейбла
     */
    labelCSS?: CSSObject;
    /**
     * Дополнительный стиль для аддонов
     */
    leftAddonsCSS?: CSSObject;
    rightAddonsCSS?: CSSObject;
    /**
     * Слот слева
     */
    leftAddons?: ReactNode;
    /**
     * Слот справа
     */
    rightAddons?: ReactNode;
    /**
     * Ref для обертки TextArea
     */
    wrapperRef?: Ref<HTMLDivElement>;
    /**
     * Флаг отображения ошибки
     */
    showError?: boolean;
    /**
     * Дополнительный стиль для поля
     */
    fieldCSS?: CSSObject;
    /**
     * Дополнительный стиль для обертки
     */
    wrapperCSS?: CSSObject;
}

interface ITextareaFieldProps {
    /** Input name (inner) */
    name?: string;
    /**
     * Значение поля ввода
     */
    value?: string;
    /** field object (inner) */
    field?: FieldInputProps<string>;
    /** meta object (inner) */
    meta?: FieldMetaProps<any>;
}

export interface ITextareaProps
    extends Omit<HTMLProps<HTMLDivElement>, 'ref' | 'size' | 'value' | 'label'>,
        ITextareaInputProps,
        ITextareaFieldProps {
    /** Minimum number of visible rows */
    minRows?: number;
    /** Maximum number of visible rows */
    maxRows?: number;
    /**
     * Function invoked on textarea height change, accepting height as the first argument
     * and an object with optional additional information as the second argument.
     */
    onHeightChange?: (height: number, options?: { rowHeight?: number }) => void;
    /**
     * Reuse previously computed measurements when computing height of textarea.
     * Default: false
     */
    cacheMeasurements?: boolean;
}
