import { createContext, useContext } from 'react';

export interface FormContextProps {
    onChange: (key: string, value: any) => void;
    disabled?: boolean;
    onSubmitHandler: (value: any) => void;
}

export const FormContext = createContext<FormContextProps | undefined>(undefined);

const useForm = (): FormContextProps | undefined => {
    const context = useContext(FormContext);

    if (!context) {
        console.error('This component must be used within a <Form> component');
    }

    return context;
};

export default useForm;
