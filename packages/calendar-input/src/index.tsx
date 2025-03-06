import { useMaskito } from '@maskito/react';

import endOfDay from 'date-fns/endOfDay';
import startOfDay from 'date-fns/startOfDay';
import {
    type FocusEvent,
    type KeyboardEvent,
    type MouseEvent,
    forwardRef,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import mergeRefs from 'react-merge-refs';

import { DateInput } from './components/date-input';
import { DateRangeInput } from './components/date-range-input';
import { TimeInput } from './components/time-input';
import { createMaskOptions } from './mask';
import { DATE_RANGE_SEPARATOR, DEFAULT_MAX_DATE, DEFAULT_MIN_DATE, HOURS_MINUTES_SEPARATOR } from './scripts/constants';
import type { BaseCalendarInputProps } from './types';

export const CalendarInput = forwardRef<HTMLInputElement, BaseCalendarInputProps>(
    (
        {
            autoCorrection = true,
            minDate = DEFAULT_MIN_DATE,
            maxDate = DEFAULT_MAX_DATE,
            view,
            picker,
            onCalendarClose,
            onCalendarOpen,
            platform,
            onKeyDown,
            disabled,
            readOnly,
            field,
            value,
            fieldCSS,
            disableUserInput,
            ...restProps
        },
        ref
    ) => {
        const { t } = useTranslation('common');

        const [correctionOccurred, setCorrectionOccurred] = useState(false);
        const [open, setOpen] = useState(false);

        const inputRef = useRef<HTMLInputElement>(null);
        const calendarRef = useRef<HTMLDivElement>(null);
        const inputWrapperRef = useRef<HTMLDivElement>(null);

        function handleCorrection() {
            setCorrectionOccurred(true);
        }

        const maskOptions = useMemo(
            () => createMaskOptions(view, startOfDay(minDate), endOfDay(maxDate), autoCorrection, handleCorrection),
            [view, minDate, maxDate, autoCorrection]
        );

        const maskRef = useMaskito({ options: maskOptions });

        useEffect(() => {
            let timeoutId: ReturnType<typeof setTimeout>;

            if (correctionOccurred) {
                timeoutId = setTimeout(() => setCorrectionOccurred(false), 150);
            }

            return () => clearTimeout(timeoutId);
        }, [correctionOccurred]);

        const openCalendar = () => {
            if (picker) {
                setOpen(p => {
                    if (!p) onCalendarOpen?.();

                    return true;
                });
            }
        };

        const closeCalendar = () => {
            if (picker) {
                setOpen(p => {
                    if (p) onCalendarClose?.();

                    return false;
                });
            }
        };

        const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
            if (event.key === 'Escape') closeCalendar();
        };

        const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
            if (['ArrowDown', 'ArrowUp'].includes(event.key) && calendarRef.current) {
                event.preventDefault();
                calendarRef.current.focus();
            }

            if (event.key === 'Enter') {
                if (open) closeCalendar();
                else openCalendar();
            }

            onKeyDown?.(event);
        };

        const handleClick = (event: MouseEvent<HTMLDivElement>) => {
            if (!inputWrapperRef.current?.contains(event.target as HTMLElement)) return;

            if (platform === 'desktop') {
                if (!open) openCalendar();
            }

            if (platform === 'mobile' && disableUserInput && !open) {
                openCalendar();
            }
        };

        const handlePickerClick = () => {
            if (platform === 'mobile' && !disableUserInput && !open) {
                openCalendar();
            }
        };

        const handleFocus = (event: FocusEvent<HTMLDivElement>) => {
            if (!inputWrapperRef.current?.contains(event.target as HTMLElement)) return;

            if (platform === 'desktop') openCalendar();
        };

        const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
            if (platform === 'desktop') {
                const target = (event.relatedTarget || document.activeElement) as HTMLElement;

                if (inputRef.current !== target && calendarRef.current?.contains(target) === false) {
                    closeCalendar();
                }
            }
        };

        const inputDisabled = disabled || readOnly;

        const commonProps = {
            autoComplete: picker ? 'off' : undefined,
            disableUserInput,
            autoCorrection,
            disabled,
            readOnly,
            value: field?.value || value,
            fieldCSS: { ...fieldCSS, ...(correctionOccurred && {}) },
            onKeyDown: handleInputKeyDown,
        } as const;

        const pickerProps = {
            platform,
            picker,
            onCalendarClose: closeCalendar,
            onPickerClick: handlePickerClick,
            wrapperHandlers: {
                onKeyDown: inputDisabled ? undefined : handleKeyDown,
                onClick: inputDisabled ? undefined : handleClick,
                onFocus: inputDisabled ? undefined : handleFocus,
                onBlur: handleBlur,
            },
            minDate,
            maxDate,
        } as const;

        switch (view) {
            case 'date':
            case 'date-time':
                return (
                    <DateInput
                        placeholder={
                            view === 'date-time' ? t('common:components.fullDate') : t('common:components.date')
                        }
                        {...restProps}
                        {...commonProps}
                        {...pickerProps}
                        withTime={view === 'date-time'}
                        open={open}
                        calendarRef={calendarRef}
                        inputWrapperRef={inputWrapperRef}
                        ref={mergeRefs([ref, maskRef, inputRef])}
                    />
                );

            case 'date-range':
                return (
                    <DateRangeInput
                        placeholder={`${t('common:components.date')}${DATE_RANGE_SEPARATOR}${t('common:components.date')}`}
                        {...restProps}
                        {...commonProps}
                        {...pickerProps}
                        open={open}
                        calendarRef={calendarRef}
                        inputWrapperRef={inputWrapperRef}
                        ref={mergeRefs([ref, maskRef, inputRef])}
                    />
                );

            case 'time':
                return (
                    <TimeInput
                        placeholder={`${t('common:components.hours')}${HOURS_MINUTES_SEPARATOR}${t('common:components.minutes')}`}
                        {...restProps}
                        {...commonProps}
                        ref={mergeRefs([ref, maskRef, inputRef])}
                    />
                );

            default:
                throw new Error('The view prop must be specified');
        }
    }
);
