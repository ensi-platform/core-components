import { isSameMonth, isThisMonth } from 'date-fns';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { monthName } from '../../scripts/utils';
import type { Month } from '../../types';
import { SelectButton, type SelectButtonProps } from '../select-button';

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
    const { t } = useTranslation('constants');

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
                    {monthName(month.date, t)}
                </SelectButton>
            ))}
        </div>
    );
};
