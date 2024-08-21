'use client';

import { createContext, useContext } from 'react';

import { type FieldValues } from 'react-hook-form';

export interface IFormContextProps {
    onChange: (key: string, value: FieldValues) => void;
    disabled?: boolean;
    onSubmitHandler: (value: any) => void;
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
