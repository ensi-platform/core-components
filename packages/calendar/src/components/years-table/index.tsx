import { isSameYear, isThisYear } from 'date-fns';
import { type MouseEvent, useCallback, useLayoutEffect, useRef } from 'react';

import { SelectButton, type SelectButtonProps } from '../select-button';

export type YearsTableProps = {
    /**
     * Массив лет
     */
    years?: Date[];

    /**
     * Выбранный год
     */
    selectedYear?: Date;

    /**
     * Доп. пропсы для переданного года
     */
    getYearProps: (year: Date) => Record<string, unknown>;

    /**
     * Обработчик скролла
     */
    onScroll: (scrollTop: number) => void;
};

export const YearsTable = ({ selectedYear, years = [], getYearProps, onScroll }: YearsTableProps) => {
    const ref = useRef<HTMLDivElement>(null);

    const view = useCallback(
        (year: Date): SelectButtonProps['view'] => {
            if (selectedYear && isSameYear(selectedYear, year)) return 'selected';
            if (isThisYear(year)) return 'outlined';
            return 'default';
        },
        [selectedYear]
    );

    const handleScroll = useCallback(
        (event: MouseEvent<HTMLDivElement>) => {
            onScroll(event.currentTarget.scrollTop);
        },
        [onScroll]
    );

    useLayoutEffect(() => {
        const listNode = ref.current;
        const selector = '[tabIndex="0"]';
        const selectedYearNode = listNode && listNode.querySelector<HTMLButtonElement>(selector);

        if (listNode && selectedYearNode) {
            const topIndent = listNode.clientHeight + selectedYearNode.clientHeight * 2;

            listNode.scrollTop = selectedYearNode.offsetTop - topIndent;

            onScroll(listNode.scrollTop);
        }
    }, [onScroll, selectedYear]);

    return (
        <div onScroll={handleScroll} ref={ref} css={{ width: '100%', overflowY: 'auto' }}>
            <div css={{ display: 'grid', gridTemplate: "'1fr 1fr 1fr'" }}>
                {years.map(year => (
                    <SelectButton {...getYearProps(year)} key={year.getFullYear()} view={view(year)}>
                        {year.getFullYear()}
                    </SelectButton>
                ))}
            </div>
        </div>
    );
};
