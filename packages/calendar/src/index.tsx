import { useDidUpdateEffect, useThemeCSSPart } from '@ensi-platform/core-components-common';

import { endOfDay, startOfDay, startOfMonth } from 'date-fns';
import { forwardRef, useCallback, useMemo, useState } from 'react';

import { DaysTable } from './components/days-table';
import { Header } from './components/header';
import { MonthsTable } from './components/months-table/index';
import { YearsTable } from './components/years-table';
import { useCalendar } from './scripts/useCalendar';
import { CalendarThemeContext } from './scripts/useCalendarTheme';
import { limitDate, monthName } from './scripts/utils';
import { сalendarThemes } from './themes/defaultTheme';
import type { CalendarProps, CalendarState, CalendarThemeContextProps, CalendarThemeState, View } from './types';

export * from './types';
export * from './scripts/utils';

export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
    (
        {
            className,
            defaultView = 'days',
            selectorView = 'full',
            value,
            month: monthTimestamp,
            minDate: minDateTimestamp,
            maxDate: maxDateTimestamp,
            defaultMonth: defaultMonthTimestamp = +new Date(),
            selectedFrom,
            selectedTo,
            offDays,
            events,
            onChange,
            onMonthChange,
            dataTestId,
            theme = сalendarThemes.basic,
            size = 'md',
            variant = 'primary',
        },
        ref
    ) => {
        const [view, setView] = useState<View>(defaultView);
        const [scrolled, setScrolled] = useState(false);

        const selected = useMemo(() => (value ? new Date(value) : undefined), [value]);

        const defaultMonth = useMemo(
            () => startOfMonth(selected || limitDate(defaultMonthTimestamp, minDateTimestamp, maxDateTimestamp)),
            // eslint-disable-next-line react-hooks/exhaustive-deps
            []
        );

        const month = useMemo(() => (monthTimestamp ? new Date(monthTimestamp) : undefined), [monthTimestamp]);

        const minDate = useMemo(
            () => (minDateTimestamp ? startOfDay(minDateTimestamp) : undefined),
            [minDateTimestamp]
        );

        const maxDate = useMemo(() => (maxDateTimestamp ? endOfDay(maxDateTimestamp) : undefined), [maxDateTimestamp]);

        const {
            activeMonth,
            weeks,
            months,
            years,
            canSetPrevMonth,
            canSetNextMonth,
            setMonthByDate,
            setPrevMonth,
            setNextMonth,
            highlighted,
            getDayProps,
            getMonthProps,
            getYearProps,
            getRootProps,
        } = useCalendar({
            month,
            defaultMonth,
            view,
            minDate,
            maxDate,
            selected,
            offDays,
            events,
            onChange,
            onMonthChange,
        });

        const state = useMemo<CalendarState>(
            () => ({
                weeksCount: weeks.length,
                defaultView,
                selectorView,
            }),
            [defaultView, selectorView, weeks.length]
        );

        const themeState = useMemo<CalendarThemeState>(
            () => ({
                ...state,
                size,
                variant,
            }),
            [state, size, variant]
        );

        const getCSS = useThemeCSSPart(theme, themeState);
        const containerCSS = useMemo(() => getCSS('container'), [getCSS]);
        const wrapperCSS = useMemo(() => getCSS('wrapper'), [getCSS]);

        const contextValue = useMemo<CalendarThemeContextProps>(
            () => ({
                ...state,
                getCSS,
                theme,
            }),
            [getCSS, state, theme]
        );

        const toggleView = useCallback(
            (newView: View) => {
                setView(view === newView ? 'days' : newView);
            },
            [view]
        );

        const handleScroll = useCallback((scrollTop: number) => {
            setScrolled(scrollTop > 0);
        }, []);

        const handlePrevArrowClick = useCallback(() => {
            // TODO: Что должны делать стрелки при view !== days?
            setPrevMonth();
        }, [setPrevMonth]);

        const handleNextArrowClick = useCallback(() => {
            setNextMonth();
        }, [setNextMonth]);

        const handleMonthClick = useCallback(() => {
            toggleView('months');
        }, [toggleView]);

        const handleYearClick = useCallback(() => {
            toggleView('years');
        }, [toggleView]);

        useDidUpdateEffect(() => {
            setView('days');
        }, [activeMonth]);

        useDidUpdateEffect(() => {
            setScrolled(false);
        }, [view]);

        useDidUpdateEffect(() => {
            const newMonth = value && startOfMonth(value);
            if (newMonth && newMonth.getTime() !== activeMonth.getTime()) {
                setMonthByDate(newMonth);
            }
        }, [value]);

        return (
            <div {...getRootProps({ ref })} data-test-id={dataTestId} className={className} css={containerCSS}>
                <CalendarThemeContext.Provider value={contextValue}>
                    <Header
                        month={monthName(activeMonth)}
                        year={activeMonth.getFullYear().toString()}
                        prevArrowVisible={canSetPrevMonth}
                        nextArrowVisible={canSetNextMonth}
                        onPrevArrowClick={handlePrevArrowClick}
                        onNextArrowClick={handleNextArrowClick}
                        onMonthClick={handleMonthClick}
                        onYearClick={handleYearClick}
                        view={selectorView}
                        withShadow={scrolled}
                    />

                    <div css={wrapperCSS}>
                        {view === 'days' && (
                            <DaysTable
                                weeks={weeks}
                                activeMonth={activeMonth}
                                selectedFrom={selectedFrom}
                                selectedTo={selectedTo}
                                getDayProps={getDayProps}
                                highlighted={highlighted}
                            />
                        )}

                        {view === 'months' && (
                            <MonthsTable selectedMonth={activeMonth} months={months} getMonthProps={getMonthProps} />
                        )}

                        {view === 'years' && (
                            <YearsTable
                                selectedYear={activeMonth}
                                years={years}
                                getYearProps={getYearProps}
                                onScroll={handleScroll}
                            />
                        )}
                    </div>
                </CalendarThemeContext.Provider>
            </div>
        );
    }
);
