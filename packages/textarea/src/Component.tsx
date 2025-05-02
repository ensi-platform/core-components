import { defaultTheme, scale } from '@ensi-platform/core-components-common';
import { FormControl, getFormControlProps } from '@ensi-platform/core-components-form-control';

import type { CSSObject } from '@emotion/react';

import deepmerge from 'deepmerge';
import { type ChangeEvent, type FocusEvent, forwardRef, useCallback, useMemo, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import type { TTextareaProps } from './types';

export const BASE_CSS: CSSObject = {
    border: `none`,
};

const { colors } = defaultTheme;

export const Textarea = forwardRef<HTMLTextAreaElement, TTextareaProps>(
    (
        {
            readOnly,

            name,
            value,
            minRows = 3,
            maxRows,
            maxLength = 0,
            threshold = 0,
            isResize = false,
            disabled,
            autoFocus,
            placeholder,

            onFocus,
            onBlur,
            onInput,
            onHeightChange,
            cacheMeasurements = false,
            ...props
        },
        ref
    ) => {
        const [lenEnd, setLenEnd] = useState(maxLength ? maxLength - value.length : 0);
        const [isExceed, setExceed] = useState(false);
        const [focused, setFocused] = useState(autoFocus);

        const filled = Boolean(value);

        const { formControlProps, fieldProps } = getFormControlProps(props);

        const handlerInput = useCallback(
            (e: ChangeEvent<HTMLTextAreaElement>) => {
                const { value: v } = e.target;
                const valueLength = v.length;

                setLenEnd(maxLength - valueLength);
                if (maxLength && maxLength < valueLength) {
                    setExceed(valueLength >= Math.max(maxLength, 0) * (Math.min(Math.max(threshold, 0), 100) / 100));
                } else {
                    setExceed(false);
                }
                if (onInput) onInput(e);
            },
            [maxLength, onInput, threshold]
        );

        const onFocusHandler = useCallback(
            (event: FocusEvent<HTMLTextAreaElement>) => {
                if (!readOnly) setFocused(true);

                if (onFocus) onFocus(event);
            },
            [onFocus, readOnly]
        );

        const onBlurHandler = useCallback(
            (event: FocusEvent<HTMLTextAreaElement>) => {
                setFocused(false);
                if (onBlur) onBlur(event);
            },
            [onBlur]
        );

        const renderError = useMemo(
            () =>
                formControlProps.error ||
                (Number.isInteger(maxLength) && isExceed && lenEnd < 0 ? `Ты превышаешь на ${Math.abs(lenEnd)}` : ''),
            [maxLength, lenEnd, formControlProps.error, isExceed]
        );

        const renderHint = useMemo(
            () =>
                formControlProps.hint ||
                (Number.isInteger(maxLength) && isExceed && lenEnd > 0 ? `У тебя осталось ${Math.abs(lenEnd)}` : ''),
            [maxLength, lenEnd, formControlProps.hint, isExceed]
        );

        // TODO: react 18 useId()
        const htmlFor = props.id;

        const innerCSS = useMemo(
            () => deepmerge.all<CSSObject>([BASE_CSS, formControlProps.fieldCSS || {}]),
            [formControlProps.fieldCSS]
        );

        return (
            <FormControl
                {...formControlProps}
                htmlFor={htmlFor}
                disabled={disabled}
                readOnly={readOnly}
                error={renderError}
                hint={renderHint}
                filled={filled || focused || !!placeholder?.length}
                focused={focused}
                fieldCSS={innerCSS}
                css={{ cursor: disabled ? 'not-allowed' : 'text' }}
            >
                <TextareaAutosize
                    ref={ref}
                    className="control"
                    name={name}
                    value={value}
                    minRows={minRows}
                    maxRows={maxRows}
                    onInput={handlerInput}
                    disabled={disabled}
                    aria-describedby={isExceed ? 'exceeding-characters-info' : ''}
                    onHeightChange={onHeightChange}
                    cacheMeasurements={cacheMeasurements}
                    onBlur={onBlurHandler}
                    onFocus={onFocusHandler}
                    readOnly={readOnly}
                    {...fieldProps}
                    css={{
                        display: 'block',
                        width: '100%',
                        padding: scale(1),
                        borderRadius: 2,
                        background: colors?.grey100,
                        borderColor: formControlProps.error ? colors?.danger : colors?.grey400,

                        ...(!readOnly && { ':focus': { borderColor: colors?.primary, outline: 'none' } }),
                        ...(!isResize && { resize: 'none' }),
                        ':disabled': { cursor: 'not-allowed' },
                    }}
                />
            </FormControl>
        );
    }
);
