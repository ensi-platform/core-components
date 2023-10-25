import { createContext, useContext } from 'react';
import { AccordionContextProps } from './types';

export const AccordionContext = createContext<AccordionContextProps | undefined>(undefined);

const useAccordion = (): AccordionContextProps => {
    const context = useContext(AccordionContext);

    if (!context) {
        throw new Error('This component must be used within a <Accordion> component');
    }

    return context;
};

export default useAccordion;
