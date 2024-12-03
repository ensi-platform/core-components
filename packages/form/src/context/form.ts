'use client';

import type { IFormProps } from '@ensi-platform/core-components-form';

import { createContext, useContext } from 'react';
import type { FieldValues, NativeFieldValue } from 'react-hook-form';

export interface IFormContextProps<T extends FieldValues> {
    onChange: (key: string, value?: NativeFieldValue) => void;
    onSubmit: IFormProps<T>['onSubmit'];
    disabled?: boolean;
}

export const FormContext = createContext<IFormContextProps<any> | undefined>(undefined);

export const useForm = <T extends FieldValues>(): IFormContextProps<T> => {
    const context = useContext(FormContext);

    if (!context) {
        throw new Error('This component must be used within a <Form> component');
    }

    return context;
};

export default useForm;
