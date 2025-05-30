import { Button, usePrevious } from '@ensi-platform/core-components-common';

import { isEqual, isLastDayOfMonth, isSameDay, isToday, isWithinInterval, startOfMonth } from 'date-fns';
import { type FC, type RefCallback, useCallback, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { CSSTransition as CSSTransitionTyped, TransitionGroup as TransitionGroupTyped } from 'react-transition-group';

import useCalendarTheme from '../../scripts/useCalendarTheme';
import { getSelectionRange, getWeekdays } from '../../scripts/utils';
import type { Day } from '../../types';

const TransitionGroup = TransitionGroupTyped as never as (props: any) => JSX.Element;
const CSSTransition = CSSTransitionTyped as never as (props: any) => JSX.Element;

export type DaysTableProps = {
    /**
     * Массив-календарь недель
     */
    weeks?: Day[][];

    /**
     * Активный месяц
     */
    activeMonth?: Date;

    /**
     * Начало выделенного периода
     */
    selectedFrom?: Date | number;

    /**
     * Конец выделенного периода
     */
    selectedTo?: Date | number;

    /**
     * Подсвеченная дата (ховер)
     */
    highlighted?: Date | number;

    /**
     * Доп. пропсы для переданного дня
     */
    getDayProps: (day: Day) => Record<string, unknown> & { ref: RefCallback<HTMLButtonElement> };
};

export const DaysTable: FC<DaysTableProps> = ({
    weeks = [],
    activeMonth = new Date(),
    highlighted,
    selectedFrom,
    selectedTo,
    getDayProps,
}) => {
    const { t } = useTranslation('constants');

    const activeMonthRef = useRef(activeMonth);

    activeMonthRef.current = activeMonth;

    const prevActiveMonth = usePrevious(activeMonth);

    const direction = prevActiveMonth && (activeMonth < prevActiveMonth ? 'right' : 'left');

    const selection = getSelectionRange(selectedFrom, selectedTo, highlighted);

    const { getCSS } = useCalendarTheme();

    const thStyles = useMemo(() => getCSS('daysTableTh'), [getCSS]);

    const renderHeader = useCallback(
        () =>
            getWeekdays(t).map((dayName: string) => (
                <th key={dayName} css={thStyles}>
                    {dayName}
                </th>
            )),
        [thStyles, t]
    );

    const renderDay = (day: Day) => {
        const daySelected =
            day.selected ||
            (selectedFrom && isSameDay(day.date, selectedFrom)) ||
            (selectedTo && isSameDay(day.date, selectedTo));

        const inRange = !daySelected && selection && isWithinInterval(day.date, selection);

        const firstDay = day.date.getDate() === 1;
        const lastDay = isLastDayOfMonth(day.date);

        const transitLeft = firstDay && inRange && selection && day.date > selection.start;
        const transitRight = lastDay && inRange && selection && day.date < selection.end;

        const rangeStart = selection && isSameDay(day.date, selection.start);

        const dayProps = getDayProps(day);

        const state = {
            highlighted: !!highlighted && isEqual(day.date, highlighted),
            selected: !!daySelected,
            range: !!inRange,
            rangeStart: !!rangeStart,
            transitLeft: !!transitLeft,
            transitRight: !!transitRight,
            today: isToday(day.date),
            firstDay: !!firstDay,
            lastDay: !!lastDay,
            event: !!day.event,
            disabled: !!day.disabled,
        };

        return (
            <Button
                {...dayProps}
                ref={(node: any) => {
                    /**
                     * После анимации реф-коллбэк вызывается еще раз, и в него передается null и старый activeMonth.
                     * Поэтому приходится хранить актуальный месяц в рефе и сравнивать с ним.
                     */
                    if (startOfMonth(day.date).getTime() === activeMonthRef.current.getTime()) {
                        dayProps.ref(node as HTMLButtonElement);
                    }
                }}
                type="button"
                size="sm"
                disabled={day.disabled}
                css={getCSS('daysTableButton', state)}
            >
                {day.date.getDate()}
            </Button>
        );
    };

    const renderWeek = (week: Day[], weekIdx: number) => (
        <tr key={weekIdx}>
            {week.map((day: Day, dayIdx: number) => (
                <td key={day ? day.date.getTime() : dayIdx}>{day && renderDay(day)}</td>
            ))}
        </tr>
    );

    return (
        <table width="100%" css={getCSS('daysTableRoot')}>
            <thead>
                <tr>{renderHeader()}</tr>
            </thead>
            <TransitionGroup component={null}>
                <CSSTransition
                    key={activeMonth.getTime()}
                    timeout={300}
                    classNames="fade"
                    css={getCSS('keyframes', { direction })}
                >
                    <tbody>{weeks.map(renderWeek)}</tbody>
                </CSSTransition>
            </TransitionGroup>
        </table>
    );
};
