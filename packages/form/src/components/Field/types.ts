import type { InputProps } from '@ensi-platform/core-components-input';

import type { CSSObject } from '@emotion/react';

import type { ReactNode } from 'react';

export interface FieldProps<T> {
    field?: {
        value: T;
        onChange: (
            eventOrValue:
                | {
                      target: {
                          value: T;
                      };
                  }
                | T
        ) => void;
    };
    meta?: {
        error?: string;
    };
}

export interface FormFieldProps extends Omit<InputProps, 'size' | 'label'> {
    size?: InputProps['size'];
    /** Name of field */
    name: string;
    /** Label for FormControl */
    label?: string | ReactNode;
    /** class name */
    className?: string;

    wrapperCSS?: CSSObject;
    /**
     * Флаг отображения ошибки
     */
    showError?: boolean;
}
