import { useCallback } from 'react';
import { isSameMonth, isThisMonth } from 'date-fns';
import { SelectButton, SelectButtonProps } from '../select-button';
import { monthName } from '../../scripts/utils';
import { Month } from '../../types';

export type MonthsTableProps = {
    /**
     * Массив месяцев
     */
    months?: Month[];

    /**
     * Выбранный месяц
     */
    selectedMonth?: Date;

    /**
     * Доп пропсы для переданного месяца
     */
    getMonthProps: (day: Month) => Record<string, unknown>;
};

export const MonthsTable = ({ selectedMonth, months = [], getMonthProps }: MonthsTableProps) => {
    const view = useCallback(
        (month: Month): SelectButtonProps['view'] => {
            if (isThisMonth(month.date)) return 'outlined';
            if (selectedMonth && isSameMonth(selectedMonth, month.date)) return 'selected';
            return 'default';
        },
        [selectedMonth]
    );

    return (
        <div css={{ display: 'grid', gridTemplate: "'1fr 1fr 1fr'", margin: 'auto' }}>
            {months.map(month => (
                <SelectButton {...getMonthProps(month)} key={month.date.getTime()} view={view(month)}>
                    {monthName(month.date)}
                </SelectButton>
            ))}
        </div>
    );
};
