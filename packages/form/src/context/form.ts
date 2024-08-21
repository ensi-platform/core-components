'use client';

import { createContext, useContext } from 'react';

import { type NativeFieldValue } from 'react-hook-form';

export interface IFormContextProps {
    onChange: (key: string, value?: NativeFieldValue) => void;
    disabled?: boolean;
}

export const FormContext = createContext<IFormContextProps | undefined>(undefined);

const useForm = (): IFormContextProps => {
    const context = useContext(FormContext);

    if (!context) {
        throw new Error('This component must be used within a <Form> component');
    }

    return context;
};

export default useForm;
