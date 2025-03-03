import { type CalendarProps, Calendar as DefaultCalendar } from '@ensi-platform/core-components-calendar';
import { IconCalendar, useOnClickOutside } from '@ensi-platform/core-components-common';
import { Input } from '@ensi-platform/core-components-input';
import { Popover } from '@ensi-platform/core-components-popover';

import startOfMonth from 'date-fns/startOfMonth';
import { type ChangeEvent, type FocusEvent, forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import mergeRefs from 'react-merge-refs';

import { DATE_RANGE_SEPARATOR, DEFAULT_MAX_DATE, DEFAULT_MIN_DATE } from '../../scripts/constants';
import {
    formatDate,
    getValidRange,
    isCompleteDate,
    isCompleteDateRange,
    parseDateString,
    preventDefault,
    updateRange,
} from '../../scripts/utils';
import type { InnerDateRangeInputProps } from '../../types';

export const DateRangeInput = forwardRef<HTMLInputElement, InnerDateRangeInputProps>(
    (
        {
            autoCorrection,
            wrapperCSS,
            open,
            onCalendarClose,
            value: valueProp,
            defaultValue,
            inputWrapperRef: inputWrapperRefProp = null,
            setFieldValue,
            onComplete,
            onChange,
            onBlur,
            Calendar = DefaultCalendar,
            wrapperHandlers,
            calendarRef,
            calendarProps = {},
            minDate = DEFAULT_MAX_DATE,
            maxDate = DEFAULT_MIN_DATE,
            block,
            error,
            popoverProps,
            rightAddons,
            picker,
            platform,
            onPickerClick,
            rangeBehavior = 'clarification',
            ...restProps
        },
        ref
    ) => {
        const [value, setValue] = useState(defaultValue);
        const [calendarMonth, setCalendarMonth] = useState(calendarProps.defaultMonth);

        const lastValidRange = useRef<string>('');
        const inputRef = useRef<HTMLInputElement>(null);
        const inputWrapperRef = useRef<HTMLDivElement>(null);
        const uncontrolled = valueProp === undefined;
        const inputValue = valueProp ?? value ?? '';
        const { offDays } = calendarProps;
        const [from = '', to = ''] = inputValue.split(DATE_RANGE_SEPARATOR);

        const { validFrom, validTo } = useMemo(
            () => getValidRange({ from, to, offDays, minDate, maxDate }),
            [from, to, offDays, maxDate, minDate]
        );

        useEffect(() => {
            if (autoCorrection && (!lastValidRange.current || !inputValue)) {
                const min = formatDate(minDate);
                const max = formatDate(maxDate);

                lastValidRange.current = `${min}${DATE_RANGE_SEPARATOR}${max}`;
            }
        }, [autoCorrection, minDate, maxDate, inputValue]);

        useEffect(() => {
            if (picker && open) {
                setCalendarMonth(startOfMonth(validTo || validFrom || Date.now()).getTime());
            }
        }, [validFrom, validTo, open, picker]);

        const getInnerError = () => {
            if (autoCorrection) {
                return (isCompleteDate(from) && !validFrom) || (isCompleteDate(to) && !validTo)
                    ? 'Эта дата недоступна'
                    : '';
            }
        };

        const callOnComplete = (val: string) => {
            const [dateFrom, dateTo] = val.split(DATE_RANGE_SEPARATOR);

            onComplete?.(val, parseDateString(dateFrom), parseDateString(dateTo));
            lastValidRange.current = val;
        };

        const changeValue = (val: string, event: ChangeEvent<HTMLInputElement> | null) => {
            onChange?.(event, { value: val });
            setFieldValue?.(val);

            if (uncontrolled) setValue(val);
            if (isCompleteDateRange(val)) callOnComplete(val);
        };

        const handleMonthChange = (date: number) => {
            setCalendarMonth(date);
            calendarProps?.onMonthChange?.(date);
        };

        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
            changeValue(event.target.value, event);
        };

        const handleCalendarChange: CalendarProps['onChange'] = (date?: number) => {
            const newValue = updateRange({ date, validFrom, validTo, rangeBehavior });

            changeValue(newValue, null);
            requestAnimationFrame(() => {
                inputRef.current?.setSelectionRange(newValue.length, newValue.length);
            });
        };

        const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
            onBlur?.(event);

            if (autoCorrection) {
                const dateFilled = isCompleteDateRange(inputValue);

                if (inputValue && !dateFilled) {
                    const [prevFrom, prevTo] = lastValidRange.current.split(DATE_RANGE_SEPARATOR);
                    const newFrom = validFrom ? formatDate(validFrom) : prevFrom;
                    const newTo = validTo ? formatDate(validTo) : prevTo;

                    changeValue(`${newFrom}${DATE_RANGE_SEPARATOR}${newTo}`, null);
                }
            }
        };

        const wrapperRef = useRef<HTMLDivElement>(null);

        useOnClickOutside(wrapperRef, () => {
            onCalendarClose?.();
        });

        const renderCalendar = () => {
            if (picker && Calendar) {
                return (
                    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                    <div onMouseDown={preventDefault} ref={wrapperRef} /* className={styles.calendarWrapper} */>
                        <Calendar
                            month={calendarMonth}
                            {...calendarProps}
                            onMonthChange={handleMonthChange}
                            ref={calendarRef}
                            selectedFrom={validFrom ? validFrom.getTime() : undefined}
                            selectedTo={validTo ? validTo.getTime() : undefined}
                            value={undefined}
                            onChange={handleCalendarChange}
                            minDate={minDate}
                            maxDate={maxDate}
                        />
                    </div>
                );
            }

            return null;
        };

        return (
            <div
                {...wrapperHandlers}
                css={{
                    display: 'inline-block',
                    outline: 'none',
                    position: 'relative',
                    ...(block && {
                        width: '100%',
                    }),
                    ...wrapperCSS,
                }}
                tabIndex={-1}
            >
                <Input
                    {...restProps}
                    wrapperRef={mergeRefs([inputWrapperRef, inputWrapperRefProp])}
                    ref={mergeRefs([ref, inputRef])}
                    value={inputValue}
                    inputMode="decimal"
                    onInput={handleChange}
                    onBlur={handleBlur}
                    error={error || getInnerError()}
                    block
                    rightAddons={
                        <>
                            {rightAddons}
                            {picker && (
                                <IconCalendar
                                    onClick={onPickerClick}
                                    // className={styles.calendarIcon}
                                    onMouseDown={preventDefault}
                                />
                            )}
                        </>
                    }
                />
                {platform === 'desktop' ? (
                    <Popover
                        offset={[0, 4]}
                        position="bottom-start"
                        {...popoverProps}
                        open={open}
                        anchorElement={inputWrapperRef.current as HTMLElement}
                        popperCSS={{
                            display: 'inline-block',
                        }}
                        withTransition
                    >
                        {renderCalendar()}
                    </Popover>
                ) : (
                    renderCalendar()
                )}
            </div>
        );
    }
);
