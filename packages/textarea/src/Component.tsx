import { defaultTheme, scale } from '@ensi-platform/core-components-common';
import { FormControl } from '@ensi-platform/core-components-form-control';

import type { CSSObject } from '@emotion/react';

import deepmerge from 'deepmerge';
import { type ChangeEvent, type FocusEvent, forwardRef, useCallback, useMemo, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import type { TTextareaProps } from './types';

const emptyStyle = {};

export const BASE_CSS: CSSObject = {
    border: `none`,
};

const { colors } = defaultTheme;

export const Textarea = forwardRef<HTMLTextAreaElement, TTextareaProps>(
    (
        {
            size,
            variant,
            theme,
            label,
            hint,
            leftAddons,
            rightAddons,
            bottomAddons,
            error,
            block,
            fieldCSS = emptyStyle,
            wrapperCSS,
            controlWrapperCSS,
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
            wrapperRef,
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
                error ||
                (Number.isInteger(maxLength) && isExceed && lenEnd < 0 ? `Ты превышаешь на ${Math.abs(lenEnd)}` : ''),
            [maxLength, lenEnd, error, isExceed]
        );

        const renderHint = useMemo(
            () =>
                hint ||
                (Number.isInteger(maxLength) && isExceed && lenEnd > 0 ? `У тебя осталось ${Math.abs(lenEnd)}` : ''),
            [maxLength, lenEnd, hint, isExceed]
        );

        // TODO: react 18 useId()
        const htmlFor = props.id;

        const innerCSS = useMemo(() => deepmerge.all<CSSObject>([BASE_CSS, fieldCSS]), [fieldCSS]);

        return (
            <FormControl
                htmlFor={htmlFor}
                ref={wrapperRef}
                disabled={disabled}
                readOnly={readOnly}
                error={renderError}
                label={label}
                hint={renderHint}
                leftAddons={leftAddons}
                rightAddons={rightAddons}
                bottomAddons={bottomAddons}
                fieldCSS={innerCSS}
                block={block}
                filled={filled || focused || !!placeholder?.length}
                focused={focused}
                theme={theme}
                size={size}
                variant={variant}
                css={{ cursor: disabled ? 'not-allowed' : 'text', ...wrapperCSS }}
                controlWrapperCSS={controlWrapperCSS}
                // onMouseDown={onMouseDown}
                // onMouseUp={onMouseUp}
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
                    {...props}
                    css={{
                        display: 'block',
                        width: '100%',
                        padding: scale(1),
                        borderRadius: 2,
                        background: colors?.grey100,
                        borderColor: error ? colors?.danger : colors?.grey400,

                        ...(!readOnly && { ':focus': { borderColor: colors?.primary, outline: 'none' } }),
                        ...(!isResize && { resize: 'none' }),
                        ':disabled': { cursor: 'not-allowed' },
                    }}
                />
            </FormControl>
        );
    }
);
