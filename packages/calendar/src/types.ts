import { BaseThemeState, StyleDefinition, useThemeCSSPart, ValueOrFunction } from '@greensight/core-components-common';
import { ReactNode } from 'react';

export const CalendarSize = {
    md: 'md',
} as const;

export const CalendarVariant = {
    primary: 'primary',
} as const;

export type SpecialDays = Record<number, boolean>;
export type SpecialDaysAddon = Record<number, ReactNode>;

export type DayAddons = {
    date: Date | number;
    addon: ReactNode;
};

export type Day = {
    date: Date;
    disabled?: boolean;
    event?: boolean;
    selected?: boolean;
    holiday?: boolean;
    dayAddon?: ReactNode;
};

export type Month = {
    date: Date;
    disabled?: boolean;
};

export type DateShift =
    | 'prev'
    | 'prevWeek'
    | 'prevMonth'
    | 'startOfWeek'
    | 'next'
    | 'nextWeek'
    | 'nextMonth'
    | 'endOfWeek';

export type View = 'years' | 'months' | 'days';

export type SelectorView = 'month-only' | 'full';

export interface CalendarState {
    weeksCount: number;

    /**
     * Вид по умолчанию (выбор дней, месяцев, лет)
     */
    defaultView?: View;

    /**
     * Вид шапки — месяц и год или только месяц
     */
    selectorView?: SelectorView;
}

export type CalendarThemeState = BaseThemeState<typeof CalendarVariant, typeof CalendarSize> & CalendarState;

export type CalendarTheme = ValueOrFunction<
    {
        container: StyleDefinition<CalendarThemeState>;
        wrapper: StyleDefinition<CalendarThemeState>;
        daysTableRoot: StyleDefinition<CalendarThemeState>;
        daysTableTh: StyleDefinition<CalendarThemeState>;
        daysTableButton: StyleDefinition<
            CalendarThemeState &
                Partial<{
                    highlighted: boolean;
                    selected: boolean;
                    range: boolean;
                    rangeStart: boolean;
                    transitLeft: boolean;
                    transitRight: boolean;
                    today: boolean;
                    firstDay: boolean;
                    lastDay: boolean;
                    event: boolean;
                    disabled: boolean;
                }>
        >;

        keyframes: StyleDefinition<CalendarThemeState & { direction?: 'left' | 'right' | null }>;

        selectButton: StyleDefinition<
            CalendarThemeState & {
                buttonVariant?: 'default' | 'outlined' | 'selected';
            }
        >;
        yearsTable: StyleDefinition<CalendarThemeState>;
    },
    [CalendarThemeState]
>;

const useFoo = () => useThemeCSSPart<CalendarThemeState, CalendarTheme>(...([] as never as [any, any]));

export interface CalendarThemeContextProps extends CalendarState {
    theme: CalendarTheme;
    getCSS: ReturnType<typeof useFoo>;
}

type CalendarProps = Omit<CalendarState, 'weeksCount'> &
    Partial<Omit<BaseThemeState<typeof CalendarVariant, typeof CalendarSize, CalendarTheme>, 'theme'>> & {
        /**
         * Дополнительный класс
         */
        className?: string;

        /**
         * Выбранная дата (timestamp)
         */
        value?: number;

        /**
         * Открытый месяц (timestamp)
         */
        month?: number;

        /**
         * Месяц, открытый по умолчанию (timestamp)
         */
        defaultMonth?: number;

        /**
         * Минимальная дата, доступная для выбора (timestamp)
         */
        minDate?: number;

        /**
         * Максимальная дата, доступная для выбора (timestamp)
         */
        maxDate?: number;

        /**
         * Начало выделенного периода (timestamp)
         */
        selectedFrom?: number;

        /**
         * Конец выделенного периода (timestamp)
         */
        selectedTo?: number;

        /**
         * Список событий
         */
        events?: Array<Date | number>;

        /**
         * Список выходных
         */
        offDays?: Array<Date | number>;

        /**
         * Обработчик изменения месяца (или года)
         */
        onMonthChange?: (month: number) => void;

        /**
         * Обработчик выбора даты
         */
        onChange?: (date: number, isKeyboard: boolean) => void;

        /**
         * Идентификатор для систем автоматизированного тестирования
         */
        dataTestId?: string;

        theme?: CalendarTheme;
    };

export { CalendarProps };
