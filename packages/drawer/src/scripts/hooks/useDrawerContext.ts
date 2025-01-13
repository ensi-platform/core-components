import { useContext } from 'react';

import { DrawerContext } from '../../context';

export const useDrawerContext = () => {
    const context = useContext(DrawerContext);

    if (!context) {
        throw new Error(`Hook useDrawerContext must be used within DrawerContextProvider`);
    }

    return context;
};
