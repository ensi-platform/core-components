import { FormControl, getFormControlProps } from '@ensi-platform/core-components-form-control';

import type { CSSObject } from '@emotion/react';

import cn from 'classnames';
import deepmerge from 'deepmerge';
import {
    type AnimationEvent,
    type ChangeEvent,
    type FocusEvent,
    type MouseEvent,
    type ReactNode,
    forwardRef,
    useCallback,
    useId,
    useMemo,
    useRef,
    useState,
} from 'react';
import mergeRefs from 'react-merge-refs';

import { RightAddons } from './components/RightAddons';
import { BASE_INPUT_CSS } from './styles';
import type { TInputProps } from './types';

const CSS_EMPTY_OBJECT: CSSObject = {};

export const Input = forwardRef<HTMLInputElement, TInputProps>(
    (
        {
            id,
            type = 'text',
            clear,
            disabled,
            inputClassName,
            inputCSS = CSS_EMPTY_OBJECT,

            onFocus: onFocusProps,
            onBlur: onBlurProps,
            onChange: onChangeProps,
            onClear: onClearProps,
            onInput: onInputProps,
            onMouseDown,
            onMouseUp,

            onAnimationStart: onAnimationStartProps,
            value: valueProps,
            defaultValue = '',
            readOnly,
            placeholder,
            maxLength,
            ...props
        },
        ref
    ) => {
        const generatedHtmlFor = useId();
        const htmlFor = id || generatedHtmlFor;

        const uncontrolled = valueProps === undefined;
        const externalValue = valueProps;
        const inputRef = useRef<HTMLInputElement>(null);

        const [focused, setFocused] = useState(props.autoFocus);
        const [stateValue, setStateValue] = useState(defaultValue);
        const [autofilled, setAutofilled] = useState(false);
        const filled = Boolean(uncontrolled ? stateValue : externalValue);

        const value = uncontrolled ? stateValue : externalValue;

        const { formControlProps, fieldProps } = getFormControlProps(props);
        const { rightAddons, label } = formControlProps;

        const labelComponent = typeof label === 'object' ? (label as { Component: ReactNode })?.Component : label;

        const onChange = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => {
                const v = maxLength ? event.target.value.slice(0, maxLength) : event.target.value;
                event.target.value = v;
                event.currentTarget.value = v;

                if (onChangeProps) {
                    onChangeProps(event, { value: v });
                }

                if (uncontrolled) {
                    setStateValue(v);
                }
            },
            [maxLength, onChangeProps, uncontrolled]
        );

        const onInput = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => {
                const v = maxLength ? event.target.value.slice(0, maxLength) : event.target.value;
                event.target.value = v;
                event.currentTarget.value = v;

                if (onInputProps) {
                    onInputProps(event, { value: v });
                }

                if (uncontrolled) {
                    setStateValue(v);
                }
            },
            [maxLength, onInputProps, uncontrolled]
        );

        const onFocus = useCallback(
            (event: FocusEvent<HTMLInputElement>) => {
                if (!readOnly) {
                    setFocused(true);
                }

                if (onFocusProps) {
                    onFocusProps(event);
                }
            },
            [onFocusProps, readOnly]
        );

        const onBlur = useCallback(
            (event: FocusEvent<HTMLInputElement>) => {
                setFocused(false);

                if (onBlurProps) {
                    onBlurProps(event);
                }
            },
            [onBlurProps]
        );

        const onClear = useCallback(
            (event: MouseEvent<HTMLButtonElement>) => {
                if (uncontrolled) {
                    setStateValue('');
                }

                if (onClearProps) {
                    onClearProps(event);
                }

                if (inputRef.current && !focused) {
                    inputRef.current.focus();
                }
            },
            [focused, onClearProps, uncontrolled]
        );

        const isClear = !!(clear && filled && !disabled && !readOnly);

        const rightAddonsInner: TInputProps['rightAddons'] = useMemo(() => {
            const isVisible = isClear || rightAddons;
            if (!isVisible) return null;

            return <RightAddons rightAddons={rightAddons} onClear={onClear} clear={isClear} />;
        }, [isClear, onClear, rightAddons]);

        const onAnimationStart = useCallback(
            (event: AnimationEvent<HTMLInputElement>) => {
                if (onAnimationStartProps) {
                    onAnimationStartProps(event);
                }

                setAutofilled(event.animationName.includes('start'));
            },
            [onAnimationStartProps]
        );

        const inputInnerCSS = useMemo(() => deepmerge.all<CSSObject>([inputCSS, BASE_INPUT_CSS]), [inputCSS]);

        return (
            <FormControl
                {...formControlProps}
                htmlFor={htmlFor}
                rightAddons={rightAddonsInner}
                filled={filled || autofilled || focused || !!placeholder?.length}
                focused={focused}
                readOnly={readOnly}
                disabled={disabled}
                css={{ cursor: disabled ? 'not-allowed' : 'text' }}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
            >
                <input
                    {...fieldProps}
                    id={htmlFor}
                    className={cn('control', inputClassName)}
                    placeholder={placeholder}
                    css={inputInnerCSS}
                    disabled={disabled}
                    onInput={onInput}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onChange={onChange}
                    onAnimationStart={onAnimationStart}
                    ref={mergeRefs([ref, inputRef])}
                    type={type}
                    value={uncontrolled ? stateValue : value}
                    defaultValue={defaultValue}
                    readOnly={readOnly}
                    aria-label={typeof labelComponent === 'string' ? labelComponent : undefined}
                />
            </FormControl>
        );
    }
);
