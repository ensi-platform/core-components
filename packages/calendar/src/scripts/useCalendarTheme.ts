import { createContext, useContext } from 'react';

import { type CalendarThemeContextProps } from '../types';

export const CalendarThemeContext = createContext<CalendarThemeContextProps | undefined>(undefined);

const useCalendarTheme = (): CalendarThemeContextProps => {
    const context = useContext(CalendarThemeContext);

    if (!context) {
        throw new Error('This hook must be used within a <Calendar> subcomponent');
    }

    return context;
};

export default useCalendarTheme;
