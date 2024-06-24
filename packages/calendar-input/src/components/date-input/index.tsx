import { ChangeEvent, FocusEvent, forwardRef, useEffect, useRef, useState } from 'react';
import mergeRefs from 'react-merge-refs';

import { Calendar as DefaultCalendar, CalendarProps } from '@greensight/core-components-calendar';
import { Input } from '@greensight/core-components-input';
import { Popover } from '@greensight/core-components-popover';

import { useOnClickOutside, IconCalendar } from '@greensight/core-components-common';

import {
    DATE_FORMAT,
    DATE_TIME_FORMAT,
    DATE_TIME_SEPARATOR,
    DEFAULT_MAX_DATE,
    DEFAULT_MIN_DATE,
} from '../../scripts/constants';
import type { InnerDateInputProps } from '../../types';
import {
    formatDate,
    isCompleteDate,
    isCompleteTime,
    isValidDate,
    parseDateString,
    preventDefault,
} from '../../scripts/utils';

export const DateInput = forwardRef<HTMLInputElement, InnerDateInputProps>(
    (
        {
            closeOnClickOutside = true,
            autoCorrection,
            open,
            value: valueProp,
            inputWrapperRef: inputWrapperRefProp = null,
            defaultValue,
            minDate = DEFAULT_MIN_DATE,
            maxDate = DEFAULT_MAX_DATE,
            picker,
            rightAddons,
            Calendar = DefaultCalendar,
            calendarProps = {},
            platform,
            calendarRef,
            onComplete,
            onChange,
            onBlur,
            onCalendarClose,
            onPickerClick,
            error,
            popoverProps,
            wrapperHandlers,
            block,
            wrapperCSS,
            withTime,
            ...restProps
        },
        ref
    ) => {
        const [value, setValue] = useState(defaultValue);

        const lastValidDate = useRef<string>('');
        const inputRef = useRef<HTMLInputElement>(null);
        const inputWrapperRef = useRef<HTMLDivElement>(null);
        const controlled = valueProp !== undefined;
        const { offDays } = calendarProps;
        const inputValue = valueProp ?? value ?? '';
        const [inputDate, inputTime] = inputValue.split(DATE_TIME_SEPARATOR);
        const isValidValue = isValidDate({ value: inputDate, minDate, maxDate, offDays });

        useEffect(() => {
            if (autoCorrection) {
                const hasValidValue = isValidValue && isCompleteTime(inputValue, withTime);

                if (!lastValidDate.current || !inputValue) {
                    lastValidDate.current = hasValidValue
                        ? inputValue
                        : formatDate(minDate, withTime ? DATE_TIME_FORMAT : DATE_FORMAT);
                }
            }
        }, [autoCorrection, minDate, withTime, isValidValue, inputValue]);

        const getInnerError = () => {
            if (autoCorrection) {
                const isComplete = isCompleteDate(inputDate) && isCompleteTime(inputTime, withTime);

                return isComplete && !isValidValue ? 'Эта дата недоступна' : false;
            }

            return false;
        };

        const callOnComplete = (val: string) => {
            onComplete?.(val, parseDateString(val, withTime ? DATE_TIME_FORMAT : DATE_FORMAT));
            lastValidDate.current = val;
        };

        const changeValue = (val: string, event: ChangeEvent<HTMLInputElement> | null) => {
            onChange?.(event, { value: val });

            const [date, time = ''] = val.split(DATE_TIME_SEPARATOR);

            if (controlled && restProps?.helpers) {
                restProps.helpers.setValue(val);
                setValue(val);
            }
            if (isCompleteDate(date) && isCompleteTime(time, withTime)) callOnComplete(val);
        };

        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
            changeValue(event.target.value, event);
        };

        const handleCalendarChange: CalendarProps['onChange'] = (date: number | undefined, isKeyboard: boolean) => {
            if (date) {
                changeValue(formatDate(date, withTime ? DATE_TIME_FORMAT : DATE_FORMAT), null);
                requestAnimationFrame(() => {
                    const dateLen = DATE_FORMAT.length;
                    const newCaretPos = withTime ? dateLen + DATE_TIME_SEPARATOR.length : dateLen;

                    inputRef.current?.setSelectionRange(newCaretPos, newCaretPos);
                });
            }
            if (platform === 'desktop') {
                if (isKeyboard) {
                    inputRef.current?.focus();
                }
                onCalendarClose?.();
            }
        };

        const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
            onBlur?.(event);
            if (autoCorrection) {
                const dateFilled = isCompleteDate(inputDate);

                if (dateFilled && !isCompleteTime(inputTime, withTime)) {
                    const [, prevTime] = lastValidDate.current.split(DATE_TIME_SEPARATOR);

                    changeValue(`${inputDate}${DATE_TIME_SEPARATOR}${prevTime}`, null);
                }

                if (inputValue && !dateFilled) {
                    changeValue(lastValidDate.current, null);
                }
            }
        };

        const wrapperRef = useRef<HTMLDivElement>(null);

        useOnClickOutside(wrapperRef, () => {
            if (!closeOnClickOutside) return;
            onCalendarClose?.();
        });

        const renderCalendar = () => {
            if (picker && Calendar) {
                return (
                    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                    <div onMouseDown={preventDefault} css={{}} ref={wrapperRef}>
                        <Calendar
                            {...calendarProps}
                            ref={calendarRef}
                            value={isValidValue ? parseDateString(inputDate).getTime() : undefined}
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
                            {picker && <IconCalendar onClick={onPickerClick} css={{}} onMouseDown={preventDefault} />}
                        </>
                    }
                />
                {platform === 'desktop' ? (
                    <Popover
                        tabFocusableWrapper={false}
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
