import { Input } from '@ensi-platform/core-components-input';

import { type ChangeEvent, type FocusEvent, forwardRef, useEffect, useRef, useState } from 'react';

import { HOURS_MINUTES_SEPARATOR } from '../../scripts/constants';
import { isCompleteTime } from '../../scripts/utils';
import type { InnerTimeInputProps } from '../../types';

const defaultTime = `00${HOURS_MINUTES_SEPARATOR}00`;

export const TimeInput = forwardRef<HTMLInputElement, InnerTimeInputProps>(
    (
        { autoCorrection, value: valueProp, defaultValue, setFieldValue, onChange, onComplete, onBlur, ...restProps },
        ref
    ) => {
        const [value, setValue] = useState(defaultValue);

        const lastValidTime = useRef(defaultTime);

        const uncontrolled = valueProp === undefined;
        const inputValue = value ?? valueProp ?? '';

        useEffect(() => {
            if (autoCorrection && !inputValue) {
                lastValidTime.current = defaultTime;
            }
        }, [autoCorrection, inputValue]);

        const callOnComplete = (val: string) => {
            onComplete?.(val);
            lastValidTime.current = val;
        };

        const changeValue = (val: string, event: ChangeEvent<HTMLInputElement> | null) => {
            onChange?.(event, { value: val });
            setFieldValue?.(val);

            if (uncontrolled) setValue(val);
            if (isCompleteTime(val, true)) callOnComplete(val);
        };

        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
            changeValue(event.target.value, event);
        };

        const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
            onBlur?.(event);

            if (autoCorrection && inputValue && !isCompleteTime(inputValue, true)) {
                changeValue(lastValidTime.current, null);
            }
        };

        return (
            <Input
                {...restProps}
                onBlur={handleBlur}
                onInput={handleChange}
                ref={ref}
                value={inputValue}
                inputMode="decimal"
            />
        );
    }
);
