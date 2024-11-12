import { createContext, useContext } from 'react';

import { type AccordionContextProps } from '../types';

export const AccordionContext = createContext<AccordionContextProps | undefined>(undefined);

export const useAccordion = (): AccordionContextProps => {
    const context = useContext(AccordionContext);

    if (!context) {
        throw new Error('This component must be used within a <Accordion> component');
    }

    return context;
};
