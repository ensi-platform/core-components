import { type IFieldWrapperProps } from '@ensi-platform/core-components-form';

import type { ChangeEventHandler, FormEventHandler, ReactNode } from 'react';

export type RadioValueType = string | string[];

export interface IFormRadioWrapperReturn {
    id: string;
    error?: string;
    checked: boolean;
    value: string;
    onChange: FormEventHandler<HTMLInputElement>;
}

export interface IFormRadioWrapperProps extends Partial<IFieldWrapperProps<RadioValueType>> {
    value?: string;
    children: (params: IFormRadioWrapperReturn) => ReactNode;
    onChange?: ChangeEventHandler;
}
