import { useContext } from 'react';

import { PopupContext } from '../../context';

export const usePopupContext = () => {
    const context = useContext(PopupContext);

    if (!context) {
        throw new Error(`Hook usePopupContext must be used within PopupContextProvider`);
    }

    return context;
};
